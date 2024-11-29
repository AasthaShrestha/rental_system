import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook

const ProfileDetails = () => {
  const location = useLocation(); // Retrieve location object
  const user = location.state?.user; // Extract user from state

  const getUserName = () => {
    return user?.displayName || user?.email.split('@')[0]; // Display name or email
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6 bg-yellow-100 rounded-xl shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">{getUserName()}'s Profile</h2>
        <p className="text-sm text-gray-700 mt-2">User details go here.</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-semibold">Email:</span>
          <span>{user?.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Display Name:</span>
          <span>{user?.displayName || "Not available"}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
