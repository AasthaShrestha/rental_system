import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Login from "./Login";
import SignUp from "./SignUp";

function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleSignUpClick = () => {
    setShowSignUpModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
    setShowSignUpModal(false);
  };

  return (
    <>
      <div
        className={`max-w-screen-2xl mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 
        ${sticky ? "bg-base-200 shadow-md transition duration-300" : "bg-base-100"}
        dark:bg-slate-50 dark:text-black`}
      >
        <div className="navbar flex items-center justify-between">
          <a className="text-2xl font-bold cursor-pointer">YatriKuti</a>

          <div className="flex items-center space-x-4">
            <ul className="menu menu-horizontal px-1 space-x-4">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/postforfree"><FaPlus className="text-black" /> Post for free</Link></li>
              <li><Link to="/rooms">Rooms</Link></li>
              <li><Link to="/vehicles">Vehicles</Link></li>
            </ul>

            <button
              onClick={handleLoginClick}
              className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 transition duration-300"
            >
              Login
            </button>
            
            <button
              onClick={handleSignUpClick}
              className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-4 relative max-w-md w-full">
            
            <button
              onClick={handleCloseModal}
              className="absolute top-0 right-0 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            <Login /> 
          </div>
        </div>
      )}

      {/* SignUp Modal */}
      {showSignUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-4 relative max-w-md w-full">

            <button
              onClick={handleCloseModal}
              className="absolute top-0 right-0 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            <SignUp /> {/* Render only the SignUp form component */}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
