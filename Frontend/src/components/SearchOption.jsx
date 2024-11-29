import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const SearchOption = ({ setSearch, search }) => {
  const { id } = useParams(); // Get the ID from the URL, now inside the component
  const [query, setQuery] = useState(""); // User input
  const [results, setResults] = useState([]); // Search results
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch single post data when ID changes
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

    if (id) {
      fetchPost();
    }
  }, [id]);

  // Search functionality based on query input
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsDropdownVisible(false);
      return;
    }

    const fetchResults = async () => {
      try {
        const url = `http://localhost:4001/api/posts/searchSection?search=${query}`;
        const { data } = await axios.get(url);
        setResults(data.rooms || []);
        setIsDropdownVisible(true);
      } catch (err) {
        console.error("Error fetching search results:", err);
      }
    };

    const debounceFetch = setTimeout(fetchResults, 300); // Debounce API calls

    return () => clearTimeout(debounceFetch); // Cleanup on query change
  }, [query]);

  // Handle changes in the input field
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value); // Update input
    setSearch(value); // Update parent state
  };

  // Handle the click event when selecting a result
  const handleResultClick = (result) => {
    setQuery(result.name); // Set selected result
    setSearch(result.name); // Update parent state
    setIsDropdownVisible(false); // Hide dropdown
  };

  // Render the component
  return (
    <div className="relative">
      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="w-full p-2 rounded-md text-black"
        onFocus={() => setIsDropdownVisible(results.length > 0)}
      />

      {/* Popup Menu for Results */}
      {isDropdownVisible && results.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white rounded-md shadow-md mt-1 z-10">
          {results.map((result) => (
            <Link key={result._id}to={`/post/${result._id}`}>
            <div
              
              className="p-2 hover:bg-gray-200 cursor-pointer"
              
            >
              
              {result.name}
            </div>
            </Link>
          ))}
        </div>
      )}

      {/* No Results Found */}
      {isDropdownVisible && results.length === 0 && (
        <div className="absolute top-full left-0 w-full bg-white rounded-md shadow-md mt-1 z-10 p-2 text-gray-600">
          No results found.
        </div>
      )}
    </div>
  );
};

export default SearchOption;