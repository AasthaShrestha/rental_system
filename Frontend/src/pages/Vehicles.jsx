import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import axios from "axios";

function Vehicles() {
  const [posts, setPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // Sorting order state
  const [selectedSubCategories, setSelectedSubCategories] = useState([]); 
  const [showFilter, setShowFilter] = useState(false); 

  // Fetch posts with sorting and filtering
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4001/api/posts/vehicles", {
          params: {
            order: sortOrder,
            subCategory: selectedSubCategories.join(","),
          },
        });

        if (response.data.success) {
          setPosts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchPosts();
  }, [sortOrder, selectedSubCategories]); 

  // Handle checkbox change for subcategories
  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedSubCategories((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value); // Remove from selected
      } else {
        return [...prevSelected, value]; // Add to selected
      }
    });
  };

  // Handle checkbox change for sorting (with "untick" functionality)
  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value === "clear") {
      setSortOrder(""); 
    } else {
      setSortOrder(value);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-10 pb-6 px-4">
        {/* Button to Toggle Filter and Sort Options */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        >
          {showFilter ? "Hide Filter & Sort Options" : "Show Filter & Sort Options"}
        </button>

        {/* Show filter and sort options only if showFilter is true */}
        {showFilter && (
          <div>
            {/* Sorting Section */}
            <div className="mb-6">
              <h3 className="font-semibold text-xl text-gray-700 mb-3">Sort by:</h3>
              <div className="flex gap-6 items-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="asc"
                    checked={sortOrder === "asc"}
                    onChange={handleSortChange}
                    className="h-5 w-5"
                  />
                  <span className="text-lg">Price: Low to High</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="desc"
                    checked={sortOrder === "desc"}
                    onChange={handleSortChange}
                    className="h-5 w-5"
                  />
                  <span className="text-lg">Price: High to Low</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="clear"
                    checked={sortOrder === ""}
                    onChange={handleSortChange}
                    className="h-5 w-5"
                  />
                  <span className="text-lg">Clear Sorting</span>
                </label>
              </div>
            </div>

            {/* Subcategory Filter Section */}
            <div className="mb-6">
              <h3 className="font-semibold text-xl text-gray-700 mb-3">Filter by Subcategory:</h3>
              <div className="flex gap-6 flex-wrap">
                {["Bike", "Scooter", "Car", "E-Scooter"].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={option}
                      checked={selectedSubCategories.includes(option)}
                      onChange={handleCheckboxChange}
                      className="h-5 w-5"
                    />
                    <span className="text-lg">{option}</span>
                  </label>
                ))}
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value="All"
                    checked={selectedSubCategories.length === 0}
                    onChange={handleCheckboxChange}
                    className="h-5 w-5"
                  />
                  <span className="text-lg">All Subcategories</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cards Section */}
      <div className={`pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 ${showFilter ? 'mt-4' : ''}`}>
        {posts.map((post) => (
          <Cards key={post._id} post={post} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Vehicles;