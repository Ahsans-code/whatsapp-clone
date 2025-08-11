

import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({ user, collapse }) => {
    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(user._id);
    const { messages } = useSelector(store => store.message);


    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    }

    const isSelected = selectedUser?._id === user?._id;

    return (
        <>
            <div onClick={() => selectedUserHandler(user)}
                className={`flex gap-3 my-2 justify-center items-center p-3 cursor-pointer hover:bg-bgSecondary rounded-lg ${isSelected ? 'bg-bgSecondary' : 'text-white'}`}>
                <div className={`avatar ${isOnline ? 'online' : ''}`}>
                    <div className='w-9 rounded-full'>
                        <img className='rounded-full object-cover' src={user?.profilePhoto} alt="user-profile" />
                    </div>
                </div>
                {!collapse && <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2 '>
                        <p className='font-semibold text-base'>{user?.fullName}</p>
                    </div>
                </div>}
            </div>
            {/* <div className='divider my-0 py-0 h-[1px] bg-bgSecondary'></div> */}
        </>
    )
}

export default OtherUser;