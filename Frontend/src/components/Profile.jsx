import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { signOut } from "firebase/auth"; // Import signOut
import { auth } from "../firebase/firebase.jsx"; // Import auth
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const Profile = ({ user, onLogout }) => {
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
        onClick={handleLogout}
        className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
