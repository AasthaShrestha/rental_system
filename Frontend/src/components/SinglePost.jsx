import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { FaHeart, FaCommentDots } from "react-icons/fa"; // Import icons

function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false); // State for like button
  const [chatOpen, setChatOpen] = useState(false); // State for chat button

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/api/posts/${id}`
        );
        setPost(response.data.data);
      } catch (error) {
        setError("Unable to fetch post details.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handlePayment = async () => {
    if (!post) return;

    const url = "http://localhost:4001/api/orders/create";
    const data = {
      amount: post.price,
      products: [{ product: post.name, amount: post.price, quantity: 1 }],
      payment_method: "esewa",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.payment_method === "esewa") {
          esewaCall(responseData.formData);
        }
      } else {
        console.error("Payment API error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error during payment fetch:", error);
    }
  };

  const esewaCall = (formData) => {
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
    setLiked(!liked); // Toggle the "liked" state
  };

  const handleChat = () => {
    setChatOpen(true);
    
    console.log("Chat function triggered");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8 items-start bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex-1">
            <img
              src={`http://localhost:4001/${post.images}`}
              alt="post image"
              className="w-full h-96 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{post.name}</h1>
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

            {/* Like and chat buttons */}
            <div className="flex gap-4 mb-6">
              <button
                className={`flex items-center ${
                  liked ? "text-red-500" : "text-gray-600"
                } hover:text-pink-500 transition duration-300`}
                onClick={handleLike}
              >
                <FaHeart className="mr-1" /> Like
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
