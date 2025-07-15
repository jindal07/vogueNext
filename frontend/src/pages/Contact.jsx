import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetter from '../components/NewsLetter'

function Contact() {
  return (
    <div>
      <div className='text-center text-2xl pt-10'>
        <Title text1={'Contact'} text2={'Us'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} alt="" className='w-full md:max-w-[480px]' />
        <div className='flex flex-col justify-center gap-5 items-start'>
          <p className='font-semibold text-xl text-gray-600'>Out Store</p>
          <p className='text-gray-500'>The LNMIIT <br /> Jaipur,Rajasthan, 302031</p>
          <p className='text-gray-500'>Phone: +91 843232xxxx <br /> Email: voguenext@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at VogueNext</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <p className=' border py-3 cursor-pointer hover:bg-black hover:text-white transition duration-400 px-6 text-lg text-gray-600'>Press Inquiries</p>
        </div>
      </div>
      <div>
        <NewsLetter/>
      </div>
    </div>
  )
}

export default Contact
