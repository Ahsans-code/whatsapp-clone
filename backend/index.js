// backend/index.js

import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import { User } from "./models/userModel.js"; // <--- IMPORT USER MODEL
import bcrypt from "bcryptjs/dist/bcrypt.js";

const PORT = process.env.PORT || 5000;

// --- NEW: BOT CONFIGURATION ---
export const GEMINI_BOT_USERNAME = "gemini-ai";
export const GEMINI_BOT_FULLNAME = "Gemini AI";
export const GEMINI_BOT_AVATAR = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHP-IT3HbbTDwz5iCZOq5foDGaRYfMku-iaA&s";

// --- NEW: Function to create the bot user if it doesn't exist ---
const ensureBotUserExists = async () => {
    try {
        const botUser = await User.findOne({ username: GEMINI_BOT_USERNAME });
        if (!botUser) {
            console.log("Gemini AI user not found. Creating...");
            await User.create({
                fullName: GEMINI_BOT_FULLNAME,
                username: GEMINI_BOT_USERNAME,
                // We give it a dummy password, it will never be used for login
                password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10),
                profilePhoto: GEMINI_BOT_AVATAR,
                gender: "male", // Or any other default value
            });
            console.log("Gemini AI user created successfully.");
        } else {
            // Optional: ensure avatar is up-to-date
            if (botUser.profilePhoto !== GEMINI_BOT_AVATAR) {
                botUser.profilePhoto = GEMINI_BOT_AVATAR;
                await botUser.save();
            }
            console.log("Gemini AI user already exists.");
        }
    } catch (error) {
        console.error("Error ensuring Gemini AI user exists:", error);
    }
};

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
    origin: ['whatsapp-clone-ndo61r27w-ahsans-codes-projects.vercel.app', 'http://localhost:5173', "https://whatsapp-clone-black-theta.vercel.app", "http://localhost:5174"],
    credentials: true
};
app.use(cors(corsOption));
ensureBotUserExists()

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);


server.listen(PORT, async () => { // <--- Make this async
    await connectDB(); // <--- Wait for DB connection
    // await ensureBotUserExists(); // <--- Call the new function (Note: requires bcrypt, let's move this logic to a better place)
    console.log(`Server listen at prot ${PORT}`);
});

// For simplicity, we will handle bot creation inside the user controller to avoid importing bcrypt here.
// But conceptually, this is what we are achieving. The logic will be placed in the message controller.