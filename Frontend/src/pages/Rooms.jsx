  import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Flex from "../components/Flex";
import Cards from "../components/Cards";
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
      <Navbar />
      <Flex
        title="Our Rooms"
        subtitle="Experience Comfort with our services."
        image={main1}
        children="Back"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {posts.map((post) => (
          <Link to={`/post/${post._id}`} key={post._id}>
            <Cards post={post} />
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Rooms;
