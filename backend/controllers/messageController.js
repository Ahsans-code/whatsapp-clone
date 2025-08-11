// backend/controllers/messageController.js

import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { User } from "../models/userModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import cloudinary from 'cloudinary';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_BOT_AVATAR, GEMINI_BOT_FULLNAME, GEMINI_BOT_USERNAME } from "../index.js";


const getGeminiResponse = async (prompt) => {
    try {
        // DEBUG #3: Check if API key is loaded
        console.log("DEBUG #3: Checking for GEMINI_API_KEY...");
        if (!process.env.GEMINI_API_KEY) {
            console.error("FATAL: GEMINI_API_KEY is not defined in your .env file!");
            return "Configuration Error: The Gemini API key is missing on the server.";
        }
        console.log("DEBUG #3: GEMINI_API_KEY found.");

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

        console.log("DEBUG #4: Sending prompt to Gemini:", prompt);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("DEBUG #5: Received response from Gemini.");
        return text;
    } catch (error) {
        console.error("DEBUG #X_ERROR: Error in Gemini API call: ", error.message);
        return "Sorry, I'm having trouble thinking right now. Please try again later.";
    }
};

export const sendMessage = async (req, res) => {
    console.log("DEBUG #1: sendMessage controller initiated.");
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;

        const receiver = await User.findById(receiverId);

        if (receiver && receiver.username === GEMINI_BOT_USERNAME) {
            console.log("DEBUG #2: Message is for Gemini Bot. Entering AI logic.");

            if (!message) {
                return res.status(400).json({ error: "Please send a text message to the AI." });
            }

            let conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } });
            if (!conversation) {
                conversation = await Conversation.create({ participants: [senderId, receiverId] });
            }

            const userMessage = new Message({ senderId, receiverId, message, messageType: 'text' });
            await userMessage.save();
            conversation.messages.push(userMessage._id);
            await conversation.save();

            const senderSocketId = getReceiverSocketId(senderId);
            if (senderSocketId) {
                io.to(senderSocketId).emit("newMessage", userMessage);
            }

            res.status(201).json(userMessage);
            console.log(message)
            // --- AI Response part (happens after your request is finished) ---
            const aiResponseText = await getGeminiResponse(message);
            console.log("DEBUG #6: Gemini response text:", aiResponseText);

            const aiMessage = new Message({
                senderId: receiverId,
                receiverId: senderId,
                message: aiResponseText,
                messageType: 'text'
            });
            await aiMessage.save();
            conversation.messages.push(aiMessage._id);
            await conversation.save();
            console.log("DEBUG #7: AI message saved to DB.");

            if (senderSocketId) {
                console.log("DEBUG #8: Emitting AI message to sender via socket ID:", senderSocketId);
                io.to(senderSocketId).emit("newMessage", aiMessage);
            } else {
                console.log("DEBUG #8_WARN: Could not find socket ID for sender. AI response was not sent in real-time.");
            }
            return;
        }

        // --- Original Peer-to-Peer Logic ---
        console.log("DEBUG #1A: Message is for a regular user. Entering P2P logic.");
        // (The rest of your original logic for regular users goes here)
        cloudinary.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        let conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] }, });
        if (!conversation) { conversation = await Conversation.create({ participants: [senderId, receiverId] }) };
        let newMessage;
        const file = req.file;
        if (file) {
            const uploadResponse = await cloudinary.v2.uploader.upload(file.path, { resource_type: "auto", });
            newMessage = new Message({ senderId, receiverId, message: message || file.originalname, messageType: file.mimetype.startsWith('image') ? 'image' : file.mimetype.startsWith('video') ? 'video' : file.mimetype.startsWith('audio') ? 'audio' : 'document', fileUrl: uploadResponse.secure_url });
        } else if (message) {
            newMessage = new Message({ senderId, receiverId, message, messageType: 'text' });
        } else {
            return res.status(400).json({ error: "Message content or file is required" });
        }
        if (newMessage) { conversation.messages.push(newMessage._id); }
        await Promise.all([conversation.save(), newMessage.save()]);
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) { io.to(receiverSocketId).emit("newMessage", newMessage); }
        return res.status(201).json(newMessage);

    } catch (error) {
        console.log("CRITICAL_ERROR in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Keep getMessage as it is
export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        if (!conversation) {
            const receiver = await User.findById(receiverId);
            if (receiver && receiver.username === GEMINI_BOT_USERNAME) {
                const botUser = await User.findOne({ username: GEMINI_BOT_USERNAME });
                if (!botUser) {
                    await User.create({
                        fullName: GEMINI_BOT_FULLNAME,
                        username: GEMINI_BOT_USERNAME,
                        password: `dummy_password_${Date.now()}`,
                        profilePhoto: GEMINI_BOT_AVATAR,
                        gender: "male",
                    });
                }
            }
            return res.status(200).json([]);
        }

        return res.status(200).json(conversation.messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}