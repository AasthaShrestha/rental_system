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
        title="Hello, welcome to YatriKuti!"
        subtitle="Whether you're looking for a cozy place to stay or the  perfect ride for your adventure, we have you covered. Explore our range of rooms and vehicles designed to fit your lifestyle and make your journey
        unforgettable."
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