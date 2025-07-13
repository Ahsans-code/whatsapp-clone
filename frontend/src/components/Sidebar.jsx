// import React, { useState } from 'react'
// import { BiSearchAlt2 } from "react-icons/bi";
// import OtherUsers from './OtherUsers';
// import axios from "axios";
// import toast from "react-hot-toast";
// import {useNavigate} from "react-router-dom";
// import {useSelector, useDispatch} from "react-redux";
// import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
// import { setMessages } from '../redux/messageSlice';
// import { BASE_URL } from '..';
 
// const Sidebar = () => {
//     const [search, setSearch] = useState("");
//     const {otherUsers} = useSelector(store=>store.user);
//     const dispatch = useDispatch();

//     const navigate = useNavigate();

//     const logoutHandler = async () => {
//         try {
//             const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
//             navigate("/login");
//             toast.success(res.data.message);
//             dispatch(setAuthUser(null));
//             dispatch(setMessages(null));
//             dispatch(setOtherUsers(null));
//             dispatch(setSelectedUser(null));
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     const searchSubmitHandler = (e) => {
//         e.preventDefault();
//         const conversationUser = otherUsers?.find((user)=> user.fullName.toLowerCase().includes(search.toLowerCase()));
//         if(conversationUser){
//             dispatch(setOtherUsers([conversationUser]));
//         }else{
//             toast.error("User not found!");
//         }
//     }
//     return (
//         <div className='border-r border-slate-500 p-4 flex flex-col'>
//             <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2'>
//                 <input
//                     value={search}
//                     onChange={(e)=>setSearch(e.target.value)}
//                     className='input input-bordered rounded-md' type="text"
//                     placeholder='Search...'
//                 />
//                 <button type='submit' className='btn bg-zinc-700 text-white'>
//                     <BiSearchAlt2 className='w-6 h-6 outline-none'/>
//                 </button>
//             </form>
//             <div className="divider px-3"></div> 
//             <OtherUsers/> 
//             <div className='mt-2'>
//                 <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
//             </div>
//         </div>
//     )
// }

// export default Sidebar

import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '../main';
import { FiLogOut } from "react-icons/fi";


const Sidebar = () => {
    const [search, setSearch] = useState("");
    const { otherUsers, authUser } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.log(error);
        }
    }

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase()));
        if (conversationUser) {
            dispatch(setOtherUsers([conversationUser]));
        } else {
            toast.error("User not found!");
        }
    }
console.log(authUser)
    return (
        <div className='w-[30%] border-r border-bgSecondary bg-blackBg text-white flex flex-col'>
            {/* Header */}
            <div className='flex items-center justify-between  h-[60px] p-3'>
                {/* <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src={authUser?.profilePhoto} alt="user-profile" />
                    </div>
                </div> */}
                <h2 className='text-xl font-semibold'>WhatsApp</h2>
                <div className='flex items-center'>
                    <button onClick={logoutHandler} className='p-2 rounded-full hover:bg-[#374248]'>
                        <FiLogOut className='w-6 h-6' title='Logout' />
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className='p-2 '>
                <form onSubmit={searchSubmitHandler} className='flex items-center bg-bgSecondary rounded-full p-1'>
                    <button type='submit' className='p-2 text-gray-400'>
                        <BiSearchAlt2 className='w-5 h-5' />
                    </button>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='text-sm  focus:outline-none w-full text-white p-1' type="text"
                        placeholder='Search or start new chat'
                    />
                </form>
            </div>
            <div className="divider px-3 my-0"></div>
            {/* Other Users */}
            <OtherUsers />
        </div>
    )
}

export default Sidebar;