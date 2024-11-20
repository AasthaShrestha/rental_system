import React from "react";
import { useLocation } from "react-router-dom";

const Vehicles = () => {
  const location = useLocation();
  const newPost = location.state?.newPost;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Vehicles</h1>
      {newPost ? (
        <div className="bg-gray-100 p-4 rounded">
          <img
            src={newPost.photo}
            alt={newPost.title}
            className="w-full h-64 object-cover rounded mb-4"
          />
          <h2 className="text-lg font-semibold">{newPost.title}</h2>
          <p className="text-gray-600">{newPost.description}</p>
          <p className="text-blue-500 font-bold mt-2">${newPost.price}</p>
        </div>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default Vehicles;
