import mongoose from "mongoose";

const messageModel = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    messageType: {
        type: String,
        enum: ['text', 'image', 'video', 'document', 'audio'],
        default: 'text'
    },
    fileUrl: {
        type: String,
        default: ""
    }
}, { timestamps: true });
export const Message = mongoose.model("Message", messageModel);