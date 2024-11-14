import React from 'react'
import Navbar from '../components/Navbar';
import main1 from "../assets/main1.jpeg";
import Flex from '../components/Flex';
import { Link } from 'react-router-dom';

function Rooms() {
  return (
    <div>
      <Navbar />
      <Flex
        title="Our Rooms"
        subtitle="Eperience Comfort with our services."
        image={main1}
        children="Back"
      />
         
    </div>
  );
}

export default Rooms