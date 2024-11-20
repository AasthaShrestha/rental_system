import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { auth, googleProvider, signInWithEmailAndPassword, signInWithPopup } from "../../firebase/firebase.jsx";

const LoginWithModal = ({ onClose, onSwitchToSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle login with email and password
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in:", userCredential.user);
      setError("");
      onClose(); // Close the modal after login
    } catch (err) {
      console.error("Firebase Error Code:", err.code);
      console.error("Error Message:", err.message);
      if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (err.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  // Handle login with Google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google user signed in:", result.user);
      setError("");
      onClose(); // Close the modal after login
    } catch (err) {
      setError("Google login failed.");
      console.error(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm p-6 space-y-6 bg-opacity-75 bg-yellow-100 rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-center text-gray-800 w-full">Welcome Back</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">✕</button>
        </div>

        <p className="text-center text-sm text-gray-700">Log in to access your account</p>

        {error && <p className="text-center text-sm text-red-500">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-gray-800">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-400 text-sm"
              placeholder="yourname@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-gray-800">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-400 text-sm"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md shadow-md hover:from-indigo-600 hover:to-purple-600 transition-transform transform hover:scale-105"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2">
          <div className="border-t border-gray-300 w-full"></div>
          <span className="text-xs text-gray-600">OR</span>
          <div className="border-t border-gray-300 w-full"></div>
        </div>

        <div className="flex flex-col space-y-2">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full py-2 text-sm font-semibold text-white bg-red-500 rounded-md shadow-md hover:bg-red-600"
          >
            <FaGoogle className="mr-2" />
            Continue with Google
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          Don't have an account?{" "}
          <button onClick={onSwitchToSignUp} className="text-indigo-500 hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginWithModal;
