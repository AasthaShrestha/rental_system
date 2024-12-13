import React from "react";
import { useNavigate } from "react-router-dom";

function Cards({ post }) {
  const navigate = useNavigate();

  const handleBookNow = (event) => {
    event.stopPropagation(); // Prevent navigation from parent elements
    navigate(`/post/${post._id}`); // Navigate only when "Book Now" is clicked
  };

  return (
    <div className="p-4 flex justify-center">
      <div
        className="card bg-base-100 max-w-sm w-full shadow-xl rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
        style={{ height: "400px" }} // Fixed height for the card
      >
        <figure className="h-1/2 overflow-hidden">
          <img
            src={`http://localhost:4001/${post.images[0]}`}
            alt="post image"
            className="h-full w-full object-cover"
          />
        </figure>
        <div className="card-body p-4 h-1/2 flex flex-col justify-between">
          <div>
            <h2 className="card-title text-lg font-semibold mb-2 flex items-center">
              {post.name}
              <div className="badge badge-secondary ml-2">NEW</div>
            </h2>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {post.description}
            </p>
            <p className="text-sm text-gray-600 mb-1 truncate">
              Location: {post.address}
            </p>
            <p className="text-sm text-gray-600 mb-1 truncate">
              SubCategory: {post.subCategory}
            </p>
          </div>
          <div className="card-actions flex justify-between items-center">
            <div className="badge badge-outline text-lg font-semibold">
              रु {post.price}
            </div>
            <button
              onClick={handleBookNow} // Trigger navigation on button click
              className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-700 transition duration-300 ease-in-out"
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
