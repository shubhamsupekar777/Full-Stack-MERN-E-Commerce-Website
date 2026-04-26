import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {

  const logoutHandler = () => {
    localStorage.removeItem("adminToken")   // remove admin token
    setToken("")                            // reset state
    window.location.replace("http://localhost:5173") // go to frontend home
  }

  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
  
  {/* Logo */}
  <img className='w-[max(10%,80px)]' src={assets.logo} alt='' />

  {/* Right Side Buttons */}
  <div className='flex gap-3'>
    
    {/* 🌐 View Website Button */}
    <a 
      href="http://localhost:5173" 
      target="_blank" 
      rel="noopener noreferrer"
      className='bg-blue-600 text-white px-5 py-2 rounded-full'
    >
      View Website
    </a>

    {/* 🔓 Logout Button */}
    <button 
      onClick={logoutHandler}
      className='bg-gray-600 text-white px-5 py-2 rounded-full'
    >
      Logout
    </button>

  </div>

</div>
  )
}

export default Navbar