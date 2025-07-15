import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";

function Cart() {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const size in cartItems[items]) {
          if (cartItems[items][size] > 0) {
            // Check if product exists before adding to cart data
            const productExists = products.find(product => product._id === items);
            if (productExists) {
              tempData.push({
                _id: items,
                size: size,
                quantity: cartItems[items][size],
              });
            } else {
              console.warn(`Product with ID ${items} not found in products array`);
            }
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"Your"} text2={"Cart"} />
      </div>
      <div>
        {cartData.length > 0 ? (
          cartData.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            // Add safety check - skip if product not found
            if (!productData) {
              console.warn(`Product with ID ${item._id} not found`);
              return null;
            }

            return (
              <div
                key={index}
                className="py-4 border-t text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <Link
                    to={`/product/${item._id}`}
                    className="hover:scale-110 transition duration-300"
                  >
                    <img
                      src={productData.images?.[0] || '/placeholder-image.jpg'}
                      alt={productData.name}
                      className="w-20 sm:w-25"
                    />
                  </Link>

                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div>
                      <p className="text-xs sm:text-sm">Size: {item.size}</p>
                      <p className="text-xs sm:text-sm">
                        Price: {currency}
                        {productData.price}.00
                      </p>
                      <p className="text-xs sm:text-sm">
                        Total: {currency}
                        {(productData.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <b
                    onClick={() =>
                      updateQuantity(item._id, item.size, item.quantity + 1)
                    }
                    className="text-xl mx-1 cursor-pointer hover:text-green-600"
                  >
                    +
                  </b>
                  <p className="border border-gray-600 text-center w-5 sm:w-10">
                    {item.quantity}
                  </p>
                  <b
                    onClick={() =>
                      updateQuantity(item._id, item.size, item.quantity - 1)
                    }
                    className={`text-xl mx-1 cursor-pointer hover:text-red-600 ${
                      item.quantity === 1 ? "hidden" : ""
                    }`}
                  >
                    -
                  </b>
                </div>

                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  src={assets.bin_icon}
                  className="w-3 sm:w-5 cursor-pointer hover:opacity-70"
                  alt="Remove item"
                />
              </div>
            );
          })
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <Link 
              to="/collection" 
              className="mt-4 inline-block bg-black text-white px-6 py-2 hover:bg-gray-800 transition duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
      {cartData.length > 0 && (
        <div className="flex flex-col items-end justify-end my-20">
          <div>
            <CartTotal />
          </div>

          <div className="flex justify-end mt-5">
            <Link
              to="/placeOrder"
              className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition duration-300"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;