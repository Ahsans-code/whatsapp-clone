// import React, { useEffect, useRef } from 'react'
// import {useSelector} from "react-redux";

// const Message = ({message}) => {
//     const scroll = useRef();
//     const {authUser,selectedUser} = useSelector(store=>store.user);

//     useEffect(()=>{
//         scroll.current?.scrollIntoView({behavior:"smooth"});
//     },[message]);
    
//     return (
//         <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
//             <div className="chat-image avatar">
//                 <div className="w-10 rounded-full">
//                     <img alt="Tailwind CSS chat bubble component" src={message?.senderId === authUser?._id ? authUser?.profilePhoto  : selectedUser?.profilePhoto } />
//                 </div>
//             </div>
//             <div className="chat-header">
//                 <time className="text-xs opacity-50 text-white">12:45</time>
//             </div>
//             <div className={`chat-bubble ${message?.senderId !== authUser?._id ? 'bg-gray-200 text-black' : ''} `}>{message?.message}</div>
//         </div>
//     )
// }

// export default Message
import React, { useEffect, useRef } from 'react'
import { useSelector } from "react-redux";

const Message = ({ message }) => {
    const scroll = useRef();
    const { authUser } = useSelector(store => store.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);
    
    // Format timestamp
    const messageTime = new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    const isSender = message?.senderId === authUser?._id;

    return (
        <div ref={scroll} className={`flex ${isSender ? 'justify-end' : 'justify-start'} my-2`}>
            <div className={`p-2 rounded-md max-w-xs md:max-w-md ${isSender ? 'bg-[#005C4B] text-white' : 'bg-[#202C33] text-white'}`}>
                <p>{message?.message}</p>
                <span className='text-xs text-gray-400 float-right mt-1'>{messageTime}</span>
            </div>
        </div>
    )
}

export default Message;