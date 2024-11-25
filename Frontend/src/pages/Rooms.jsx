import React from "react";
import Navbar from "../components/Navbar";
import main1 from "../assets/masterRoom.webp";
import Flex from "../components/Flex";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import list from "../list.json";
import { Link } from "react-router-dom";

function Rooms() {
  const filterData = list.filter((data) => data.type === "rooms");
  return (
    <div>
      <Navbar />
      <Flex
        title="Our Rooms"
        subtitle="Eperience Comfort with our services."
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
