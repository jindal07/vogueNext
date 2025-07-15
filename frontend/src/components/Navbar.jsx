import React, { useContext } from "react";
import { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);
  const location = useLocation();

  const logOut = () => {
    navigate("/login");
    setToken("");
    localStorage.removeItem("token");
    setCartItems({});
  };
  return (
    <div className="flex items-center justify-between  py-5 rounded-xl font-medium bg-white shadow-md px-5 sm:px-10">
      <Link to="/">
        <img
          src={assets.logo}
          className="hover:scale-110 outline-0 transition ease-in-out duration-300 w-auto h-10 sm:w-auto sm:h-10 "
          alt="logo"
        />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink
          to="/"
          className="flex flex-col items-center gap-1 hover:text-gray-900 hover:scale-110"
        >
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/collection"
          className="flex flex-col items-center gap-1 hover:text-gray-900 hover:scale-110"
        >
          <p>Collections</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/about"
          className="flex flex-col items-center gap-1 hover:text-gray-900 hover:scale-110"
        >
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to="/contact"
          className="flex flex-col items-center gap-1 hover:text-gray-900 hover:scale-110"
        >
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-2 sm:gap-5">
        {location.pathname === "/collection" && (
          <img
            onClick={() => setShowSearch((prev) => !prev)}
            src={assets.search_icon}
            className="w-5  cursor-pointer"
            alt="search-icon"
          />
        )}
        <div className="group relative">
          
            <img
            onClick={()=>token ?null: navigate("/login")}
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt="profile-icon"
            />
          {/* DropDown */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu pt-4 right-0 bg-white shadow-md rounded-lg ">
            <div className="flex flex-col gap-2 w-36 px-5 py-3 text-gray-700 bg-slate-100 rounded-lg">
              <Link to={"/login"}>
                <p className="cursor-pointer hover:text-black">My Profile</p>
              </Link>
              <Link to={"/orders"}>
                <p className="cursor-pointer hover:text-black">Orders</p>
              </Link>

              <p onClick={logOut} className="cursor-pointer hover:text-black">
                LogOut
              </p>
            </div>
          </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 cursor-pointer"
            alt="cart-icon"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 rounded-full leading-4  bg-black text-white text-center aspect-square text-[8px]">
            {getCartCount()}{" "}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="menu"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>

      {/* side bar for small screen */}
      {/* Overlay */}
      {visible && (
        <div
          className="fixed inset-0  bg-opacity-10 backdrop-blur-xs z-40 transition-opacity duration-300 ease-in-out"
          onClick={() => setVisible(false)}
        />
      )}

      {/*sidebar for small screen */}
      <div
        className={`fixed top-0 right-0 h-full bg-white  shadow-2xl z-50 transition-all overflow-y-hidden duration-300 ease-out ${
          visible ? "translate-x-0" : "translate-x-full"
        } w-60`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className=" flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 tracking-wide">
              Menu
            </h2>
            <button
              onClick={() => setVisible(false)}
              className="p-2 rounded-full hover:bg-gray-50 transition-all duration-200 group"
            >
              {/* Subtle Cross Icon */}
              <svg
                className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 py-6">
            <nav className="space-y-1 px-4">
              <NavLink
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-4 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-black bg-gray-100 border-r-2 border-black"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`
                }
                to="/"
              >
                <span className="tracking-wide">HOME</span>
              </NavLink>

              <NavLink
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-4 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-black bg-gray-100 border-r-2 border-black"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`
                }
                to="/collection"
              >
                <span className="tracking-wide">COLLECTION</span>
              </NavLink>

              <NavLink
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-4 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-black bg-gray-100 border-r-2 border-black"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`
                }
                to="/about"
              >
                <span className="tracking-wide">ABOUT</span>
              </NavLink>

              <NavLink
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-4 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-black bg-gray-100 border-r-2 border-black"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`
                }
                to="/contact"
              >
                <span className="tracking-wide">CONTACT</span>
              </NavLink>
            </nav>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 p-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    My Profile
                  </p>
                  <p className="text-xs text-gray-500">Account settings</p>
                </div>
              </div>

              <div
                className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer `}
              >
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <div>
                  <Link
                    onClick={() => setVisible(false)}
                    to={"/orders"}
                    className="text-sm font-medium text-gray-900"
                  >
                    Orders
                  </Link>
                  <p className="text-xs text-gray-500">Track your orders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
