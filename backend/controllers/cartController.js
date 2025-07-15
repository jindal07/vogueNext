import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
     //console.log("Full req.body:", req.body); // Debug: see entire request body
    //console.log("req.headers:", req.headers); 
    const { userId, itemId, size } = req.body;
    //console.log("Cart request:", { userId, itemId, size });
    const userData = await userModel.findById(userId);
     if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    //console.log("Cart updated successfully:", cartData); 
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
