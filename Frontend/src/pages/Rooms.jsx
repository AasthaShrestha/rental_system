import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import Cards from "../components/Cards";

function Rooms() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/posts/rooms");
        if (response.data.success) {
          setPosts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {/* Ensure Navbar stays fixed and other content doesn't overlap */}
      <Navbar />
      {/* Add top padding to prevent overlapping */}
      <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {posts.map((post) => (
          <Cards key={post._id} post={post} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Rooms;
