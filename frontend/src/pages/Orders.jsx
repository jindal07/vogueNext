import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
function Orders() {
  const {products,currency}=useContext(ShopContext);
  return (
    <div className=' pt-16'>
      <div className='text-2xl'>
        <Title text1={'My'} text2={'Orders'} />
      </div>
      <div>
        {products.slice(1,4).map((product) => (
          <div key={product.id} className='py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-16 sm:w-20' src={product.image[0]} alt="" />
              <div >
                <h3>{product.name}</h3>
                <div className='flex items-center gap-3 my-2 text-base text-gray-700'>
                  <p className='text-md'>{currency}{product.price}</p>
                  <p>Quantity: <span className='text-gray-400'>1</span></p>
                  <p>Size: <span className='text-gray-400'>M</span></p>
                </div>
                <p>Date: <span className='text-gray-400'>08, July, 2025</span></p>
              </div>
            </div>
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-400'></p>
                <p className='text-sm md:text-base'>Ready to ship</p>
              </div>
              <button className='border border-gray-300 px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
