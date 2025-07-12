import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [currentState, setCurrentState] = useState('Sign Up')

  const onSubmitHandler= async (e) => {
    e.preventDefault(); 
  }

  return (
    <form onSubmit={onSubmitHandler()} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800' >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-2xl font-semibold'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      <input required type="text" placeholder='Enter your name' className={`border border-gray-300 w-full px-3 py-2  focus:outline-none focus:border-gray-500 ${(currentState==='Log In')?'hidden':''}`} />
      <input required type="mail" placeholder='Enter your email' className='border border-gray-300 w-full px-3 py-2  focus:outline-none focus:border-gray-500' />
      <input required type="password" placeholder='Enter your password' className='border border-gray-300 w-full px-3 py-2  focus:outline-none focus:border-gray-500' />
      <div className='px-1 flex flex-col sm:flex-row justify-between items-center w-full text-sm text-black'>
        <p className={`${(currentState==='Sign Up')?'hidden':''}`}>Forgot your password?</p>
        <Link to={'/login'} onClick={(e)=>{(currentState==='Sign Up')?setCurrentState('Log In'):setCurrentState('Sign Up')}}><p>{(currentState==='Sign Up')?'Have an Account? Login Here':'Create Account'} </p></Link>
      </div>
      <div>
        <button className='bg-black cursor-pointer text-white px-5 py-2 w-full hover:bg-gray-800 transition duration-300'>
          {currentState}
        </button>
      </div>
    </form >
  )
}

export default Login
