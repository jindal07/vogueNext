import jwt from "jsonwebtoken";

const adminAuth=async (req, res, next) => {
    try {
        const {token} = req.headers;
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       if (decoded !== process.env.ADMIN_EMAIL && decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: "Not authorized as admin" });
        }
        next();
    } catch (error) {
        console.error(`Error in admin authentication: ${error.message}`);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

export default adminAuth;
