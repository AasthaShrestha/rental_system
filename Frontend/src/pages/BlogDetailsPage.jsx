import React from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const blogData = [
  {
    id: 1,
    title: "Best place to live in",
    image: "https://plus.unsplash.com/premium_photo-1661908377130-772731de98f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG91c2V8ZW58MHx8MHx8fDA%3D",
    content: "Nepal offers some of the most breathtaking destinations, from the Himalayas to the Terai plains. Explore places like Everest Base Camp, Pokhara, Chitwan National Park, and the serene Rara Lake. These destinations offer unique cultural and natural experiences...",
    date: "November 24, 2024",
    author: "YatriKuti Team",
  },
  {
    id: 2,
    title: "Travel Tips for Solo Adventurers",
    image: "https://images.unsplash.com/photo-1681018755464-1d3495867767?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmVwYWwlMjBtb3VudGFpbnN8ZW58MHx8MHx8fDA%3D",
    content: "Traveling alone can be a life-changing experience. Make sure to plan ahead, stay safe by sharing your itinerary, and embrace the local culture. Don’t forget to pack light, use reliable navigation tools, and enjoy the freedom of traveling solo...",
    date: "November 20, 2024",
    author: "YatriKuti Team",
  },
  {
    id: 3,
    title: "Best Vehicles for Road Trips in Nepal",
    image: "https://images.unsplash.com/photo-1591519924849-fc8da3e9b2ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWR2ZW50dXJlJTIwYmlrZXxlbnwwfHwwfHx8MA%3D%3D",
    content: "Planning a road trip in Nepal? Consider SUVs like the Toyota Land Cruiser or Mahindra Scorpio for their reliability on rough terrains. For smaller trips, scooters or bikes like the Honda Dio or Royal Enfield can provide a thrilling experience...",
    date: "November 15, 2024",
    author: "YatriKuti Team",
  },
];

const BlogDetailsPage = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const blog = blogData.find((b) => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        Blog not found! <Link to="/blog" className="text-blue-500">Go back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-12 pt-20"> {/* Added pt-20 to provide space for the Navbar */}
      <Navbar />
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 text-sm mb-6">
        {blog.date} | By {blog.author}
      </p>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      <p className="text-lg text-gray-300 leading-relaxed">{blog.content}</p>
      <Link to="/blog" className="mt-8 inline-block text-blue-500 hover:underline">
        Back to Blog
      </Link>
      <Footer />
    </div>
  );
};

export default BlogDetailsPage;
