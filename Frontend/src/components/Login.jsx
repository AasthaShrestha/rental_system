import React, { useState } from "react";
import main0 from "../assets/main0.jpeg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    // Prepare user info for login
    const userInfo = { email, password };

    try {
      const res = await axios.post(
        "http://localhost:4001/user/login",
        userInfo
      );
      console.log(res.data);

      if (res.data?.user) {
        // If login is successful
        toast.success("Logged in successfully!");
        localStorage.setItem("Users", JSON.stringify(res.data.user));

        // Redirect to home page after login
        navigate("/", { replace: true });
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${main0})` }}
    >
      <div className="w-full max-w-md p-5 space-y-8 bg-opacity-60 bg-yellow-100 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105">
        <Link
          to="/"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-xl font-bold text-gray-800 hover:text-red-600"
        >
          ✕
        </Link>
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-800">
          Log in to access your account
        </p>
        <form onSubmit={handleLogin} className="space-y-6">
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
              className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
              className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
