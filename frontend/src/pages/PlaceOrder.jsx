import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
function PlaceOrder() {
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: "Order Payment",
    description: "Order payment",
    order_id: order.id, // Use order.id (this is the Razorpay order ID)
    handler: async (response) => {
      console.log("Razorpay response:", response);
      
      try {
        const verifyResponse = await axios.post(
          backendUrl + "/api/order/verifyRazorpay",
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          },
          { headers: { token } }
        );

        if (verifyResponse.data.success) {
          setCartItems({});
          navigate('/orders');
          toast.success("Payment successful!");
        } else {
          toast.error("Payment verification failed");
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        toast.error("Payment verification failed");
      }
    },
    modal: {
      ondismiss: function() {
        toast.error("Payment cancelled");
      }
    }
  };
  
  const rzp = new window.Razorpay(options);
  rzp.open();
};

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        //api for cod
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        case "razorpay":
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          } else {
            toast.error(responseRazorpay.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14  min-h-[80vh] "
    >
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            placeholder="First Name"
            className="border border-gray-300 px-3 py-2 w-full outline-none"
          />
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            placeholder="Last Name"
            className="border border-gray-300 px-3 py-2 w-full outline-none"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="email"
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            placeholder="Enter your email address"
            className="border border-gray-300 px-3 py-2 w-full outline-none"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            placeholder="Street"
            className="border border-gray-300 px-3 py-2 w-full outline-none"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            placeholder="City"
            className="border border-gray-300 px-3 py-2 w-full outline-none"
          />
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            placeholder="State"
            className="border border-gray-300 px-3 py-2 w-full outline-none"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            placeholder="ZipCode"
            className="border border-gray-300 px-3 py-2 w-full outline-none"
          />
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            placeholder="Country"
            className="border border-gray-300 px-3 py-2 w-full outline-none"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            placeholder="Phone number"
            className="border border-gray-300 px-3 py-2 w-full outline-none"
          />
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className="flex-1 items-start flex flex-col gap-4  sm:mx-10">
        <div className=" text-xl sm:text-3xl my-3">
          <CartTotal />
        </div>
        <div className=" text-xl my-3">
          <Title text1={"Payment"} text2={"Method"} />
          {/* Payment method selection */}
          <div className="flex flex-col lg:flex-row gap-3 mt-3">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center  gap-4 border border-gray-300 p-2 px-3 cursor-pointer hover:bg-gray-100 transition duration-300"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} className="w-auto h-5" alt="" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-4 border border-gray-300 p-2 px-3 cursor-pointer hover:bg-gray-100 transition duration-300"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.razorpay_logo} className="w-auto h-5" alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-4 border border-gray-300 p-2 px-3 cursor-pointer hover:bg-gray-100 transition duration-300"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-sm text-gray-800 font-semibold">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
        </div>
        <div className="w-full ">
          <button
            type="submit"
            className="bg-black text-white px-4 sm:px-8 py-2 hover:bg-gray-800 transition duration-300 w-full sm:w-auto"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
