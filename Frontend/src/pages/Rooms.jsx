import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Flex from "../components/Flex";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import main1 from "../assets/masterRoom.webp";
import axios from "axios";

function Rooms() {
  const [rental, setRental] = useState([]);

  useEffect(() => {
    const getRental = async () => {
      try {
        const res = await axios.get("http://localhost:4001/rental");
        console.log("Fetched rentals:", res.data);
        if (res.data.success && Array.isArray(res.data.data)) {
          setRental(res.data.data);
        } else {
          console.log("Unexpected response format:", res.data);
          setRental([]);
        }
      } catch (error) {
        console.log("Error fetching rentals:", error.message);
        setRental([]);
      }
    };
    getRental();
  }, []);

  const filterData = Array.isArray(rental)
    ? rental.filter((data) => data.type === "rooms")
    : [];

  return (
    <div>
      <Navbar />
      <Flex
        title="Our Rooms"
        subtitle="Experience Comfort with our services."
        image={main1}
        children="Back"
      />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
        {filterData.map((item) => (
          <div key={item.id} className="px-2 sm:px-4">
            <Link to={`/post/${item.id}`}>
              <Cards item={item} />
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Rooms;
