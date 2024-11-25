import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SupportImage from "../assets/customer-support.jpg"; // Make sure this path is correct
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    enquiryType: "",
    message: "",
  });

  const [emailError, setEmailError] = useState(""); // State for email error message

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      // Improved email validation regex
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError(""); // Clear the error when valid
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailError) {
      alert("Please correct the errors in the form before submitting.");
      return;
    }

    alert("Form submitted successfully!");
  };

  return (
    <div>
      <Navbar />
      <div className="relative flex flex-col md:flex-row min-h-screen pt-[50px]">
        {/* Contact Form */}
        <div
          className="flex flex-col justify-center items-center md:w-1/2 px-8 py-12 bg-purple-600 md:clip-path-polygon"
          style={{
            backgroundColor: "#7A4DAB",
            clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)",
          }}
        >
          <h1 className="text-white text-4xl font-bold mb-6">Contact Us</h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md space-y-6"
          >
            <div>
              <label htmlFor="name" className="block font-semibold text-lg">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-semibold text-lg">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full mt-2 p-2 border rounded-md ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            <div>
              <label htmlFor="enquiryType" className="block font-semibold text-lg">
                Enquiry Type
              </label>
              <select
                id="enquiryType"
                name="enquiryType"
                value={formData.enquiryType}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Enquiry Type</option>
                <option value="general">General Query</option>
                <option value="support">Customer Support</option>
                <option value="partnership">Partnership Opportunities</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block font-semibold text-lg">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                rows="4"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Support Image Section */}
        <div className="flex flex-col justify-center items-center bg-white md:w-1/2 p-8">
          <img
            src={SupportImage}
            alt="Support Professional"
            className="w-full h-48 object-cover md:w-3/4 md:h-auto"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            We're here to help!
          </h2>
          <p className="mt-2 text-gray-600 text-center px-4">
            Feel free to reach out to us with any questions or concerns.
          </p>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-around items-center space-y-6 md:space-y-0">
          <div className="flex flex-col items-center space-y-2 text-center md:text-left">
            <FaMapMarkerAlt className="text-3xl text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-800">Our Address</h3>
            <p className="text-gray-600">Lokanthali, Bhaktapur</p>
          </div>

          <div className="flex flex-col items-center space-y-2 text-center md:text-left">
            <FaPhoneAlt className="text-3xl text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-800">Phone Number</h3>
            <p className="text-gray-600">+977 9865465747, 9869377804, 9810343140</p>
          </div>

          <div className="flex flex-col items-center space-y-2 text-center md:text-left">
            <FaEnvelope className="text-3xl text-purple-600" />
            <h3 className="text-xl font-semibold text-gray-800">Email Us</h3>
            <p className="text-gray-600">contact@yatrikuti.com</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ContactUs;
