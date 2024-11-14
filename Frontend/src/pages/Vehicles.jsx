import React from 'react'
import Navbar from '../components/Navbar'
import img from '../assets/img0.webp'
import Flex from '../components/Flex';
function Vehicles() {
  return (
    <>
      <Navbar />
      <Flex
        title="Our Vehicles"
        subtitle="Eperience Comfort with our services."
        image={img}
        children="Back"
      />
      
    </>
  );
}

export default Vehicles