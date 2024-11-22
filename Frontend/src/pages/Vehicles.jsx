import React from 'react'
import Navbar from '../components/Navbar'
import img from '../assets/masterVehicle.webp'
import Flex from '../components/Flex';
import Footer from '../components/Footer';
import list from "../list.json";
import { Link } from 'react-router-dom';
import Cards from '../components/Cards';
function Vehicles() {
  const filterData = list.filter((data) => data.type === "vehicles");
  return (
    <>
      <Navbar />
      <Flex
        title="Our Vehicles"
        subtitle="Eperience Comfort with our services."
        image={img}
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
    </>
  );
}

export default Vehicles;
