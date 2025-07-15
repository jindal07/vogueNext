import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
function RelatedProducts({category,subCategory}) {

    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([])
    useEffect(() => {
        if(products.length>0){
            let relatedProducts = products.filter((item) => {
                return item.category === category && item.subCategory === subCategory;
            });
            // console.log("Related Products: ", relatedProducts.slice(0,5));
            
            setRelated(relatedProducts);
        }
    }, [products])
    
  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={"Related"} text2={"Products"}/>

        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-5 '>
            {
                related.length > 0 ? related.slice(0,5).map((item,index) => (
                    <div onClick={()=>scrollTo({top: 0, behavior: 'smooth'})}  className=" shadow-2xl hover:scale-110 transition ease-in-out p-2">
                        <ProductItem key={index} id={item._id} name={item.name} images={item.images} price={item.price} />
                    </div>
                    
                )) : <p className='col-span-full text-center text-gray-500'>No related products found</p>
            }
        </div>
      
    </div>
  )
}

export default RelatedProducts
