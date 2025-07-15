// middleware/auth.js
import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    // console.log("=== AUTH MIDDLEWARE CALLED ===");
    // console.log("All headers:", req.headers);
    
    const { token } = req.headers;
    // console.log("Token extracted:", token);

    if (!token) {
        // console.log("❌ No token provided");
        return res.json({ success: false, message: 'Not Authorized Login Again' });
    }

    try {
        // console.log("🔍 Verifying token with JWT_SECRET:", !!process.env.JWT_SECRET);
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("✅ Token decoded:", token_decode);
        
        // Fix: Use 'user' field instead of 'id'
        req.body.userId = token_decode.id; // Changed from token_decode.id to token_decode.user
        // console.log("✅ UserId set in req.body:", req.body.userId);
        // console.log("=== AUTH MIDDLEWARE SUCCESS ===");
        
        next(); // Continue to next middleware/controller
    } catch (error) {
        // console.log("❌ JWT verification failed:", error.message);
        // console.log("=== AUTH MIDDLEWARE FAILED ===");
        return res.json({ success: false, message: 'Invalid token' });
    }
}

export default authUser;