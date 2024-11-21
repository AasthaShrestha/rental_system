import React from "react";
import { useParams } from "react-router-dom";
import list from "../list.json";

function PostDetails() {
  const { id } = useParams();
  const item = list.find((data) => data.id === parseInt(id, 10));

  if (!item) {
    return <p className="text-center text-red-500">Post not found!</p>;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={item.image || "https://via.placeholder.com/400"}
          alt={`${item.name} image`}
          className="w-full md:w-1/2 h-64 object-cover rounded-md mb-4 md:mb-0"
        />
        <div className="md:ml-6">
          <h1 className="text-2xl font-bold mb-2">{item.name}</h1>
          <p className="text-gray-700 mb-4">{item.title}</p>
          <p className="text-lg font-semibold text-gray-900 mb-6">
            Price: रु {item.price}
          </p>
          <button className="px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-700 transition duration-300 ease-in-out">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
