import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 

function SinglePost() {
  const { id } = useParams();
  const navigate= useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null); 
  const [endDate, setEndDate] = useState(null); 
  const [totalPrice, setTotalPrice] = useState(0); 
  const [days, setDays] = useState(null); 

  // Fetch the post data when component mounts
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

  // Handle start date change
  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate && date > endDate) {
      setEndDate(null); 
      setTotalPrice(0); 
    }
  };

  // Handle end date change
  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (startDate && date < startDate) {
      setStartDate(null); 
      setTotalPrice(0); 
    }
  };

  // Calculate total price based on selected dates
  useEffect(() => {
    if (startDate && endDate) {
      const days = Math.ceil((endDate - startDate) / (1000 * 3600 * 24)); // Calculate days difference
      const price = post.price * days; // Base price multiplied by the number of days
      setTotalPrice(price);
      setDays(days);
    } else {
      setTotalPrice(0);
      setDays(null);
    }
  }, [startDate, endDate, post]);

  // Handle payment logic
  const handlePayment = async () => {

    const authUser = JSON.parse(localStorage.getItem("authUser"));
    if (!authUser) {
      console.log("User not logged in! Redirecting to login page.");
      navigate("/login");
      return;
    }
    console.log("Book Now button clicked!");

    if (!post || !startDate || !endDate) {
      console.log("Missing required fields!");
      return;
    }
   

    const url = "http://localhost:4001/api/orders/create";
    const data = {
      amount: totalPrice,
      products: [
        {
          product: post.name,
          amount: post.price,
          quantity: 1,
          image:post.images[0],
          parentCategory: post.parentCategory,
          subCategory: post.subCategory,
          price: post.price,
          address: post.address,
          productId: post._id,
          startDate, endDate
        },
      ],
      payment_method: "esewa",
    };

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
        console.log("Payment API response:", responseData);
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

  // eSewa call to handle payment
  const esewaCall = (formData) => {
    console.log("Form Data:", formData);

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

  // Handle predefined duration selection
  const handlePreSetDuration = (event) => {
    const selectedDays = event.target.value ? parseInt(event.target.value) : null;
    if (selectedDays === null) {
      setStartDate(null);
      setEndDate(null);
      setDays(null);
      setTotalPrice(0);
    } else {
      const start = new Date();
      const end = new Date(start);
      end.setDate(start.getDate() + selectedDays);

      setStartDate(start);
      setEndDate(end);
      setDays(selectedDays);
      setTotalPrice(post.price * selectedDays);
    }
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
      <div className="container mx-auto px-4 py-16 mt-20 bg-gray-50 shadow-lg rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-[300px] w-full bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <img
              src={`http://localhost:4001/${post.images}`}
              alt="post image"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="p-8 bg-white shadow-xl rounded-lg">
            <h1 className="text-3xl font-semibold text-gray-800 mb-3">{post.name}</h1>
            <p className="text-gray-600 text-base mb-3">{post.description}</p>
            <div className="text-gray-600 text-sm mb-3">
              <strong>Location: </strong> {post.address}
            </div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-lg font-bold text-gray-800">
                रु {totalPrice || post.price}
              </span>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-3">Select Booking Duration:</label>
              <select
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                value={days || "none"}
                onChange={handlePreSetDuration}
              >
                <option value="">None</option>
                <option value={1}>1 Day</option>
                <option value={2}>2 Days</option>
                <option value={3}>3 Days</option>
                <option value={4}>4 Days</option>
                <option value={5}>5 Days</option>
                <option value={6}>6 Days</option>
                <option value={7}>7 Days</option>
                {days && days > 7 && <option value={days}>{days} Days</option>}
              </select>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-3">Select Start Date:</label>
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  minDate={new Date()}
                  className="w-full p-3 border rounded-lg"
                  dateFormat="yyyy/MM/dd"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-3">Select End Date:</label>
                <DatePicker
                  selected={endDate}
                  onChange={handleEndDateChange}
                  minDate={startDate ? startDate : new Date()}
                  className="w-full p-3 border rounded-lg"
                  dateFormat="yyyy/MM/dd"
                />
              </div>
            </div>

            <button
              className={`px-6 py-3 text-white text-lg font-medium rounded-full shadow-md transition duration-300 ${
                post?.occupied
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-pink-500 hover:bg-pink-700"
              }`}
              onClick={handlePayment}
              disabled={!post || post.occupied || !startDate || !endDate}
            >
              {post?.occupied ? "Occupied" : "Book Now"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SinglePost;
