import React, { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  const handleFacebookLogin = () => {
    console.log("Continue with Facebook");
  };

  const handleGoogleLogin = () => {
    console.log("Continue with Google");
  };

  return (

      <div className="w-full max-w-sm p-6 space-y-6 bg-opacity-60 bg-yellow-100 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-700">
          Log in to access your account
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
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
          <button
            type="submit"
            className="w-full py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md shadow-md hover:from-indigo-600 hover:to-purple-600 transition-transform transform hover:scale-105"
          >
            Log In
          </button>
        </form>
        {/* OR Separator */}
      <div className="flex items-center justify-center space-x-2">
        <div className="border-t border-gray-300 w-full"></div>
        <span className="text-xs text-gray-600">OR</span>
        <div className="border-t border-gray-300 w-full"></div>
      </div>

        <div className="flex flex-col space-y-2">
          <button
            onClick={handleFacebookLogin}
            className="flex items-center justify-center w-full py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700"
          >
            <FaFacebook className="mr-2" />
            Continue with Facebook
          </button>
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full py-2 text-sm font-semibold text-white bg-red-500 rounded-md shadow-md hover:bg-red-600"
          >
            <FaGoogle className="mr-2" />
            Continue with Google
          </button>
        </div>

        <p className="text-center text-xs text-gray-500">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    
  );
};

export default Login;
