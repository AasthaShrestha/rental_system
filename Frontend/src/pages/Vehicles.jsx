import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import img from "../assets/masterVehicle.webp";
import Flex from "../components/Flex";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import axios from "axios";
import { Link } from "react-router-dom";

function Vehicles() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/posts");
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
    <>
      <Navbar />
      <Flex
        title="Our Vehicles"
        subtitle="Experience Comfort with our services."
        image={img}
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
    </>
  );
}

export default Vehicles;
