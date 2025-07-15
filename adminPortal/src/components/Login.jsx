import axios from "axios";
import React, { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

function Login({setToken}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async(e) => {
        try {
            e.preventDefault();
            const response =await axios.post(backendUrl+ '/api/user/admin',{email,password})
            if(response.data.success){
                setToken(response.data.token);
            }
            else{
                toast.error(response.data.message)
            }

        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Login failed. Please try again.");
        }
    }

  return (
    <div className=" flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="shadow-2xl p-3 rounded-xl" >
        <h1 className="text-center font-bold text-xl mb-4">Admin Panel</h1>
        <form  className="flex flex-col gap-3">
            <div>
                 <p>Email Address</p>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} className="my-1 outline-none px-3 py-2 w-full border border-gray-300  rounded-md " type="email" placeholder="Enter your email" required/>
            </div>
            <div>
 <p>Password</p>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} className="my-1 outline-none px-3 py-2 w-full border border-gray-300  rounded-md " type="password" placeholder="Enter your password" required/>
            </div>
            <button onClick={onSubmitHandler} className="px-3 py-1 mt-3 border rounded-xl cursor-pointer hover:bg-black hover:text-white transition duration-300" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
