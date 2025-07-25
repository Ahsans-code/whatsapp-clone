import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { IoDocumentTextOutline } from 'react-icons/io5';
import AudioPlayer from './AudioPlayer';

const Message = ({ message }) => {
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    if (!authUser || !message) return null;

    const isSender = message.senderId === authUser._id;
    const formattedTime = new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    console.log(authUser, "suthuser")
    const renderMessageContent = () => {
        const mediaClasses = "rounded-lg max-w-xs md:max-w-sm w-full cursor-pointer";

        switch (message.messageType) {
            case 'text':
                return (
                    <div className="flex items-end gap-2 p-2">
                        <p className="break-words">{message.message}</p>
                        <span className="text-[10px] text-gray-300 whitespace-nowrap">{formattedTime}</span>
                    </div>
                );
            case 'image':
                // Image bubble will have a caption if a message was sent with it
                return (
                    <a href={message.fileUrl} target="_blank" rel="noopener noreferrer" className="block p-1">
                        <img src={message.fileUrl} alt="sent content" className="rounded-md" />
                        {/* Show caption if text message exists with image */}
                        {<p className="text-sm pt-1 px-1">{message.message}</p>}
                    </a>
                );
            case 'video':
                return (
                    <div className="p-1">
                        <video src={message.fileUrl} controls className={mediaClasses} />
                    </div>
                );
            case 'audio':
                // Custom audio player look
                return (
                    <div className="flex items-center gap-2 p-2">
                        <img src={authUser.profilePhoto} className="w-8 h-8 rounded-full" />
                        <audio src={message.fileUrl} controls className="w-96 bg-transparent h-10" />
                        <span className="text-[10px] text-gray-300 whitespace-nowrap self-end">{formattedTime}</span>
                    </div>
                    // <AudioPlayer src={message.fileUrl} />
                    // <AudioPlayer
                    //     audioUrl={message.fileUrl}
                    //     author={isSender ? authUser : selectedUser}
                    // />
                );
            case 'document':
                return (
                    <a href={message.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center bg-gray-700 hover:bg-gray-800 p-2 rounded-lg min-w-[200px] gap-2">
                        <IoDocumentTextOutline size={30} className="text-white flex-shrink-0" />
                        <span className="text-white underline truncate">{message.message}</span>
                    </a>
                );
            default:
                return <p>{message.message}</p>;
        }
    };

    const bubbleBgColor = isSender ? 'bg-primary' : 'bg-messageBg';
    // Let text, audio, and documents have padding, but not images/videos
    const hasDefaultPadding = ['text', 'audio', 'document'].includes(message.messageType);

    return (
        <div ref={scroll} className={`flex ${isSender ? 'justify-end' : 'justify-start'} my-2`}>
            <div className={`rounded-md max-w-xs md:max-w-2xl overflow-x-hidden text-white ${bubbleBgColor} ${!hasDefaultPadding ? 'p-0' : ''}`}>
                {renderMessageContent()}
                {/* Timestamp for media is handled inside or below */}
            </div>
        </div>
    );
};

export default Message;