import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const updateQuantity= async(itemId,size,quantity)=>{
    let cartData = structuredClone(cartItems);
    cartData[itemId][[size]] = quantity;
    setCartItems(cartData);
  }

  const addToCart = async (itemId, size) => {
    if(!size){
        toast.error("Please select a size before adding to cart");
        return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size]=1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    if(cartData){
      toast.success("Item added to cart");
    }

    setCartItems(cartData);
  };

  const getCartCount = () => {
    let count = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        count += cartItems[item][size];
      }
    }
    return count;
  };

  const getCartAmount= ()=>{
    let total = 0;
    for (const item in cartItems) {
        let product = products.find((product) => product._id === item);
      for (const size in cartItems[item]) {
        
        if (cartItems[item][size] > 0) {
          total += product.price * cartItems[item][size];
        }
      }
    }
    return total ;
  }
  

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
