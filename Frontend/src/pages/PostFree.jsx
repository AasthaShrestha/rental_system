import React, { useState } from "react";

const PostFree = () => {
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option
  const [formData, setFormData] = useState({
    title: "",
    photo: null,
    price: "",
    description: "",
    additionalField: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    alert("Form submitted successfully!");
    setFormData({
      title: "",
      photo: null,
      price: "",
      description: "",
      additionalField: "",
    });
    setSelectedOption(null);
  };

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center">Post for Free</h1>

      {!selectedOption ? (
        // Display options
        <div className="flex justify-around">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => setSelectedOption("Vehicle")}
          >
            Post a Vehicle
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={() => setSelectedOption("Room")}
          >
            Post a Room
          </button>
        </div>
      ) : (
        // Display the form
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-bold">
            {selectedOption === "Vehicle" ? "Vehicle Details" : "Room Details"}
          </h2>

          {/* Title */}
          <div>
            <label className="block font-semibold">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter a title"
              required
            />
          </div>

          {/* Photo */}
          <div>
            <label className="block font-semibold">Photo:</label>
            <input
              type="file"
              name="photo"
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              accept="image/*"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-semibold">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter the price"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              rows="4"
              placeholder="Enter a description"
              required
            ></textarea>
          </div>

          {/* Additional Field */}
          {selectedOption === "Vehicle" ? (
            <div>
              <label className="block font-semibold">Vehicle Type:</label>
              <input
                type="text"
                name="additionalField"
                value={formData.additionalField}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="e.g., Car, Bike, Scooter"
              />
            </div>
          ) : (
            <div>
              <label className="block font-semibold">Room Type:</label>
              <input
                type="text"
                name="additionalField"
                value={formData.additionalField}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="e.g., Apartment, Shared Room"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>

          {/* Back Button */}
          <button
            type="button"
            className="w-full bg-gray-300 py-2 rounded-md hover:bg-gray-400 mt-2"
            onClick={() => setSelectedOption(null)}
          >
            Back
          </button>
        </form>
      )}
    </div>
  );
};

export default PostFree;
