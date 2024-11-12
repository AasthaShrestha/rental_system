import React, { useState } from "react";
import main0 from "../assets/main0.jpeg";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError(""); // Reset error message if passwords match
    console.log("Name:", name, "Email:", email, "Password:", password);
    // Add sign-up logic here
  };

  return (
      <div className="w-full max-w-sm p-6 space-y-4 bg-opacity-75 bg-yellow-100 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Create an Account
        </h2>
        <p className="text-center text-sm text-gray-700">Sign up to get started</p>
        <form onSubmit={handleSignUp} className="space-y-3">
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-medium text-gray-800"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-400 text-sm"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-gray-800"
            >
              Email
            </label>
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
            <label
              htmlFor="password"
              className="block text-xs font-medium text-gray-800"
            >
              Password
            </label>
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
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-medium text-gray-800"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-400 text-sm"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md shadow-md hover:from-indigo-600 hover:to-purple-600 transition-transform transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-xs text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    
  );
};

export default SignUp;
