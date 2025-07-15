import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

function Product() {
  const { productId } = useParams();
  const { products, currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    const product = products.find(
      (item) => item._id.toLowerCase() === productId.toLowerCase()
    );
    if (product) {
      setProductData(product);
      setImage(product.images[0]);
      return null;
    } else {
      setProductData(null);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className=" pt-10 transition-opacity duration-500 ease-in-out opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.images.map((item, index) => (
              <img
                key={index}
                src={item}
                alt={`Product Image ${index + 1}`}
                className={`hover:scale-110 transition ease-in-out w-20 my-1 sm:w-24 h-20  sm:h-24 object-cover cursor-pointer ${
                  image === item ? "  border-2 border-gray-500" : ""
                }`}
                onClick={() => setImage(item)}
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto shadow-2xl " src={image} alt="" />
          </div>
        </div>
        {/* Product info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-2 my-2">
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_icon} alt="" />
            <img className="w-3 5" src={assets.star_dull_icon} alt="" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-2 text-xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-2 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex- flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item === size ? "" : item)}
                  className={`border border-gray-300 px-3 py-1   ${
                    item === size ? "bg-black text-white" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>addToCart(productData._id, size)}
              className="bg-black active:bg-gray-900 text-white px-7 py-2 "
            >
              Add to Cart
            </button>
          </div>
          <hr className="mt-8 sm:w-4/5" />
          <div className="my-2">
            <p className="text-gray-500 text-sm my-1">100% Original product.</p>
            <p className="text-gray-500 text-sm my-1">
              Cash on delivery is available on this product.
            </p>
            <p className="text-gray-500 text-sm my-1">
              Easy return and exchange policy within 7 days.
            </p>
          </div>
        </div>
      </div>
      {/* Description and review scetion */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm"> Description</b>
          <p className="border border-l-0 border-gray-400 px-5 py-3 text-sm">
            Reviews(122)
          </p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
      </div>
      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}

export default Product;
