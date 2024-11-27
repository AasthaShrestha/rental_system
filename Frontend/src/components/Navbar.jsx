import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaBars } from "react-icons/fa";
import SignUpModal from "./modal/signupmodal";
import LoginModal from "./modal/loginmodal";
import { auth } from "../firebase/firebase.jsx";
import { onAuthStateChanged } from "firebase/auth";
import Profile from "./Profile.jsx";

function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // State to track if the menu is open

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

  // Toggle the menu for small screens
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div
        className={`max-w-screen-2xl mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 
        ${sticky ? "bg-black shadow-md transition duration-300" : "bg-black"}`}
      >
        <div className="navbar flex items-center justify-between py-4">
          <a className="text-2xl font-bold text-white cursor-pointer">YatriKuti</a>

          {/* Hamburger Icon for Small Screens */}
          <button
            className="md:hidden text-white"
            onClick={toggleMenu}
          >
            <FaBars />
          </button>

          {/* Navigation Links */}
          <div
            className={`flex items-center space-x-4 ${menuOpen ? "block" : "hidden"} md:flex`}
          >
            <ul className="menu menu-horizontal px-1 space-x-4 flex items-center text-white hover:text-gray-300 transition duration-300">
              <li><Link to="/">Home</Link></li>
              <li>
                <button
                  className="flex items-center space-x-1 text-white hover:text-gray-300 transition duration-300"
                  onClick={handlePostForFreeClick}
                >
                  <FaPlus />
                  <span>Post for free</span>
                </button>
              </li>
              <li><Link to="/rooms">Rooms</Link></li>
              <li><Link to="/vehicles">Vehicles</Link></li>
            </ul>

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
