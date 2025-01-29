import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
import axios from "axios";
import { TablePagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const fetchRooms = async (page, limit, sortOrder, selectedSubCategories) => {
  try {
    const response = await axios.get("http://localhost:4001/api/posts/rooms", {
      params: {
        order: sortOrder,
        subCategory: selectedSubCategories.join(","),
        page,
        limit,
      },
    });

    console.log("API Response:", response.data); // Debugging

    if (response.data.success) {
      return response.data; // { data: [...], total: 50 }
    }
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return { data: [], total: 0 };
  }
};

function Rooms() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6); // Track rowsPerPage separately
  const [sortOrder, setSortOrder] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const rowsPerPageOptions = [6, 12, 18];

  // Fetch rooms with pagination, sorting, and filtering
  const { data, isLoading, isError } = useQuery({
    queryKey: ["rooms", page, rowsPerPage, sortOrder, selectedSubCategories],
    queryFn: () =>
      fetchRooms(page + 1, rowsPerPage, sortOrder, selectedSubCategories),
    keepPreviousData: true,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedSubCategories(
      (prevSelected) =>
        prevSelected.includes(value)
          ? prevSelected.filter((item) => item !== value) // Remove
          : [...prevSelected, value] // Add
    );
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value === "clear" ? "" : e.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data!</div>;

  return (
    <>
      <Navbar />
      <div className="pt-10 pb-6 px-4">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        >
          {showFilter
            ? "Hide Filter & Sort Options"
            : "Show Filter & Sort Options"}
        </button>

        {showFilter && (
          <div>
            <div className="mb-6">
              <h3 className="font-semibold text-xl text-gray-700 mb-3">
                Sort by:
              </h3>
              <div className="flex gap-6 items-center">
                {["asc", "desc", "clear"].map((value) => (
                  <label key={value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={value}
                      checked={sortOrder === value}
                      onChange={handleSortChange}
                      className="h-5 w-5"
                    />
                    <span className="text-lg">
                      {value === "asc"
                        ? "Price: Low to High"
                        : value === "desc"
                        ? "Price: High to Low"
                        : "Clear Sorting"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-xl text-gray-700 mb-3">
                Filter by Subcategory:
              </h3>
              <div className="flex gap-6 flex-wrap">
                {["Single Room", "Double Room", "Flat", "House"].map(
                  (option) => (
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
                  )
                )}
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
      <div
        className={`pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 ${
          showFilter ? "mt-4" : ""
        }`}
      >
        {data?.data?.map((post) => (
          <Cards key={post._id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={data?.total || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
      />
      <Footer />
    </>
  );
}

export default Rooms;
