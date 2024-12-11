import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import main0 from "../../assets/main0.jpeg";

const SignUpModal = ({ closeModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError(""); // Reset error message if passwords match
    console.log("Name:", name, "Email:", email, "Password:", password);
    closeModal(); // Close modal after signup
    navigate("/"); // Navigate to the homepage after signup
  };

  const redirectToLogin = () => {
    closeModal(); // Close modal when redirected to login
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="relative w-full max-w-md p-8 space-y-6 bg-yellow-100 bg-opacity-90 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105"
        style={{
          backgroundImage: `url(${main0})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 rounded-lg"></div>

        {/* Modal Content */}
        <div className="relative z-10">
          {/* Close Button */}
          <button
            onClick={() => {
              closeModal(); // Close modal
              navigate("/login"); // Navigate to login page
            }}
            className="absolute top-2 right-2 text-xl font-bold text-gray-200 hover:text-red-400"
          >
            ✕
          </button>

          <h2 className="text-3xl font-bold text-center text-gray-100">
            Create an Account
          </h2>
          <p className="text-center text-gray-200">Sign up to get started</p>

          <form onSubmit={handleSignUp} className="space-y-6">
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-200"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 mt-1 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Your Name"
              />
            </div>

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
                className="w-full p-3 mt-1 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
                className="w-full p-3 mt-1 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-200"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-3 mt-1 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
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

          <p className="text-center text-sm text-gray-300">
            Already have an account?{" "}
            <button
              onClick={redirectToLogin} // Navigate to login page
              className="text-indigo-400 hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
