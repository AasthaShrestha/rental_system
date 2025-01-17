import React, { useState } from "react";
import Navbar from "./Navbar"; 
import Footer from "./Footer"; 

const ValidUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <form
          className="bg-white shadow-lg rounded-lg p-6 w-96"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
            User Information Form
          </h2>

          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Phone Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Photo Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>

      
      <Footer />
    </div>
  );
};

export default ValidUserForm;
