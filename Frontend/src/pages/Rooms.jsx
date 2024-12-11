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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getRental = async () => {
      try {
        const res = await axios.get("http://localhost:4001/rental");
        console.log("Fetched rentals:", res.data);
        if (res.data.success && Array.isArray(res.data.data)) {
          setRental(res.data.data);
        } else {
          console.log("Unexpected response format:", res.data);
          setError("Unexpected data format from server.");
        }
      } catch (error) {
        console.error("Error fetching rentals:", error.message);
        setError("Failed to fetch rentals. Please try again later.");
      } finally {
        setLoading(false);
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
      <div className="mt-12">
        {loading && <p>Loading rooms...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && filterData.length === 0 && (
          <p>No rooms available at the moment.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-4">
          {!loading &&
            !error &&
            filterData.map((item) => (
              <div key={item.id} className="px-2 sm:px-4">
                <Link to={`/post/${item.id}`}>
                  <Cards item={item} />
                </Link>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Rooms;
