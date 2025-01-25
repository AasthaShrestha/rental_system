import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminReview = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('http://localhost:4001/admin/review');
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  const approvePost = async (id) => {
    try {
      await axios.put(`http://localhost:4001/admin/approve/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Pending Posts</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <button onClick={() => approvePost(post._id)}>Approve</button>
        </div>
      ))}
    </div>
  );
};

export default AdminReview;
