import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

function SinglePost() {
  const { id } = useParams(); // Get the ID from the URL
  const [post, setPost] = useState(null); // State for the single post (null for initial)
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/api/posts/${id}`
        );
        setPost(response.data.data); // Set post data (single object)
      } catch (error) {
        setError("Unable to fetch post details.");
        console.error("Error:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Ensure `post` is not null before rendering
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        {/* Post Content Wrapper */}
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8 items-start bg-white shadow-md rounded-lg overflow-hidden">
          {/* Expanded Image Section */}
          <div className="flex-1">
            <img
              src={`http://localhost:4001/${post.images}`}
              alt="post image"
              className="w-full h-96 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Post Details Section */}
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {post.name}
            </h1>
            <p className="text-gray-600 text-sm mb-6">{post.description}</p>
            <div className="text-gray-600 text-sm mb-4">
              <strong>Location: </strong> {post.address}
            </div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-lg font-bold text-gray-800">
                रु {post.price}
              </span>
              <span className="badge badge-secondary">NEW</span>
            </div>
            <button className="px-6 py-3 bg-pink-500 text-white text-lg font-medium rounded-full shadow-md hover:bg-pink-700 transition duration-300">
              Book Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SinglePost;
