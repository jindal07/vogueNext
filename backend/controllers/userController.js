import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
  // Function to create a token for the user

  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });

    if (!user ) {
      return res.json({ success: false, message: "User not found" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
            const token = createToken(user._id); 
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }

  } 
  catch (error) {
    console.log(`Error in user login: ${error.message}`);
    res.json({
      success: false,
      message: "Error in user login",
      error: error.message,
    });
  }
};

//Route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user already exists
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User already exists" });
    }

    //validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }
    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Creating new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.log(`Error in user registration: ${error.message}`);
    res.json({
      success: false,
      message: "Error in user registration",
      error: error.message,
    });
  }
};

//Route for admin login
const adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      // Check if admin credentials are correct
      if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
        return res.json({ success: false, message: "Invalid admin credentials" });
      }

      // If credentials are correct, create a token
      const token = jwt.sign({email}, process.env.JWT_SECRET);
      res.json({ success: true, message: "Admin logged in successfully", token });
    
    } catch (error) {
        console.log(`Error in admin login: ${error.message}`);
        res.json({
            success: false,
            message: "Error in admin login",
            error: error.message,
        });
      
    }
};

export { adminLogin, loginUser, registerUser };
