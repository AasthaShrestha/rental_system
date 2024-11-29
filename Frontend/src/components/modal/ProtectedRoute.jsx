import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase"; // Import Firebase auth

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth); // Hook to check if the user is authenticated
  const navigate = useNavigate(); // Navigate hook to programmatically redirect the user

  useEffect(() => {
    if (!loading && !user) {
      // Show an alert if the user is not logged in
      alert("You must be logged in to access this page.");
      navigate("/", { replace: true }); // Redirect to home page after the alert
    }
  }, [loading, user, navigate]);

  if (loading) return <div>Loading...</div>; // Optionally show a loading state

  // Render the children (PostFree) only if the user is logged in
  return user ? children : null;
};

export default ProtectedRoute;
