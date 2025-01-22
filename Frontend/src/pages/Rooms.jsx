import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import axios from "axios";

function Rooms() {
  const [posts, setPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // Sorting order state
  const [subCategory, setSubCategory] = useState(""); // Subcategory filter state

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Check if sortOrder is "clear" to reset sorting
        let sortQuery = sortOrder === "clear" ? "" : sortOrder;  // Reset sorting if "clear" is selected

        // Get posts with filters applied (subCategory and sortOrder)
        const response = await axios.get("http://localhost:4001/api/posts/rooms", {
          params: { order: sortQuery, subCategory: subCategory },
        });

        if (response.data.success) {
          setPosts(response.data.data); // Update posts with filtered data
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchPosts();
  }, [sortOrder, subCategory]); // Fetch whenever sortOrder or subCategory changes

  return (
    <>
      <Navbar />
      <div className="pt-10 pb-6 px-4">
        {/* Sorting and Filtering Dropdowns in the same line */}
        <div className="flex gap-4 justify-start items-center">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded px-4 py-2 w-full md:w-48"
          >
            <option value="">Sort by</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
            <option value="clear">Clear Sorting</option> {/* Clear Sorting option */}
          </select>

          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="border rounded px-4 py-2 w-full md:w-48"
          >
            <option value="">Filter</option>
            <option value="Single Room">Single Room</option>
            <option value="Double Room">Double Room</option>
            <option value="Flat">Flat</option>
            <option value="House">House</option>
            <option value="All">All Subcategories</option>
          </select>
        </div>
      </div>

      <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {posts.map((post) => (
          <Cards key={post._id} post={post} />
        ))}
      </div>

      <Footer />
    </>
  );
}

export default Rooms;