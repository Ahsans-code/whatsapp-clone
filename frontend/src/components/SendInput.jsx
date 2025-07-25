import React, { useState, useRef, useEffect } from 'react';
import { IoSend, IoDocumentTextOutline, IoClose } from 'react-icons/io5';
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '../main';
import VoiceRecorder from './VoiceRecorder'; // Naya component import karein

const SendInput = () => {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);
    const fileInputRef = useRef(null);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const cancelFilePreview = () => {
        setFile(null);
        setPreviewUrl("");
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if ((!message.trim() && !file) || isLoading) return;

        setIsLoading(true);
        const formData = new FormData();

        if (file) formData.append('file', file);
        if (message.trim()) formData.append('message', message);

        try {
            const res = await axios.post(`${BASE_URL}/api/v1/message/send/${selectedUser?._id}`, formData, {
                withCredentials: true
            });
            dispatch(setMessages([...messages, res.data]));
            setMessage("");
            cancelFilePreview();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='w-[98%] mx-auto mt-2'>
            {/* File Preview Section */}
            {previewUrl && (
                <div className="relative w-max bg-bgSecondary p-2 rounded-t-lg ml-5">
                    <button onClick={cancelFilePreview} className="absolute -top-2 -right-2 bg-gray-700 rounded-full p-1 z-10">
                        <IoClose size={14} className="text-white" />
                    </button>
                    {file.type.startsWith('image/') ? (
                        <img src={previewUrl} alt="preview" className="h-20 w-auto rounded" />
                    ) : (
                        <div className="h-20 flex items-center gap-2 p-2">
                            <IoDocumentTextOutline size={40} className="text-white" />
                            <span className="text-white text-sm max-w-xs truncate">{file.name}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Main Input Area */}
            <form onSubmit={onSubmitHandler} className='bg-bgSecondary rounded-full p-3 mb-2 flex items-center gap-5'>
                {isLoading && (
                    <AiOutlineLoading3Quarters className="animate-spin text-white" size={'20px'} />
                )}
                {!isLoading && (
                    <div className='flex gap-4 text-[#ccc]'>
                        <BsEmojiSmile size={'20px'} className='cursor-pointer hover:text-gray-200' />
                        <label htmlFor="file-attachment" className='cursor-pointer hover:text-gray-200'>
                            <ImAttachment size={'20px'} />
                        </label>
                        <input id="file-attachment" type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                    </div>
                )}

                <div className='flex-1 relative'>
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        placeholder='Type a message'
                        className='bg-transparent text-sm block w-full text-white focus:outline-none'
                        disabled={isLoading}
                    />
                </div>

                {/* Conditional Send Button or Voice Recorder */}
                {message.trim() || file ? (
                    <button type="submit" className='text-gray-400 hover:text-green-500' disabled={isLoading}>
                        <IoSend size={'24px'} />
                    </button>
                ) : (
                    <VoiceRecorder setIsLoading={setIsLoading} isLoading={isLoading} />
                )}
            </form>
        </div>
    );
};

export default SendInput;