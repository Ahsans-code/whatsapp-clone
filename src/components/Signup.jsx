// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import axios from "axios";
// import toast from "react-hot-toast";
// import { BASE_URL } from '..';


// const Signup = () => {
//   const [user, setUser] = useState({
//     fullName: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//     gender: "",
//   });
//   const navigate = useNavigate();
//   const handleCheckbox = (gender) => {
//     setUser({ ...user, gender });
//   }
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         withCredentials: true
//       });
//       if (res.data.success) {
//         navigate("/login");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//       console.log(error);
//     }
//     setUser({
//       fullName: "",
//       username: "",
//       password: "",
//       confirmPassword: "",
//       gender: "",
//     })
//   }
//   return (
//     <div className="min-w-96 mx-auto">
//       <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
//         <h1 className='text-3xl font-bold text-center'>Signup</h1>
//         <form onSubmit={onSubmitHandler} action="">
//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text'>Full Name</span>
//             </label>
//             <input
//               value={user.fullName}
//               onChange={(e) => setUser({ ...user, fullName: e.target.value })}
//               className='w-full input input-bordered h-10'
//               type="text"
//               placeholder='Full Name' />
//           </div>
//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text'>Username</span>
//             </label>
//             <input
//               value={user.username}
//               onChange={(e) => setUser({ ...user, username: e.target.value })}
//               className='w-full input input-bordered h-10'
//               type="text"
//               placeholder='Username' />
//           </div>
//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text'>Password</span>
//             </label>
//             <input
//               value={user.password}
//               onChange={(e) => setUser({ ...user, password: e.target.value })}
//               className='w-full input input-bordered h-10'
//               type="password"
//               placeholder='Password' />
//           </div>
//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text'>Confirm Password</span>
//             </label>
//             <input
//               value={user.confirmPassword}
//               onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
//               className='w-full input input-bordered h-10'
//               type="password"
//               placeholder='Confirm Password' />
//           </div>
//           <div className='flex items-center my-4'>
//             <div className='flex items-center'>
//               <p>Male</p>
//               <input
//                 type="checkbox"
//                 checked={user.gender === "male"}
//                 onChange={() => handleCheckbox("male")}
//                 defaultChecked
//                 className="checkbox mx-2" />
//             </div>
//             <div className='flex items-center'>
//               <p>Female</p>
//               <input
//                 type="checkbox"
//                 checked={user.gender === "female"}
//                 onChange={() => handleCheckbox("female")}
//                 defaultChecked
//                 className="checkbox mx-2" />
//             </div>
//           </div>
//           <p className='text-center my-2'>Already have an account? <Link to="/login"> login </Link></p>
//           <div>
//             <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>Singup</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Signup
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
    <div className='h-screen flex flex-col'>
      {/* Top green banner */}
      <div className='h-[25vh] bg-[#00a884]'></div>

      {/* Main content area */}
      <div className='h-[75vh] bg-[#eae6df] flex justify-center items-start pt-10'>
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
                className='w-full input input-bordered h-12'
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
                className='w-full input input-bordered h-12'
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
                className='w-full input input-bordered h-12'
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
                className='w-full input input-bordered h-12'
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