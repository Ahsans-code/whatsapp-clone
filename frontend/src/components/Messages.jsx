// frontend/src/components/Messages.jsx

import React from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from "react-redux";
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

// A simple component for the loading text
const MessageSkeleton = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <p className="text-lg text-gray-400">Loading messages...</p>
        </div>
    )
}

const Messages = () => {
    useGetMessages();
    useGetRealTimeMessage();
    // Get both messages AND the new loading state from the store
    const { messages, loading } = useSelector(store => store.message);

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {/* Conditional Rendering Logic */}
            {loading ? (
                <MessageSkeleton />
            ) : (
                messages?.length > 0 ? (
                    messages.map((message) => (
                        <Message key={message._id} message={message} />
                    ))
                ) : (
                    !loading && <div className="flex justify-center items-center h-full"><p className="text-gray-400">Send a message to start the conversation!</p></div>
                )
            )}
        </div>
    )
}

export default Messages;