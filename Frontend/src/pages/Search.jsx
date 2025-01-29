import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the search query parameter from the URL
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search');

  useEffect(() => {
    if (searchQuery) {
      fetch(`http://localhost:4001/api/posts/searchSection?search=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
          setPosts(data);  
          
          setLoading(false);
        })
        .catch((err) => {
          setError('Error fetching posts');
          setLoading(false);
        });
    }
  }, [searchQuery]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Search Results for "{searchQuery}"</h1>
      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 ">
        {posts.map((post) => (
          <Cards key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Search;
