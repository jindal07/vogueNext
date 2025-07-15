import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const ShopContext = createContext();
import { useNavigate } from "react-router-dom";

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    
    if (quantity === 0) {
      // Remove item from cart
      if (cartData[itemId] && cartData[itemId][size]) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      // Update quantity
      if (!cartData[itemId]) {
        cartData[itemId] = {};
      }
      cartData[itemId][size] = quantity;
    }
    
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size before adding to cart");
      return;
    }
    let cartData = structuredClone(cartItems);
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

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
        toast.success("Item added to cart");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      toast.success("Item added to cart");
    }
  };

  const getCartCount = () => {
    let count = 0;
    for (const item in cartItems) {
      if (!cartItems[item]) continue;
      
      for (const size in cartItems[item]) {
        if (cartItems[item][size] > 0) {
          count += cartItems[item][size];
        }
      }
    }
    return count;
  };

  const getCartAmount = () => {
    let total = 0;
    
    // Return 0 if products are still loading
    if (products.length === 0) return 0;
    
    for (const item in cartItems) {
      let product = products.find((product) => product._id === item);
      
      // Add safety check - skip if product not found
      if (!product) {
        console.warn(`Product with ID ${item} not found in products array`);
        continue;
      }
      
      for (const size in cartItems[item]) {
        if (cartItems[item][size] > 0) {
          total += product.price * cartItems[item][size];
        }
      }
    }
    return total;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error("Failed to fetch products");
        console.error("Error fetching products:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.message || "Failed to fetch products");
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Clean up invalid cart items
  const cleanupInvalidCartItems = () => {
    if (products.length === 0) return;
    
    const validProductIds = new Set(products.map(p => p._id));
    const cleanedCart = {};
    let hasInvalidItems = false;
    
    for (const itemId in cartItems) {
      if (validProductIds.has(itemId)) {
        cleanedCart[itemId] = cartItems[itemId];
      } else {
        hasInvalidItems = true;
        console.warn(`Removing invalid cart item: ${itemId}`);
      }
    }
    
    if (hasInvalidItems) {
      setCartItems(cleanedCart);
      toast.info("Some items were removed from your cart because they are no longer available");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  // Clean up cart when products are loaded
  useEffect(() => {
    if (products.length > 0 && Object.keys(cartItems).length > 0) {
      cleanupInvalidCartItems();
    }
  }, [products]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    getUserCart,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;