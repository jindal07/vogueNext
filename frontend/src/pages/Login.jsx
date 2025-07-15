import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
// import { getUserCart } from "../../../backend/controllers/cartController.js";


function Login() {
  const [currentState, setCurrentState] = useState("Log In");
  const { token, setToken, backendUrl,navigate } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
 
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState == "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        
          toast.success("Account created successfully");
          
        } else {
          toast.error(response.data.message || "Error creating account");
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        // console.log(response.data);

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          //getUserCart(response.data.token)
          toast.success("Logged in successfully");
        } else {
          toast.error(response.data.message || "Error logging in");
        }
      }
    } catch (error) {
      console.error("Error during login/signup:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/"); // Redirect to home page if already logged in
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-2xl font-semibold">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        required={currentState === "Sign Up"}
        type="text"
        placeholder="Enter your name"
        className={`border border-gray-300 w-full px-3 py-2  focus:outline-none focus:border-gray-500 ${
          currentState === "Log In" ? "hidden" : ""
        }`}
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
        type="email"
        placeholder="Enter your email"
        className="border border-gray-300 w-full px-3 py-2  focus:outline-none focus:border-gray-500"
      />
      <div className="relative w-full">
        <input 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
          required 
          type={showPassword ? "text" : "password"} 
          placeholder='Enter your password' 
          className='border border-gray-300 w-full px-3 py-2 pr-12 focus:outline-none focus:border-gray-500' 
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            // Eye slash icon (hide password)
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
            </svg>
          ) : (
            // Eye icon (show password)
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>
      <div className="px-1 flex flex-col sm:flex-row justify-between items-center w-full text-sm text-black">
        <p className={`${currentState === "Sign Up" ? "hidden" : ""}`}>
          Forgot your password?
        </p>
        <Link
          to={"/login"}
          onClick={(e) => {
            currentState === "Sign Up"
              ? setCurrentState("Log In")
              : setCurrentState("Sign Up");
          }}
        >
          <p>
            {currentState === "Sign Up"
              ? "Have an Account? Login Here"
              : "Create Account"}{" "}
          </p>
        </Link>
      </div>
      <div>
        <button className="bg-black cursor-pointer text-white px-5 py-2 w-full hover:bg-gray-800 transition duration-300">
          {currentState}
        </button>
      </div>
    </form>
  );
}

export default Login;
