import React from 'react'
import Navbar from '../components/Navbar'
import main0 from "../assets/main0.jpeg";
import Footer from '../components/Footer';
import Featured from '../components/Featured';
import Flex from '../components/Flex';
import Objectives from '../components/Objectives';

function Home() {
  return (
    <>
      <Navbar />
      <Flex
        title="Hello, welcome to Multi Category Rental Platform!"
        subtitle="Multi Category Rental Platform(YatriKuti) provide a wide range of rental services. Real Estate and Vehicles, Real Estate includes: Single Room, Double Room, Flat, House and Vehicles includes: Bike, Car , Escooter and Scooter. "
        image={main0}
        children="Start your Journey"
      />
      <Featured />
      <Objectives/>
      <Footer />
    </>
  );
}

export default Home