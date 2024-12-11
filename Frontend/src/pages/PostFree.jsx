import React, { useState, useRef } from "react";
import upload_icon from "../assets/upload_image.png";
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/hero1.jpg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes } from "react-icons/fa";

function PostFree() {
  const [images, setImages] = useState([]);
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [latitude, setLatitude] = useState(null);  // Added latitude state
  const [longitude, setLongitude] = useState(null);  // Added longitude state
  const [mapCenter, setMapCenter] = useState({ lat: 27.7172, lng: 85.324 }); // Default map center
  const autocompleteRef = useRef(null);
  const navigate = useNavigate();

  const subcategories = {
    "Real Estate": ["Single Room", "Double Room", "Flat", "House"],
    Vehicles: ["Bike", "Scooter", "Car", "E-Scooter"],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("address", address);
    formData.append("price", price);
    formData.append("parentCategory", category);
    formData.append("subCategory", subcategory);
    formData.append("latitude", latitude);  // Append latitude
    formData.append("longitude", longitude);  // Append longitude

    file?.forEach((image) => {
      formData.append("images", image);
    });

    console.log(formData)
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

      // Redirect to the home page after success
      navigate("/");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Error submitting post.");
    }
  };

  const handleImageUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFile(uploadedFiles);
    uploadedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => [...prevImages, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDVsrErMhEQtr1gSWj0MyIGQzbkslWb4zY", // Replace with your Google API key
    libraries: ["places"],
  });

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place?.geometry) {
      // Set the address and center map to the selected place
      setAddress(place.formatted_address || "");
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      setLatitude(lat);  // Update latitude
      setLongitude(lng);  // Update longitude

      setMapCenter({
        lat: lat,
        lng: lng,
      });
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
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-500 hover:text-pink-500 transition"
        >
          <FaTimes size={20} />
        </button>

        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
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
                setSubCategory("");
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
                placeholder="Enter an address"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
              />
            </Autocomplete>
          </div>

          {/* Map */}
          <div className="mt-4">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "300px" }}
              center={mapCenter}
              zoom={15}
            >
              <Marker position={mapCenter} />
            </GoogleMap>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-pink-500 text-white font-bold py-2 px-4 rounded hover:bg-pink-600 transition"
          >
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostFree;