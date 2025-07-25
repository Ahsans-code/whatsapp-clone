import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import cloudinary from 'cloudinary'; // Cloudinary import karein

// Cloudinary config (aap isse ek alag config file mein bhi daal sakte hain)


export const sendMessage = async (req, res) => {

    try {
        cloudinary.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body; // Text message yahan se aayega
        const file = req.file; // File yahan se aayegi (multer se)
        console.log("Received file object:", file);
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        };

        let newMessage;

        // Agar file hai
        if (file) {
            // File ko Cloudinary par upload karein
            const uploadResponse = await cloudinary.v2.uploader.upload(file.path, {
                // resource_type auto detect karega ki file image, video, ya raw (document/audio) hai
                resource_type: "auto",
            });

            newMessage = new Message({
                senderId,
                receiverId,
                message: message || file.originalname, // File ka naam message mein save kar lete hain
                messageType: file.mimetype.startsWith('image') ? 'image' :
                    file.mimetype.startsWith('video') ? 'video' :
                        file.mimetype.startsWith('audio') ? 'audio' : 'document',
                fileUrl: uploadResponse.secure_url // Cloudinary se mila URL
            });
        }
        // Agar sirf text message hai
        else if (message) {
            newMessage = new Message({
                senderId,
                receiverId,
                message,
                messageType: 'text'
            });
        }
        // Agar kuch bhi nahi hai
        else {
            return res.status(400).json({ error: "Message content or file is required" });
        }

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        // SOCKET IO (important: pura newMessage object bhejein)
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

// getMessage controller waise hi rahega, kyunki populate() ab naye fields bhi le aayega.
export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }

        return res.status(200).json(conversation.messages);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}