import express from 'express';
import { registerUser, loginUser, adminLogin} from '../controllers/userController.js';

const userRouter = express.Router();

// Route for user registration
userRouter.post('/register', registerUser);

// Route for user login
userRouter.post('/login', loginUser);

// Route for admin login
userRouter.post('/admin', adminLogin);

// Export the userRouter
export default userRouter;