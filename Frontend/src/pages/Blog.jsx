import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const blogData = [
  {
    id: 1,
    title: "Best Place to Live In",
    image: "https://plus.unsplash.com/premium_photo-1661908377130-772731de98f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG91c2V8ZW58MHx8MHx8fDA%3D",
    excerpt: "Koteshwor is the best place to live in with every facility available in it...",
    date: "November 24, 2024",
    author: "YatriKuti Team",
  },
  {
    id: 2,
    title: "Travel Tips for Solo Adventurers",
    image: "https://images.unsplash.com/photo-1681018755464-1d3495867767?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmVwYWwlMjBtb3VudGFpbnN8ZW58MHx8MHx8fDA%3D",
    excerpt: "Traveling alone can be a life-changing experience. Here are essential tips for solo adventurers...",
    date: "November 20, 2024",
    author: "YatriKuti Team",
  },
  {
    id: 3,
    title: "Best Vehicles for Road Trips in Nepal",
    image: "https://images.unsplash.com/photo-1591519924849-fc8da3e9b2ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWR2ZW50dXJlJTIwYmlrZXxlbnwwfHwwfHx8MA%3D%3D",
    excerpt: "Planning a road trip in Nepal? Here are the top vehicles that combine comfort, reliability, and style...",
    date: "November 15, 2024",
    author: "YatriKuti Team",
  },
];

const Blog = () => {
  return (
    <>
    <Navbar/>
    <div className="max-w-screen-xl mx-auto px-4 py-12">
       
      <h1 className="text-4xl font-bold text-center pt-10 mb-8">YatriKuti Blog</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogData.map((blog) => (
          <div
            key={blog.id}
            className="bg-gray-900 text-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-gray-400 text-sm mb-4">
                {blog.date} | By {blog.author}
              </p>
              <p className="mb-4">{blog.excerpt}</p>
              <Link
                to={`/blog/${blog.id}`}
                className="text-blue-500 hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
    </>
  );
};

export default Blog;
