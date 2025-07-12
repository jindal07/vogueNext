import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongoDb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';

//App config
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
connectCloudinary();

//Middleware
app.use(cors());
app.use(express.json());

//API Endpoints
app.use('/api/user',userRouter);
app.use('/api/product',productRouter)

app.get('/',(req,res)=>{
    res.send('API is running...');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
} );