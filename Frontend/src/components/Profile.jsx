import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { signOut } from "firebase/auth"; // Import signOut
import { auth } from "../firebase/firebase.jsx"; // Import auth
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const Profile = ({ user, onLogout }) => {
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false); // State to manage popup visibility
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  // Get user name from displayName or email
  const getUserName = () => {
    if (user?.displayName) {
      return user.displayName; // Display name from Firebase
    } else if (user?.email) {
      return user.email.split('@')[0]; // Extract username from email
    }
    return 'User'; // Default fallback
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out
      onLogout(); // Call logout function passed as a prop
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleProfileClick = () => {
    // Navigate to the profile details page when the profile or name is clicked
    navigate("/ProfileDetailPage");
  };

  const openLogoutPopup = () => {
    setIsLogoutPopupOpen(true); // Open the confirmation popup
  };

  const closeLogoutPopup = () => {
    setIsLogoutPopupOpen(false); // Close the popup
  };

  return (
    <div className="flex items-center space-x-3 text-red-600">
      <FaUserCircle className="text-3xl text-red-600 cursor-pointer" onClick={handleProfileClick} />
      <span
        className="text-sm font-medium text-red-600 cursor-pointer"
        onClick={handleProfileClick}
      >
        {getUserName()}
      </span>
      <button
        onClick={openLogoutPopup}
        className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition duration-300"
      >
        Logout
      </button>

      {/* Logout Confirmation Popup */}
      {isLogoutPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gray-100 p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Are you sure you want to log out?</h3>
            <div className="flex space-x-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
              >
                Yes, Logout
              </button>
              <button
                onClick={closeLogoutPopup}
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
              >
                No, Stay Logged In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
