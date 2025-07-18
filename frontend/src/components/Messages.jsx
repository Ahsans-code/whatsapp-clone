// import React from 'react'
// import Message from './Message'
// import useGetMessages from '../hooks/useGetMessages';
// import { useSelector } from "react-redux";
// import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

// const Messages = () => {
//     useGetMessages();
//     useGetRealTimeMessage();
//     const { messages } = useSelector(store => store.message);
//     return (
//         <div className='px-4 flex-1 overflow-auto'>
//             {
//                messages && messages?.map((message) => {
//                     return (
//                         <Message key={message._id} message={message} />
//                     )
//                 })
//             }

//         </div>


//     )
// }

// export default Messages
import React from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from "react-redux";
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';
// import chatBg from '../assets/chat-bg.png'; // Make sure you have a background image at this path

const Messages = () => {
    useGetMessages();
    useGetRealTimeMessage();
    const { messages } = useSelector(store => store.message);
console.log(messages,"messages")
    return (
        <div className='px-4 flex-1 overflow-auto ' 
        
        >
            {
                messages && messages?.map((message) => {
                    return (
                        <Message key={message._id} message={message} />
                    )
                })
            }
        </div>
    )
}

export default Messages;