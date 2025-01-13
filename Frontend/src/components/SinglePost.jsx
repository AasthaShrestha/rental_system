import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { FaHeart, FaCommentDots } from "react-icons/fa"; // For like and chat icons

function SinglePost({ userId }) {
  // Assuming `userId` is passed as a prop or available from context
  const { id } = useParams(); // Get the ID from the URL
  const [post, setPost] = useState(null); // State for the single post (null for initial)
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [liked, setLiked] = useState(false); // For the like button state
  const [likeCount, setLikeCount] = useState(0); // To store and display the like count

  useEffect(() => {
    // Fetch post data
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/api/posts/${id}`
        );
        setPost(response.data.data); // Set post data (single object)
        setLikeCount(response.data.data.likes || 0); // Set the initial like count from the server
      } catch (error) {
        setError("Unable to fetch post details.");
        console.error("Error:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPost();

    // Check if the post is liked by this specific user in localStorage
    const likedStatus = localStorage.getItem(`liked-${userId}-${id}`);
    if (likedStatus === "true") {
      setLiked(true); // Set liked state based on localStorage
    }
  }, [id, userId]); // Re-run when the post ID or user ID changes

  const handlePayment = async () => {
    if (!post) return; // Ensure post data exists

    console.log("Initiating payment...");
    const url = "http://localhost:4001/api/orders/create";

    const data = {
      amount: post.price, // Use post price for payment
      products: [
        {
          product: post.name,
          amount: post.price,
          quantity: 1,
          parentCategory: post.parentCategory,
          subCategory: post.subCategory,
          price: post.price,
          address: post.address,
          productId: post._id,
        },
      ], // Use post name and price
      payment_method: "esewa",
    };

    console.log("Payment payload:", data);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Payment response:", responseData);

        if (responseData.payment_method === "esewa") {
          esewaCall(responseData.formData);
        }
      } else {
        console.error(
          "Payment API error:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error during payment fetch:", error);
    }
  };

  const esewaCall = (formData) => {
    console.log("eSewa form data:", formData);
    const path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (const key in formData) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  const handleLike = () => {
    const newLikedState = !liked;
    setLiked(newLikedState); // Toggle like state

    // Persist like state in localStorage, tied to the current userId and postId
    localStorage.setItem(`liked-${userId}-${id}`, newLikedState.toString());

    // Update like count
    if (newLikedState) {
      setLikeCount(likeCount + 1); // Increment like count
    } else {
      setLikeCount(likeCount - 1); // Decrement like count
    }

    // Optionally, update the like count on the server if you want it persisted in the backend
    axios.post(`http://localhost:4001/api/posts/${id}/like`, {
      liked: newLikedState,
    });
  };

  const handleChat = () => {
    alert("Chat functionality is not implemented yet.");
  };

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

            {/* Like and Chat buttons */}
            <div className="flex gap-4 mb-6">
              <button
                className={`flex items-center ${
                  liked ? "text-red-500" : "text-gray-600"
                } hover:text-pink-500 transition duration-300`}
                onClick={handleLike}
              >
                <FaHeart className="mr-1" /> Like{" "}
                {likeCount > 0 && `(${likeCount})`}
              </button>
              <button
                className="flex items-center text-gray-600 hover:text-blue-500 transition duration-300"
                onClick={handleChat}
              >
                <FaCommentDots className="mr-1" /> Chat
              </button>
            </div>

            <button
              className="px-6 py-3 bg-pink-500 text-white text-lg font-medium rounded-full shadow-md hover:bg-pink-700 transition duration-300"
              onClick={handlePayment}
            >
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
