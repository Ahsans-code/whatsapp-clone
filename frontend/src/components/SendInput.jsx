// import React, {useState } from 'react'
// import { IoSend } from "react-icons/io5";
// import axios from "axios";
// import {useDispatch,useSelector} from "react-redux";
// import { setMessages } from '../redux/messageSlice';
// import { BASE_URL } from '..';

// const SendInput = () => {
//     const [message, setMessage] = useState("");
//     const dispatch = useDispatch();
//     const {selectedUser} = useSelector(store=>store.user);
//     const {messages} = useSelector(store=>store.message);

//     const onSubmitHandler = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post(`${BASE_URL}/api/v1/message/send/${selectedUser?._id}`, {message}, {
//                 headers:{
//                     'Content-Type':'application/json'
//                 },
//                 withCredentials:true
//             });
//             dispatch(setMessages([...messages, res?.data?.newMessage]))
//         } catch (error) {
//             console.log(error);
//         } 
//         setMessage("");
//     }
//     return (
//         <form onSubmit={onSubmitHandler} className='px-4 my-3'>
//             <div className='w-full relative'>
//                 <input
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     type="text"
//                     placeholder='Send a message...'
//                     className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'
//                 />
//                 <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-4'>
//                     <IoSend />
//                 </button>
//             </div>
//         </form>
//     )
// }

// export default SendInput
import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '../main';
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";

const SendInput = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!message.trim()) return; // Prevent sending empty messages
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/message/send/${selectedUser?._id}`, { message }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            dispatch(setMessages([...messages, res?.data?.newMessage]))
        } catch (error) {
            console.log(error);
        }
        setMessage("");
    }

    return (
        <div className='bg-bgSecondary w-[98%] mx-auto mt-2 rounded-full p-3 mb-2 flex items-center gap-5'>
            {/* Icons */}
            <div className='flex gap-4 text-[#ccc]'>
                <BsEmojiSmile size={'20px'} className='cursor-pointer hover:text-gray-200' />
                <ImAttachment size={'20px'} className='cursor-pointer hover:text-gray-200' />
            </div>

            {/* Input Form */}
            <form onSubmit={onSubmitHandler} className='flex-1 '>
                <div className='w-full relative '>
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        placeholder='Type a message'
                        className=' text-sm block w-full  text-white focus:outline-none'
                    />
                    <button type="submit" className='absolute flex inset-y-0 end-0 items-center px-4 text-gray-400 hover:text-green-500 bg-bgSecondary' >
                        <IoSend size={'24px'} />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SendInput;