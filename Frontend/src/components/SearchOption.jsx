import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchOption = ({ setSearch }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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

    const debounceFetch = setTimeout(fetchResults, 300);

    return () => clearTimeout(debounceFetch);
  }, [query]);


  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearch(value);
  };

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
            <Link
              key={result._id}
              to={`/post/${result._id}`}
              onClick={() => {
                setIsDropdownVisible(false);
                setQuery("");
              }}
            >
              <div className="p-2 hover:bg-gray-200 cursor-pointer text-black">
                {result.name}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No Results Found */}
      {isDropdownVisible && results.length === 0 && (
        <div className="absolute top-full left-0 w-full bg-white rounded-md shadow-md mt-1 z-10 p-2 text-black">
          No results found.
        </div>
      )}
    </div>
  );
};

export default SearchOption;
