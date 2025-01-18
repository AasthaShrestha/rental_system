import React, { useState, useRef } from "react";
import upload_icon from "../assets/upload_image.png";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/hero1.jpg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes } from "react-icons/fa";
import { axiosInstance } from "../api/axiosInstance";
 
 const Kyc = () => {
    const [images, setImages] = useState([]);
  const [category, setCategory] = useState(""); // Main category
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const autocompleteRef = useRef(null);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Use FormData for file upload
    formData.append("idNumber", productName);
    formData.append("idType", category);
    // Append all images to the FormData
    file.forEach((image) => {
      formData.append(`images`, image); // Ensure these are File objects
    });

    try {
      const response = await axiosInstance.post("user/addkyc", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Post submitted successfully!");
      console.log("Response:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Error submitting post.");
    }
  };

  const handleImageUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files); // Convert FileList to array
    if (uploadedFiles.length > 0) {
      setFile(uploadedFiles); // Save all files to state

      // Loop over each file and read them
      uploadedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages((prevImages) => [...prevImages, reader.result]); // Add each image to state
        };
        reader.readAsDataURL(file); // Read each file as data URL
      });
    }
  };



    return (<>
        <div
      className="flex justify-center items-center p-6 bg-gray-100 min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ToastContainer />
      <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-lg shadow-lg p-6 relative">
        {/* Cross Arrow */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-500 hover:text-pink-500 transition"
        >
          <FaTimes size={20} />
        </button>

        <form
          action="http://localhost:4001/user/addKyc"
          method="POST"
          enctype="multipart/form-data"
          className="flex flex-col space-y-6"
        >
          {/* Image Upload Section */}
          <div className="flex flex-wrap gap-4 items-center">
            {images.map((image, index) => (
              <div key={index} className="w-24 h-24">
                <img
                  src={image}
                  alt={`Uploaded ${index}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
            <label
              htmlFor="image"
              className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 cursor-pointer hover:border-gray-400"
            >
              <img src={upload_icon} alt="Add" className="w-10 h-10 mb-2" />
              <span className="text-sm">Add Image</span>
              <input
                type="file"
                id="image"
                name="images"
                onChange={handleImageUpload}
                hidden
              />
            </label>
          </div>

           {/* Category Selection */}
           <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Id Type
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
            >
              <option value="" disabled={category !== ""}>
                Select Id Type
              </option>
            
                <option value="Citizenship">
                Citizenship
                </option>
            
                <option value="Passport">
                Passport
                </option>
            </select>
          </div>

          {/* Product Name */}
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              ID number
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
            />
          </div>

    
         
    
          {/* Submit Button */}
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="mt-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </>)
}

export default Kyc