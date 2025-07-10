// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import toast from "react-hot-toast"
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { setAuthUser } from '../redux/userSlice';
// import { BASE_URL } from '..';

// const Login = () => {
//   const [user, setUser] = useState({
//     username: "",
//     password: "",
//   });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         withCredentials: true
//       });
//       navigate("/");
//       console.log(res);
//       dispatch(setAuthUser(res.data));
//     } catch (error) {
//       toast.error(error?.response?.data.message);
//       console.log(error);
//     }
//     setUser({
//       username: "",
//       password: ""
//     })
//   }
//   return (
//     <div className="min-w-96 mx-auto">
//       <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
//         <h1 className='text-3xl font-bold text-center'>Login</h1>
//         <form onSubmit={onSubmitHandler} action="">

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
//           <p className='text-center my-2'>Don't have an account? <Link to="/signup"> signup </Link></p>
//           <div>
//             <button type="submit" className='btn btn-block btn-sm mt-2 border border-slate-700'>Login</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Login
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '../main';

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
        <div className='h-screen flex flex-col'>
            <div className='h-[25vh] bg-[#00a884]'></div>
            <div className='h-[75vh] bg-[#eae6df] flex justify-center items-start pt-10'>
                <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white">
                    <h1 className='text-3xl font-semibold text-center text-gray-700'>Login to Your Account</h1>
                    <form onSubmit={onSubmitHandler} className="mt-6">
                        <div>
                            <label className='label p-2'>
                                <span className='text-base label-text'>Username</span>
                            </label>
                            <input
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                                className='w-full input input-bordered h-12'
                                type="text"
                                placeholder='Enter username' />
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
                                placeholder='Enter Password' />
                        </div>
                        <div className='mt-6'>
                            <button type="submit" className='btn w-full bg-[#00a884] text-white h-12 text-lg hover:bg-[#008a6b]'>Login</button>
                        </div>
                        <p className='text-center text-sm text-gray-600 my-4'>
                            Don't have an account? <Link to="/signup" className='text-[#00a884] hover:underline'>Signup</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;