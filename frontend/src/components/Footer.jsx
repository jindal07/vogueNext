import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div >
            <img onClick={()=>scrollTo({top: 0, behavior: 'smooth'})} className='cursor-pointer h-12 mb-5  w-auto' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
                At VogueNext, we believe great style never fades. 
                Join our community to be the first to discover new arrivals, limited-time collections, exclusive offers, and fashion tips tailored just for you. 
                Whether you're dressing up for a special moment or embracing everyday comfort, we’ve got your wardrobe covered. 
            </p>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <Link to="/"  onClick={()=>scrollTo({top: 0, behavior: 'smooth'})}><li className='hover:text-gray-800 cursor-pointer'>Home</li></Link>
                <Link to="/about"  onClick={()=>scrollTo({top: 0, behavior: 'smooth'})}><li className='hover:text-gray-800 cursor-pointer'>About Us</li></Link>
                <Link to={'/contact'} onClick={()=>scrollTo({top: 0, behavior: 'smooth'})}><li className='hover:text-gray-800 cursor-pointer'>Contact</li></Link>
                <li className='hover:text-gray-800 cursor-pointer'>Privacy Ploicy</li>
                
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li className='hover:text-gray-800 cursor-pointer'>+91 843232xxxx</li>
                <a href="mailto:forever@gmail.com"><li className='hover:text-gray-800 cursor-pointer'>voguenext@gmail.com</li></a>
            </ul>
        </div>
        
      </div>
      <div>
            <hr />
            <p className='text-gray-500 text-sm text-center py-5'>
                Copyright 2025@ VogueNext. All rights reserved.
            </p>
        </div>
    </div>
  )
}

export default Footer
