import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

function List({token}) {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message, { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error fetching list:", error.message);
      toast.error("Failed to fetch list. Please try again later.", { autoClose: 2000 });
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl+'/api/product/remove', { id },{headers:{token}});

      if (response.data.success) {
        toast.success("Product deleted successfully", { autoClose: 2000 });
        await fetchList(); // Refresh the list after deletion
      } else {
        toast.error(response.data.message, { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
      toast.error("Failed to delete product. Please try again later.", { autoClose: 2000 });
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <p className="mb-2">All Products List</p>
      <div className="flex- flex-col gap-2">

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border-gray-300 border bg-gray-100 p-2 text-sm ">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {list.map((item,index) => (
          <div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border-gray-300 border mt-2 p-2 text-xs md:text-sm">
            <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-fit" />
            <span>{item.name}</span>
            <span>{item.category}</span>
            <span>₹{item.price.toFixed(2)}</span>
            <div className="text-center">
              <button onClick={()=>removeProduct(item._id)} className="bg-red-500 cursor-pointer hover:bg-red-400 text-white px-2 py-1 rounded ml-2">Delete</button>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  );
}

export default List;
