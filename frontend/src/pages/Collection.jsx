import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

function Collection() {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterPorducts, setFilterPorducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory(subCategory.filter((item) => item !== value));
    } else {
      setSubCategory([...subCategory, value]);
    }
  };

  const applyFilters = () => {
    let filteredProducts = products.slice();

    if (showSearch && search) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        category.includes(product.category)
      );
    }

    if (subCategory.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        subCategory.includes(product.subCategory)
      );
    }

    setFilterPorducts(filteredProducts);
  };

  useEffect(() => {
    applyFilters();
  }, [category, subCategory, search, showSearch,products]);

  const sortProducts = () => {
    let sortedProducts = filterPorducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterPorducts(sortedProducts.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterPorducts(sortedProducts.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilters();
        break;
    }
  };

  useEffect(() => {
    sortProducts(sortType);
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 ">
      {/* Filter Options */}
      <div className=" w-34">
        {" "}
        {/*custom style */}
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="text-gray-700 text-md sm:text-xl my-2 font-semibold flex items-center gap-2 cursor-pointer"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700 ">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                onClick={toggleCategory}
                value={"Men"}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                onClick={toggleCategory}
                value={"Women"}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                onClick={toggleCategory}
                value={"Kids"}
              />
              Kids
            </p>
          </div>
        </div>
        {/* SubCateogry  Filter*/}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700 ">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                onClick={toggleSubCategory}
                value={"Topwear"}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                onClick={toggleSubCategory}
                value={"Bottomwear"}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                onClick={toggleSubCategory}
                value={"Winterwear"}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-xs w-[50%] py-1 sm:px-2 sm:w-auto sm:text-sm "
          >
            <option value="relavent">Sort By: Relavent</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>
        {/* Map Product */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-6'>
    {filterPorducts.length > 0 ? (
        filterPorducts.map((item, index) => (
            <ProductItem 
                key={item._id || index} 
                name={item.name} 
                id={item._id} 
                price={item.price} 
                images={item.images} 
            />
        ))
    ) : (
        <p className="col-span-full text-center text-gray-500">No products found</p>
    )}
</div>
      </div>
    </div>
  );
}

export default Collection;
