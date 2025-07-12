import express from 'express';
import { listProduct,addProduct,removeProduct,singleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Route for adding a product
productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]), addProduct);

// Route for listing products
productRouter.get('/list', listProduct);

// Route for removing a product
productRouter.post('/remove',adminAuth, removeProduct);

// Route for getting single product details
productRouter.post('/single', singleProduct);

export default productRouter;