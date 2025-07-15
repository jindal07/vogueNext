import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongoDb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

//App config
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
connectCloudinary();

//Middleware
app.use(cors({
  origin: [
    'https://vogue-next.vercel.app',
    'https://vogue-next-admin.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174'
  ],
  credentials: true
}));
app.use(express.json());

//API Endpoints
app.use('/api/user',userRouter);
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


app.get('/',(req,res)=>{
    res.send('API is running...');
})

export default app;


if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log('Server started on PORT : ' + PORT));
}

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// } );