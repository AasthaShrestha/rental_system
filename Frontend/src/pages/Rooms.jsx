  // const [rental,setRental] = useState([]);
  // useEffect(()=>{
  //   const getRental = async () => {
  //     try{
  //       const res = await axios.get("http://localhost:4001/rental");
  //       console.log(res.data);
  //       setRental(res.data);
  //     }catch(error){
  //       console.log(error);
  //     }
  //   };
  //   getRental();
  // },[]);

  // const filterData = posts.filter((data) => data.type === "rooms");
  import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import main1 from "../assets/masterRoom.webp";
import Flex from "../components/Flex";
import Footer from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

function Rooms() {
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
    <div>
      <Navbar />
      <Flex
        title="Our Rooms"
        subtitle="Experience Comfort with our services."
        image={main1}
        children="Back"
      />
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {posts.map((item) => (
          <div key={item._id} className="bg-white border rounded-lg shadow-lg p-4">
            <Link to={`/post/${item._id}`}>
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h2 className="font-semibold mt-2">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.address}</p>
              <p className="text-lg font-bold">Rs. {item.price}</p>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Rooms;
