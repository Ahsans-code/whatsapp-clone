import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '../main';
import { BsWhatsapp } from 'react-icons/bs';

const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            navigate("/");
            dispatch(setAuthUser(res.data));
            toast.success("Login Successful!");
        } catch (error) {
            toast.error(error?.response?.data.message || "An error occurred");
            console.log(error);
        }
        setUser({
            username: "",
            password: ""
        })
    }

    return (
        <div className='h-screen w-screen flex flex-col'>
            {/* Top Banner with Logo */}
            <div className='h-[128px] bg-primary flex items-center justify-start '>
                <div className='flex items-center gap-4 mx-auto'>
                    <BsWhatsapp size={'32px'} className='text-white' />
                    <h1 className='text-xl font-semibold text-white'>WHATSAPP WEB</h1>
                </div>
            </div>

            {/* Main Content Area */}
            <div className='flex-1 bg-[#eae6df] flex justify-center items-center w-full' >
                <div className="w-full max-w-md  p-10 rounded-lg shadow-xl bg-white">
                    <h1 className='text-3xl font-light text-center text-gray-700'>Login to Your Account</h1>
                    <form onSubmit={onSubmitHandler} className="mt-8 space-y-6">
                        <div>
                            <label className='block text-sm font-medium text-gray-600 mb-2'>
                                Username
                            </label>
                            <input
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                                type="text"
                                placeholder='Enter username'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-600 mb-2'>
                                Password
                            </label>
                            <input
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                                type="password"
                                placeholder='Enter Password'
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className='btn w-full bg-primary text-white py-3 rounded-md text-lg font-semibold hover:bg-[#008a6b] transition-colors duration-300'
                            >
                                Login
                            </button>
                        </div>
                        <p className='text-center text-sm text-gray-600'>
                            Don't have an account?{' '}
                            <Link to="/signup" className='text-primary font-medium hover:underline'>
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;