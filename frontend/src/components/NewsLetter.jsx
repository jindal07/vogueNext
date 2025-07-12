import React from 'react'

function NewsLetter() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for subscribing!");
    }
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now and get 20% off </p>
      <p className='text-gray-400 mt-3'>Don’t miss out – flash sales & trends straight to your inbox.</p>
      <form className='w-full text-sm sm:w-1/2 flex items-center gap-2 mx-auto my-6 border pl-3'>
        <input type="email" placeholder='Enter your email' className='w-full sm:flex-1 outline-none'  required />
        <button onClick={handleSubmit} type='submit' className='bg-black text-white text-xs px-10 py-4 hover:scale-110 border border-white cursor-pointer transition ease-in-out' >SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsLetter
