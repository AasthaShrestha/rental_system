import React, { useState, useRef } from "react";
import upload_icon from "../assets/upload_image.png";
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from "@react-google-maps/api";

function PostFree() {
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState({ lat: 27.7172, lng: 85.3240 }); // Default location (Kathmandu)
  const [address, setAddress] = useState("");
  const [parentCategory, setParentCategory] = useState(""); // For Real Estate / Vehicles
  const [subCategory, setSubCategory] = useState(""); // For dependent sub-categories
  const [features, setFeatures] = useState({
    kitchen: false,
    bathroom: false,
    balcony: false,
    parking: false,
  }); // State for Real Estate features
  const autocompleteRef = useRef(null); // Ref for the Autocomplete component

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prevImages) => [...prevImages, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Load Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBwe0b9cHRzka1-EdBW-SSQ-45fFI8V1HI", // Replace with your API Key
    libraries: ["places"],
    version: "weekly",
  });

  // Handle place selection from Autocomplete
  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();

    if (place && place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setLocation({ lat, lng }); // Update map center
      setAddress(place.formatted_address || ""); // Update address input
    }
  };

  // Options for categories and sub-categories
  const categoryOptions = {
    "Real Estate": ["Single Room", "Double Room", "Flat", "House"],
    Vehicles: ["Bike", "Scooter", "Car", "E-Scooter"],
  };

  // Handle feature toggles
  const handleFeatureChange = (feature) => {
    setFeatures((prevFeatures) => ({
      ...prevFeatures,
      [feature]: !prevFeatures[feature],
    }));
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center p-6 bg-gray-100 ">
      <div className="w-full max-w-lg bg-white border border-gray-300 rounded-lg shadow-lg p-6">
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

          {/* Product Name Section */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="Type Here"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Address Input Section */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Address</label>
            <Autocomplete
              onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
              onPlaceChanged={handlePlaceSelect}
            >
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Address"
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </Autocomplete>
          </div>

          {/* Google Map Section */}
          <div className="h-60 w-full mb-4">
            <GoogleMap
              center={location}
              zoom={14}
              mapContainerStyle={{ width: "100%", height: "100%" }}
            >
              <Marker position={location} />
            </GoogleMap>
          </div>

          {/* Category Selection Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Parent Category */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">Category</label>
              <select
                name="parentCategory"
                value={parentCategory}
                onChange={(e) => {
                  setParentCategory(e.target.value);
                  setSubCategory(""); // Reset sub-category when parent changes
                  setFeatures({ kitchen: false, bathroom: false, balcony: false, parking: false }); // Reset features
                }}
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {Object.keys(categoryOptions).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub-Category */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">Sub-Category</label>
              <select
                name="subCategory"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                disabled={!parentCategory} // Disable if no parent is selected
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="" disabled>
                  Select Sub-Category
                </option>
                {parentCategory &&
                  categoryOptions[parentCategory].map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Real Estate Features */}
          {parentCategory === "Real Estate" && (
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">Features</label>
              <div className="flex flex-wrap gap-4 mt-2">
                {Object.keys(features).map((feature) => (
                  <label key={feature} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={features[feature]}
                      onChange={() => handleFeatureChange(feature)}
                      className="form-checkbox"
                    />
                    <span className="text-gray-600">{feature.charAt(0).toUpperCase() + feature.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Product Price Section */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Product Price</label>
            <input
              type="number"
              name="price"
              placeholder="Rs.1000"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            POST
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostFree;
