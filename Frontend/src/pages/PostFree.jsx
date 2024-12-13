import React, { useState, useRef} from "react";
import upload_icon from "../assets/upload_image.png";
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/hero1.jpg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes } from "react-icons/fa";

function PostFree() {
  const [images, setImages] = useState([]);
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState(""); // Main category
  const [subcategory, setSubCategory] = useState("");

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");

  const autocompleteRef = useRef(null);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const subcategories = {
    "Real Estate": ["Single Room", "Double Room", "Flat", "House"],
    Vehicles: ["Bike", "Scooter", "Car", "E-Scooter"],
  };

  const categoryFeatures = {
    "Real Estate": ["Area", "Bathrooms", "Furnished", "Parking"],
    Vehicles: ["Condition", "ABS", "Airbags", "Electric"],
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Use FormData for file upload
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("address", address);
    formData.append("price", price);
    formData.append("parentCategory", category);
    formData.append("subCategory", subcategory);

    // Append all images to the FormData
    file.forEach((image) => {
      formData.append(`images`, image); // Ensure these are File objects
    });

    try {
      const response = await axios.post(
        "http://localhost:4001/api/posts",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Post submitted successfully!");
      console.log("Response:", response.data);
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

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBwe0b9cHRzka1-EdBW-SSQ-45fFI8V1HI",
    libraries: ["places"],
    version: "weekly",
  });

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place && place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setLocation({ lat, lng });
      setAddress(place.formatted_address || "");
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
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
          action="http://localhost:4001/api/posts"
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

          {/* Product Name */}
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
            />
          </div>

          {/* Product Description */}
          <div>
            <label
              htmlFor="productDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Product Description
            </label>
            <textarea
              id="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price (in Rs.)
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
            />
          </div>

          {/* Category Selection */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubCategory(""); // Reset subcategory when category is changed
              }}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
            >
              <option value="" disabled={category !== ""}>
                Select Category
              </option>
              {Object.keys(subcategories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Selection */}
          {category && (
            <div>
              <label
                htmlFor="subcategory"
                className="block text-sm font-medium text-gray-700"
              >
                Subcategory
              </label>
              <select
                id="subcategory"
                value={subcategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
              >
                <option value="" disabled={subcategory !== ""}>
                  Select Subcategory
                </option>
                {subcategories[category].map((subcat) => (
                  <option key={subcat} value={subcat}>
                    {subcat}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Location */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <Autocomplete
              onLoad={(autocomplete) =>
                (autocompleteRef.current = autocomplete)
              }
              onPlaceChanged={handlePlaceSelect}
            >
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500 mb-6"
              />
            </Autocomplete>
            <GoogleMap
              mapContainerStyle={{ height: "400px", width: "100%" }}
              center={location}
              zoom={15}
            >
              <Marker position={location} />
            </GoogleMap>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="mt-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostFree;