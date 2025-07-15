import React, { useContext ,useEffect,useState} from 'react'
import Title from './Title';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';
function BestSeller() {
    const {products}=useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        const bestProduct= products.filter((item)=>(item.bestSeller));
        setBestSeller(bestProduct.slice(0,5))
    }, [products])
    
  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={"BEST"} text2={"SELLERS"}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Explore our best-selling products, handpicked by our customers for their quality and style. These items are favorites for a reason, and they are sure to elevate your shopping experience. Don't miss out on these top-rated selections!
        </p>
      </div>
       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
    {bestSeller.length > 0 ? (
        bestSeller.map((item,index)=>(
            <ProductItem key={index} id={item._id} images={item.images} name={item.name} price={item.price}  />
        ))
    ) : (
        <p className="col-span-full text-center text-gray-500">No best sellers found</p>
    )}
</div>
    </div>
  )
}

export default BestSeller
