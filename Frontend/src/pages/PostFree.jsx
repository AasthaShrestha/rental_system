import React, { useState, useRef, useEffect } from "react";
import upload_icon from "../assets/upload_image.png";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/hero1.jpg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTimes } from "react-icons/fa";

function PostFree() {
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState({ lat: 27.7172, lng: 85.324 }); // Default location (Kathmandu)
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState(""); // Main category
  const [subcategory, setSubCategory] = useState(""); // Sub-category dependent on main category
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [area, setArea] = useState(""); // Textbox for area
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState(""); // Condition for vehicles
  const autocompleteRef = useRef(null);
  const navigate = useNavigate();

  const subcategories = {
    "Real Estate": ["Single Room", "Double Room", "Flat", "House"],
    Vehicles: ["Bike", "Scooter", "Car", "E-Scooter"],
  };

  const categoryFeatures = {
    "Real Estate": ["Area", "Bedrooms", "Bathrooms", "Furnished"],
    Vehicles: ["Condition", "ABS", "Airbags", "Electric"],
  };

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures((prevFeatures) =>
      prevFeatures.includes(feature)
        ? prevFeatures.filter((f) => f !== feature)
        : [...prevFeatures, feature]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: productName,
      title: productDescription,
      address: address,
      price: price,
      parentCategory: category,
      subCategory: subcategory,
      image:images,
    };
    console.log("payload images", images);
    try {
      const resp = await axios.post("http://localhost:4001/api/posts", payload);
      console.log(resp.data);
      toast.success("Post successful!");
    } catch (err) {
      alert("err");
      console.log(err.response);
      toast.error("Failed to post. Please try again!");
    }
  };

 const handleImageUpload = (e) => {
   const files = Array.from(e.target.files); 
   files.forEach((file) => {
     const reader = new FileReader();
     reader.onload = () => {
       setImages((prevImages) => [...prevImages, reader.result]);
     };
     reader.readAsDataURL(file);
   });
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

        <form className="flex flex-col space-y-6">
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

          {/* Dynamic Features */}
          {category && categoryFeatures[category] && (
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-2">
                Features
              </h3>
              {categoryFeatures[category].map((feature) =>
                feature === "Area" || feature === "Condition" ? (
                  feature === "Condition" && category === "Vehicles" ? (
                    <div key={feature} className="mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        {feature}
                      </label>
                      <select
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
                      >
                        <option value="" disabled={condition !== ""}>
                          Select Category
                        </option>
                        <option value="New">New</option>
                        <option value="Old">Old</option>
                      </select>
                    </div>
                  ) : (
                    <div key={feature} className="mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        {feature} (in Sq. Ft.)
                      </label>
                      <input
                        type="number"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-500"
                      />
                    </div>
                  )
                ) : (
                  <div key={feature} className="mb-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFeatures.includes(feature)}
                        onChange={() => handleFeatureToggle(feature)}
                        className="mr-2"
                      />
                      {feature}
                    </label>
                  </div>
                )
              )}
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
