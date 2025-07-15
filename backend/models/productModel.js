import mongoose from "mongoose";

const productSchema= new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    category:{type:String, required:true},
    subCategory:{type:String, required:true},
    images:{type:Array, required:true},
    sizes:{type:Array, required:true},
    date:{type:Number, required:true},
    bestSeller:{type:Boolean},
    
})

const productModel=mongoose.models.product || mongoose.model('products', productSchema);

export default productModel;

