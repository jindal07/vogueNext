import React from 'react'
import { assets } from '../assets/admin_assets/assets'
function Navbar({setToken}) {
  return (
    <div className='flex items-center justify-between  py-5 rounded-xl font-medium bg-white shadow-xl px-5 mx-5 mt-2 sm:px-10'>
      <img className='hover:scale-110 outline-0 transition ease-in-out duration-300 w-auto h-10 sm:w-auto sm:h-10' src={assets.logo} alt="logo" />
      <button onClick={()=>setToken("")} className='px-4 py-2 border border-gray-500 rounded-xl hover:bg-black hover:text-white cursor-pointer transition duration-300 outline-none'>Log Out</button>
    </div>
  )
}

export default Navbar
