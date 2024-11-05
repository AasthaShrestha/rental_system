import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Featured from '../components/Featured';

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Featured />
      <Footer />
    </>
  );
}

export default Home