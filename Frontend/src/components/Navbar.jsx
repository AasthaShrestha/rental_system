import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import SignUpModal from "./modal/signupmodal";
import LoginModal from "./modal/loginmodal";
import { auth } from "../firebase/firebase.jsx";
import { onAuthStateChanged } from "firebase/auth";
import Profile from "./Profile.jsx";
import SearchOption from "./SearchOption.jsx";

function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLoginClick = () => {
    setShowLoginModal(true);
    setShowSignUpModal(false);
  };

  const handleSignUpClick = () => {
    setShowSignUpModal(true);
    setShowLoginModal(false);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
    setShowSignUpModal(false);
  };

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
  };

  const handlePostForFreeClick = () => {
    if (user) {
      navigate("/postforfree");
    } else {
      setShowLoginModal(true);
    }
  };

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-pink-500 font-bold border-b-2 border-pink-500"
              : "text-white hover:text-gray-300 transition duration-300"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/rooms"
          className={({ isActive }) =>
            isActive
              ? "text-pink-500 font-bold border-b-2 border-pink-500"
              : "text-white hover:text-gray-300 transition duration-300"
          }
        >
          Rooms
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/vehicles"
          className={({ isActive }) =>
            isActive
              ? "text-pink-500 font-bold border-b-2 border-pink-500"
              : "text-white hover:text-gray-300 transition duration-300"
          }
        >
          Vehicles
        </NavLink>
      </li>
      <li>
        <button
          onClick={handlePostForFreeClick}
          className="flex items-center space-x-1 text-white hover:text-gray-300 transition duration-300"
        >
          <FaPlus />
          <span>Post for free</span>
        </button>
      </li>
    </>
  );

  return (
    <>
      <div
        className={`max-w-screen-2xl mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 
        ${sticky ? "bg-black shadow-md transition duration-300" : "bg-black"}`}
      >
        <div className="navbar">
          {/* Navbar Start */}
          <div className="navbar-start">
            <div className="dropdown">
              <button tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-black rounded-box mt-3 w-52 p-2 shadow z-[1]"
              >
                {navItems}
              </ul>
            </div>
            <a className="text-2xl font-bold text-pink-600 cursor-pointer">YatriKuti</a>
          </div>

          {/* Navbar Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-4">{navItems}</ul>
            <div className="flex-1 mx-6">
              <div className="w-full bg-blue-400 rounded-md shadow-sm">
                <SearchOption setSearch={setSearch} search={search} />
              </div>
            </div>
          </div>

          {/* Navbar End */}
          <div className="navbar-end flex items-center space-x-4">
            {!user ? (
              <>
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
              </>
            ) : (
              <Profile user={user} onLogout={handleLogout} />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal
          onClose={handleCloseModal}
          onSwitchToSignUp={handleSignUpClick}
        />
      )}
      {showSignUpModal && (
        <SignUpModal
          onClose={handleCloseModal}
          onSwitchToLogin={handleLoginClick}
        />
      )}
    </>
  );
}

export default Navbar;
