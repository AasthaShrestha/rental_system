import React, { useState } from "react";
import main0 from "../assets/main0.jpeg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false); // Manage the login display

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // For redirect after signup, if needed

  // Handle signup
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError(""); // Reset error message if passwords match

    const userInfo = {
      name,
      email,
      password,
    };

    try {
      const res = await axios.post(
        "http://localhost:4001/user/signup",
        userInfo
      );
      console.log(res.data);
      if (res.data) {
        toast.success("Signup Successfully");
        setIsSignedUp(true); // Set signup to true to show login form
      }
      localStorage.setItem("Users", JSON.stringify(res.data.user));
    } catch (err) {
      if (err.response) {
        console.log(err);
        toast.error("Error: " + err.response.data.message);
      }
    }
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    // You can add login logic here
    console.log("Logging in with:", email, password);
    // Once logged in, redirect user
    navigate("/"); // Or wherever you want to redirect after login
  };

  // Render Signup or Login form based on the state
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4 sm:px-0"
      style={{
        backgroundImage: `url(${main0})`,
      }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-opacity-75 bg-yellow-100 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105">
        {isSignedUp ? (
          // Show Login Form after Signup
          <>
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Log In to Your Account
            </h2>
            <p className="text-center text-gray-700">
              Welcome! Please login to continue
            </p>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-800"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="yourname@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none transform transition duration-200 ease-in-out hover:scale-105"
              >
                Log In
              </button>
            </form>
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </>
        ) : (
          // Show Signup Form
          <>
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Create an Account
            </h2>
            <p className="text-center text-gray-700">Sign up to get started</p>
            <form onSubmit={handleSignUp} className="space-y-5">
              {error && <p className="text-red-500 text-center">{error}</p>}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-800"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-800"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="yourname@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-800"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 focus:outline-none transform transition duration-200 ease-in-out hover:scale-105"
              >
                Sign Up
              </button>
            </form>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-500 hover:underline">
                Log in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
