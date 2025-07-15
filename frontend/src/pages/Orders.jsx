import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios, { all } from 'axios';
function Orders() {
  const {backendUrl,token,currency}=useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData=async()=>{
    try {
      if(!token){
        return null;
      }
      const response=await axios.post(backendUrl+"/api/order/userorders",{},{headers:{token}})
      if(response.data.success){
        let allOrdersItem=[]
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status']=order.status
            item['payment']=order.payment
            item['paymentMethod']=order.paymentMethod
            item['date']=order.date
            allOrdersItem.push(item)
          })
        })
        console.log(allOrdersItem);
        
        setOrderData(allOrdersItem.reverse())
      }
      
    } catch (error) {
      
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [token])
  

  return (
    <div className=' pt-16'>
      <div className='text-2xl'>
        <Title text1={'My'} text2={'Orders'} />
      </div>
      <div>
        {orderData.map((product) => (
          <div key={product.id} className='py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-start gap-6 text-sm'>
              <img className='w-16 sm:w-20' src={product.images[0]} alt="" />
              <div >
                <h3>{product.name}</h3>
                <div className='flex items-center gap-3 my-2 text-base text-gray-700'>
                  <p className='text-md'>{currency}{product.price}</p>
                  <p>Quantity: <span className='text-gray-400'>{product.quantity}</span></p>
                  <p>Size: <span className='text-gray-400'>{product.size}</span></p>
                </div>
                <p >Date: <span className='text-gray-400 '>{new Date(product.date).toDateString()}</span></p>
                <p>Payment: <span className='text-gray-400 mt-1'>{product.paymentMethod}</span></p>
              </div>
            </div>
            <div className='md:w-1/2 flex justify-between'>
              <div className='flex items-center gap-2'>
                <p className='min-w-2 h-2 rounded-full bg-green-400'></p>
                <p className='text-sm md:text-base'>{product.status}</p>
              </div>
              <button onClick={loadOrderData} className='cursor-pointer hover:bg-gray-100 border border-gray-300 px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
