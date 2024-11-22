import React, { useState } from "react";
import upload_icon from "../assets/upload_image.png";

function PostFree() {
  const [images, setImages] = useState([]);

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

  return (
    <div className="flex justify-center items-center p-6 bg-gray-100 min-h-screen">
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
            <label className="text-gray-700 font-medium">Product name</label>
            <input
              type="text"
              name="name"
              placeholder="Type Here"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Product Description Section */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Product description</label>
            <textarea
              name="description"
              rows="6"
              placeholder="Write content here"
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            ></textarea>
          </div>

          {/* Category and Price Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">Product category</label>
              <select
                name="category"
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="One-room">One-room</option>
                <option value="Two-rooms">Two-rooms</option>
                <option value="Flat">Flat</option>
                <option value="House">House</option>
                <option value="Bike">Bike</option>
                <option value="Scooter">Scooter</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium">Product Price</label>
              <input
                type="number"
                name="price"
                placeholder="Rs.1000"
                className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
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
