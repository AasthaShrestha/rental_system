import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { FaPlus } from "react-icons/fa";
import SignUpModal from "./modal/signupmodal";
import LoginModal from "./modal/loginmodal";
import { auth } from "../firebase/firebase.jsx";
import { onAuthStateChanged } from "firebase/auth";
import Profile from "./profile.jsx";

function Navbar() {
  const [sticky, setSticky] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate(); // Initialize navigate for redirection

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
      setUser(currentUser); // Firebase automatically handles user state
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
    auth.signOut(); // Sign out the user
    setUser(null); // Clear the user state
  };

  const handlePostForFreeClick = () => {
    if (user) {
      navigate("/postforfree"); // Navigate to PostForFree page if logged in
    } else {
      setShowLoginModal(true); // Show login modal if not logged in
    }
  };

  return (
    <>
      <div
        className={`max-w-screen-2xl mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 
        ${sticky ? "bg-gray-800 shadow-lg" : "bg-gray-900"} text-white transition duration-300`}
      >
        <div className="navbar flex items-center justify-between">
          <a className="text-2xl font-bold cursor-pointer">YatriKuti</a>

          <div className="flex items-center space-x-4">
            <ul className="menu menu-horizontal px-1 space-x-4 flex items-center">
              <li><Link to="/" className="hover:text-gray-400 transition duration-300">Home</Link></li>
              <li>
                <button
                  className="flex items-center space-x-1 hover:text-gray-400 transition duration-300"
                  onClick={handlePostForFreeClick}
                >
                  <FaPlus />
                  <span>Post for free</span>
                </button>
              </li>
              <li><Link to="/rooms" className="hover:text-gray-400 transition duration-300">Rooms</Link></li>
              <li><Link to="/vehicles" className="hover:text-gray-400 transition duration-300">Vehicles</Link></li>
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
