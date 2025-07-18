import React from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
function CartTotal() {
    const {currency, delivery_fee, getCartAmount} = useContext(ShopContext);
  return (
    <div className='w-full flex flex-col '>
      <div className='text-2xl mb-5'>
        <Title text1={'Cart'} text2={'Total'} />
      </div>
      <div className='flex flex-col  w-full sm:w-80 gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{currency}{getCartAmount()}.00</p>
            </div>
            <hr className='text-gray-400' />
            <div className='flex justify-between'>
                <p>Delivery Fee</p>
                <p>{currency}{delivery_fee}.00</p>
            </div>
            <hr className='text-gray-400'/>
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency}{getCartAmount()===0?0:getCartAmount() + delivery_fee}.00</b>
            </div>
        

      </div>
    </div>
  )
}

export default CartTotal
