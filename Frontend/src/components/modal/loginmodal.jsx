import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import main0 from "../../assets/main0.jpeg";

const LoginModal = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // React Router DOM navigation
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    closeModal(); // Close the modal after login (optional if not redirecting)
  };

  const redirectToHome = () => {
    closeModal(); // Close the modal first
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="relative w-full max-w-md p-5 space-y-8 bg-yellow-100 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
        style={{
          backgroundImage: `url(${main0})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 rounded-xl"></div>

        {/* Modal content */}
        <div className="relative z-10">
          <button
            onClick={redirectToHome} // Close modal and redirect to homepage
            className="absolute top-2 right-2 text-xl font-bold text-gray-200 hover:text-red-400"
          >
            ✕
          </button>
          <h2 className="text-3xl font-bold text-center text-gray-100">
            Welcome Back
          </h2>

          <p className="text-center text-gray-200">
            Log in to access your account
          </p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-100 text-gray-800"
                placeholder="yourname@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-200"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-100 text-gray-800"
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
          <p className="text-center text-sm text-gray-300">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-400 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
