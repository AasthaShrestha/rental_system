import React from "react";

function Cards({ post }) {
  console.log(post.images);
  return (
    <div className="p-4 flex justify-center">
      <div className="card bg-base-100 max-w-sm w-full shadow-xl rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
        <figure>
          <img
            src={`http://localhost:4001/${post.images[0]}`}
            alt="post image"
            className="h-64 w-full object-cover"
          />
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-lg font-semibold mb-2 flex items-center">
            {post.name}
            <div className="badge badge-secondary ml-2">NEW</div>
          </h2>
          <p className="text-sm text-gray-600 mb-4">{post.description}</p>
          <p className="text-sm text-gray-600 mb-4">Location:{post.address}</p>
          <div className="card-actions flex justify-between items-center">
            <div className="badge badge-outline text-lg font-semibold">
              रु {post.price}
            </div>
            <button
              className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-700 transition duration-300 ease-in-out"
              onClick={() => handlePayment()}
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
