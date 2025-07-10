
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from '../main';

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();

  // This function works for radio buttons as well
  const handleGenderChange = (gender) => {
    setUser({ ...user, gender });
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    })
  }

  return (
    <div className='h-screen flex flex-col w-full'>
      {/* Top green banner */}
      {/* <div className='h-[25vh] bg-[#00a884]'></div> */}

      {/* Main content area */}
      <div className=' bg-[#eae6df] flex justify-center items-start py-10 w-full'>
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white">
          <h1 className='text-3xl font-semibold text-center text-gray-700'>Create an Account</h1>
          <form onSubmit={onSubmitHandler} className="mt-6">
            <div>
              <label className='label p-2'>
                <span className='text-base label-text'>Full Name</span>
              </label>
              <input
                value={user.fullName}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a884]'
                type="text"
                placeholder='Enter your full name' />
            </div>

            <div className='mt-4'>
              <label className='label p-2'>
                <span className='text-base label-text'>Username</span>
              </label>
              <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a884]'
                type="text"
                placeholder='Enter a username' />
            </div>

            <div className='mt-4'>
              <label className='label p-2'>
                <span className='text-base label-text'>Password</span>
              </label>
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a884]'
                type="password"
                placeholder='Enter a password' />
            </div>

            <div className='mt-4'>
              <label className='label p-2'>
                <span className='text-base label-text'>Confirm Password</span>
              </label>
              <input
                value={user.confirmPassword}
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00a884]'
                type="password"
                placeholder='Confirm your password' />
            </div>

            <div className='flex justify-around mt-6'>
                <label className='label cursor-pointer'>
                    <span className='label-text mr-2 text-base'>Male</span> 
                    <input 
                        type="radio" 
                        name="gender" 
                        value="male" 
                        checked={user.gender === "male"} 
                        onChange={() => handleGenderChange("male")} 
                        className="radio radio-primary" 
                    />
                </label>
                <label className='label cursor-pointer'>
                    <span className='label-text mr-2 text-base'>Female</span> 
                    <input 
                        type="radio" 
                        name="gender" 
                        value="female" 
                        checked={user.gender === "female"} 
                        onChange={() => handleGenderChange("female")} 
                        className="radio radio-primary" 
                    />
                </label>
            </div>

            <div className='mt-6'>
              <button type='submit' className='btn w-full bg-[#00a884] text-white h-12 text-lg hover:bg-[#008a6b]'>Sign Up</button>
            </div>
            
            <p className='text-center text-sm text-gray-600 my-4'>
              Already have an account? <Link to="/login" className='text-[#00a884] hover:underline'>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup;