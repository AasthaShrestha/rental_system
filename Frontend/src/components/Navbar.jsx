import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaPlus, FaBars } from "react-icons/fa";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // To track current route
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
    };
  };

  // Toggle the menu for small screens
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div
        className={`max-w-screen-2xl mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 ${sticky ? "bg-blue-300 shadow-md transition duration-300" : "bg-blue-300"
          }`}
      >
        <div className="navbar flex items-center justify-between">
          <a className="text-2xl font-bold cursor-pointer">YatriKuti</a>

          {/* Hamburger Icon for Small Screens */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            <FaBars />
          </button>

          {/* Navigation Links */}
          <div
            className={`flex items-center space-x-4 ${menuOpen ? "block" : "hidden"
              } md:flex`}
          >
            <ul className="menu menu-horizontal px-1 space-x-4 flex items-center">
              <li>
                <Link
                  to="/"
                  className={`p-2 hover:shadow-lg transition-shadow duration-300 ${location.pathname === "/" ? "text-black font-semibold" : "text-white"
                    }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <button
                  onClick={handlePostForFreeClick}
                  className="p-2 hover:shadow-lg transition-shadow duration-300 text-white"
                >
                  <FaPlus /> Post for free
                </button>
              </li>
              <li>
                <Link
                  to="/rooms"
                  className={`p-2 hover:shadow-lg transition-shadow duration-300 ${location.pathname === "/rooms" ? "text-black font-semibold" : "text-white"
                    }`}
                >
                  Rooms
                </Link>
              </li>
              <li>
                <Link
                  to="/vehicles"
                  className={`p-2 hover:shadow-lg transition-shadow duration-300 ${location.pathname === "/vehicles" ? "text-black font-semibold" : "text-white"
                    }`}
                >
                  Vehicles
                </Link>
              </li>
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
