// import React, { useEffect } from 'react'
// import Sidebar from './Sidebar'
// import MessageContainer from './MessageContainer'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// const HomePage = () => {
//   const { authUser } = useSelector(store => store.user);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!authUser) {
//       navigate("/login");
//     }
//   }, []);
//   return (
//     <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//       <Sidebar />
//       <MessageContainer />
//     </div>
//   )
// }

// export default HomePage
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(false)

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  return (
    <div className='flex items-center justify-center h-screen bg-blackBg'>
      <div className='flex w-screen h-screen overflow-hidden'>
        <Sidebar collapse={collapse} setCollapse={setCollapse} />
        <MessageContainer setCollapse={setCollapse} />
      </div>
    </div>
  )
}

export default HomePage;