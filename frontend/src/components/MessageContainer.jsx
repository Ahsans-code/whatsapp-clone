// import React, { useEffect } from 'react'
// import SendInput from './SendInput'
// import Messages from './Messages';
// import { useSelector,useDispatch } from "react-redux";
// import { setSelectedUser } from '../redux/userSlice';

// const MessageContainer = () => {
//     const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
//     const dispatch = useDispatch();

//     const isOnline = onlineUsers?.includes(selectedUser?._id);

//     return (
//         <>
//             {
//                 selectedUser !== null ? (
//                     <div className='md:min-w-[550px] flex flex-col'>
//                         <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
//                             <div className={`avatar ${isOnline ? 'online' : ''}`}>
//                                 <div className='w-12 rounded-full'>
//                                     <img src={selectedUser?.profilePhoto} alt="user-profile" />
//                                 </div>
//                             </div>
//                             <div className='flex flex-col flex-1'>
//                                 <div className='flex justify-between gap-2'>
//                                     <p>{selectedUser?.fullName}</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <Messages />
//                         <SendInput />
//                     </div>
//                 ) : (
//                     <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
//                         <h1 className='text-4xl text-white font-bold'>Hi,{authUser?.fullName} </h1>
//                         <h1 className='text-2xl text-white'>Let's start conversation</h1>

//                     </div>
//                 )
//             }
//         </>

//     )
// }

// export default MessageContainer
import React from 'react'
import SendInput from './SendInput'
import Messages from './Messages';
import { useSelector } from "react-redux";
import { IoChatbubblesSharp } from "react-icons/io5";
import messageBg from "/messageBg.png"
import { BiMenu } from 'react-icons/bi';


const MessageContainer = ({ setCollapse }) => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(selectedUser?._id);

    return (
        <div className='w-full bg-blackBg bg-blend-overlay  flex flex-col'
            style={{ backgroundImage: `url(${messageBg})` }}>
            {
                selectedUser !== null ? (
                    <>
                        {/* Header */}
                        <div className='flex gap-4 items-center bg-blackBg text-white px-4 py-2 h-[60px]' >
                            <button onClick={() => setCollapse(prev => !prev)}>
                                <BiMenu size={21} />

                            </button>
                            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                                <div className='w-10 rounded-full'>
                                    <img className='rounded-full object-cover' src={selectedUser?.profilePhoto} alt="user-profile" />
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <p className='font-semibold'>{selectedUser?.fullName}</p>
                                {isOnline && <p className='text-xs text-green-500'>Online</p>}
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </>
                ) : (
                    <div className='flex flex-col justify-center items-center h-full w-full'>
                        <IoChatbubblesSharp size={'200px'} className='text-gray-500' />
                        <h1 className='text-4xl text-white font-bold'>Hi, {authUser?.fullName}</h1>
                        <h1 className='text-2xl text-white'>Select a chat to start messaging</h1>
                    </div>
                )
            }
        </div>
    )
}

export default MessageContainer;