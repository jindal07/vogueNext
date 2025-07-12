import React, { useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'
function PlaceOrder() {
  const [method, setMethod] = useState('cod')
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14  min-h-[80vh] '>
      {/* LEFT SIDE */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className='text-xl sm:text-2xl my-3'>
              <Title text1={'Delivery'} text2={'Information'}/>
          </div>
          <div className='flex gap-3'>
              <input required type="text" placeholder='First Name' className='border border-gray-300 px-3 py-2 w-full outline-none' />
              <input required type="text" placeholder='Last Name' className='border border-gray-300 px-3 py-2 w-full outline-none' />
          </div>
          <div className='flex gap-3'>
              <input required type="email" placeholder='Enter your email address' className='border border-gray-300 px-3 py-2 w-full outline-none' />
          </div>
          <div className='flex gap-3'>
              <input required type="text" placeholder='Street' className='border border-gray-300 px-3 py-2 w-full outline-none' />
          </div>
          <div className='flex gap-3'>
              <input required type="text" placeholder='City' className='border border-gray-300 px-3 py-2 w-full outline-none' />
              <input required type="text" placeholder='State' className='border border-gray-300 px-3 py-2 w-full outline-none' />
          </div>
          <div className='flex gap-3'>
              <input required type="text" placeholder='ZipCode' className='border border-gray-300 px-3 py-2 w-full outline-none' />
              <input required type="text" placeholder='Country' className='border border-gray-300 px-3 py-2 w-full outline-none' />
          </div>
          <div className='flex gap-3'>
              <input required type="text" placeholder='Phone number' className='border border-gray-300 px-3 py-2 w-full outline-none' />
          </div>
      </div>
      {/* RIGHT SIDE */}
      <div className='flex-1 items-start flex flex-col gap-4  sm:mx-10'>
        <div className=' text-xl sm:text-3xl my-3'>
          <CartTotal/>
        </div>
        <div className=' text-xl my-3'>
          <Title text1={'Payment'} text2={'Method'}/>
          {/* Payment method selection */}
          <div className='flex flex-col lg:flex-row gap-3 mt-3'>
            <div onClick={()=>setMethod('stripe')} className='flex items-center  gap-4 border border-gray-300 p-2 px-3 cursor-pointer hover:bg-gray-100 transition duration-300'>
              <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method==='stripe'?'bg-green-400':''}`}></p>
              <img src={assets.stripe_logo} className='w-auto h-5' alt="" />
            </div>
            <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-4 border border-gray-300 p-2 px-3 cursor-pointer hover:bg-gray-100 transition duration-300'>
              <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method==='razorpay'?'bg-green-400':''}`}></p>
              <img src={assets.razorpay_logo} className='w-auto h-5' alt="" />
            </div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-4 border border-gray-300 p-2 px-3 cursor-pointer hover:bg-gray-100 transition duration-300'>
              <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method==='cod'?'bg-green-400':''}`}></p>
              <p className='text-sm text-gray-800 font-semibold'>CASH ON DELIVERY</p>
            </div>
          </div>
        </div>
        <div className='w-full '>
          <Link to='/orders' className='bg-black text-white px-4 sm:px-8 py-2 hover:bg-gray-800 transition duration-300 w-full sm:w-auto'>
            Place Order
          </Link>
        </div>
       
      </div>
    </div>
  )
}

export default PlaceOrder
