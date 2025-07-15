import {v2 as cloudinary} from "cloudinary";
import productModel from "../models/productModel.js";

//for add product
const addProduct=async(req,res)=>{
    try {
        
        const { name, description, price, category,subCategory,sizes, bestSeller } = req.body;
        const image1= req.files.image1 && req.files.image1[0]
        const image2= req.files.image2 && req.files.image2[0]
        const image3= req.files.image3 && req.files.image3[0]
        const image4= req.files.image4 && req.files.image4[0]

      


        const images=[image1, image2, image3, image4].filter(image => image !== undefined);
       


        let imagesUrl=await Promise.all(
            images.map(async (image) => {
                  
                let imageUrl = await cloudinary.uploader.upload(image.path, {
                    resource_type: "image",
                });
                return imageUrl.secure_url;
            })
        )
      
        const productData={
            name,
            description,
            price:Number(price),
            category,
            subCategory,
            sizes:JSON.parse(sizes),
            bestSeller:bestSeller=== "true" ? true : false,
            images: imagesUrl,
            date:Date.now()
        }
       

        const product = new productModel(productData);
        await product.save();

        
        res.json({ success: true, message: "Product added successfully" });
    } catch (error) {
        res.json({ success: false, message: "Error in adding product", error: error.message });
        console.log(`Error in adding product: ${error.message}`);
    }
}




//for list products
const listProduct=async(req,res)=>{
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        res.json({ success: false, message: "Error in fetching products", error: error.message });
        console.log(`Error in fetching products: ${error.message}`);
    }
}




//for remove product
const removeProduct=async(req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        res.json({ success: false, message: "Error in removing product", error: error.message });
        console.log(`Error in removing product: ${error.message}`);
        
    }
}





//for single product details
const singleProduct=async(req,res)=>{
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        res.json({ success: false, message: "Error in fetching product details", error: error.message });
        console.log(`Error in fetching product details: ${error.message}`);
        
    }
}

export {addProduct,listProduct,removeProduct,singleProduct};