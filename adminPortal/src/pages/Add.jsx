import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import {backendUrl} from "../App";
import { toast } from "react-toastify";

function Add({token}) {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [sizes, setSizes] = useState([])
  const [bestSeller, setBestseller] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault(); 
    try {
      if (!image1 && !image2 && !image3 && !image4) {
            toast.error("Please upload at least one image");
            return;
        }
          if (!price || price <= 0) {
            toast.error("Please enter a valid price");
            return;
        }

       
        if (sizes.length === 0) {
            toast.error("Please select at least one size");
            return;
        }
      const formData= new FormData();
      if (image1) formData.append('image1', image1);
        if (image2) formData.append('image2', image2);
        if (image3) formData.append('image3', image3);
        if (image4) formData.append('image4', image4);

      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('sizes', JSON.stringify(sizes));
      formData.append('bestSeller', bestSeller);

      const response = await axios.post(backendUrl+'/api/product/add', formData,{headers:{token}} )
     

      if(response.data.success) {
         toast.success(response.data.message);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setName('');
        setDescription('');
        setPrice('');
        setSizes([]); 
            setBestseller(false);
      }
      else{
        toast.error(response.data.message);
      }
      
      
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.message);
      
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-start w-full gap-3">
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex items-center  gap-3">
          <label htmlFor="image1">
            <img className="cursor-pointer w-20 " src={!image1?assets.upload_area:URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className="cursor-pointer w-20 " src={!image2?assets.upload_area:URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className="cursor-pointer w-20 " src={!image3?assets.upload_area:URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className="cursor-pointer w-20 " src={!image4?assets.upload_area:URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className=" flex mb-1 flex-col w-full">
        <p>Product Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} required className=" outline-gray-800 max-w-[500px] border mt-1 border-gray-300 px-1 sm:px-3 sm:py-1" type="text" placeholder="Type Here" />
      </div>
      
      <div className="flex flex-col w-full">
        <p>Product Description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} required className=" outline-gray-800  border mt-1 max-w-[500px] border-gray-300 px-1 sm:px-3 sm:py-1" type="text" placeholder="Write content here" />
      </div>


      <div className="flex max-w-[600px] flex-col  w-full justify-between gap-3 sm:flex-row">
        <div className="flex flex-col w-full">
          <p>Product category</p>
          <select onChange={(e)=>setCategory(e.target.value)} value={category} className="cursor-pointer border w-full mt-2 border-gray-300 px-1 sm:px-3 sm:py-1" name="category" id="category">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div  className="flex flex-col w-full">
          <p>SubCategory</p>
          <select onChange={(e)=>setSubCategory(e.target.value)} value={subCategory}  className=" cursor-pointer border w-full mt-2 border-gray-300 px-1 sm:px-3 sm:py-1" name="subCategory" id="subCategory">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div className="flex flex-col w-full">
          <p>Product Price</p>
          <input required onChange={(e)=>setPrice(e.target.value)} value={price} className="border mt-2 border-gray-300 px-1 sm:px-3 sm:py-1"  type="number" min={1} placeholder="100" />
        </div>
      </div>

      <div>
        <p>Product Sizes</p>
        <div  className="flex gap-3 mt-2">
          <p onClick={()=>setSizes(prev=>prev.includes("S")?prev.filter(item=>item!=="S"):[...prev,"S"])} className={`border px-2   cursor-pointer ${sizes.includes("S")?'text-black border-green-300':'bg-gray-200'}`}>S</p>
          <p onClick={()=>setSizes(prev=>prev.includes("M")?prev.filter(item=>item!=="M"):[...prev,"M"])} className={`border px-2   cursor-pointer ${sizes.includes("M")?'text-black border-green-300':'bg-gray-200'}`}>M</p>
          <p onClick={()=>setSizes(prev=>prev.includes("L")?prev.filter(item=>item!=="L"):[...prev,"L"])} className={`border px-2   cursor-pointer ${sizes.includes("L")?'text-black border-green-300':'bg-gray-200'}`}>L</p>
          <p onClick={()=>setSizes(prev=>prev.includes("XL")?prev.filter(item=>item!=="XL"):[...prev,"XL"])} className={`border px-2   cursor-pointer ${sizes.includes("XL")?'text-black border-green-300':'bg-gray-200'}`}>XL</p>
          <p onClick={()=>setSizes(prev=>prev.includes("XXL")?prev.filter(item=>item!=="XXL"):[...prev,"XXL"])} className={`border px-2   cursor-pointer ${sizes.includes("XXL")?'text-black border-green-300':'bg-gray-200'}`}>XXL</p>
        </div>
        
      </div>

      <div className=" flex items-center mt-3">
        <input onChange={()=>setBestseller(prev=>!prev)} checked={bestSeller} className="cursor-pointer" type="checkbox" id="bestSeller" />
        <label htmlFor="bestSeller" className="cursor-pointer ml-2">Mark as BestSelller</label>
      </div>

      <button className="bg-black  text-white px-8 py-2 cursor-pointer hover:bg-gray-900 ">ADD</button>
    </form>
  );
}

export default Add;
