import React from "react";
import { useNavigate } from "react-router-dom";

function Cards({ post }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (!post.occupied) {
      navigate(`/post/${post._id}`);
    }
  };

  const handleBookNow = (event) => {
    event.stopPropagation(); // Prevent parent click event
    if (!post.occupied) {
      navigate(`/post/${post._id}`);
    }
  };

  return (
    <div className="p-4 flex justify-center">
      <div
        onClick={handleCardClick} // Navigate to SinglePost on card click
        className={`card bg-base-100 max-w-sm w-full h-[400px] shadow-xl rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col relative ${
          post.occupied ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {/* Badge for Availability */}
        <div
          className={`absolute top-2 right-2 px-3 py-1 text-sm font-semibold rounded-lg ${
            post.occupied ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }`}
        >
          {post.occupied ? "Not Available" : "Available"}
        </div>
        <figure>
          <img
            src={`http://localhost:4001/${post.images[0]}`}
            alt="post image"
            className="h-40 w-full object-cover"
          />
        </figure>
        <div className="card-body p-4 flex flex-col justify-between">
          <div>
            <h2 className="card-title text-lg font-semibold mb-2 flex items-center">
              {post.name}
            </h2>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2 h-10 overflow-hidden">
              {post.description}
            </p>
            <p className="text-sm text-gray-600 mb-4">Location: {post.address}</p>
          </div>
          <div className="card-actions flex justify-between items-center">
            <div className="badge badge-outline text-lg font-semibold">
              रु {post.price}
            </div>
            <button
              onClick={handleBookNow} 
              disabled={post.occupied}
              className={`px-4 py-2 rounded-full transition duration-300 ease-in-out ${
                post.occupied
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                  : "bg-pink-500 text-white hover:bg-pink-700"
              }`}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
