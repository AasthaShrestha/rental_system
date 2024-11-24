import React, { useState } from "react";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer"; 
import image from "../assets/yatrikuti.jpg";
import Objectives from "../components/Objectives";
const AboutUs = () => {
  const [showMore, setShowMore] = useState(false); // State to toggle the "Learn More" content

  const handleLearnMoreClick = () => {
    setShowMore(!showMore); 
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center bg-gray-100 pt-20"> 
        <div className="max-w-7xl w-full flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Left Column - Text Section */}
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <h1 className="text-5xl font-bold text-purple-600 mb-4">ABOUT US</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed
              mauris commodo erat rutrum tincidunt. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Nulla odio sed vehicula. Integer in
              imperdiet ante.
            </p>
            <button
              onClick={handleLearnMoreClick}
              className="bg-pink-600 text-white px-6 py-3 rounded hover:bg-pink-700"
            >
              {showMore ? "Show Less" : "Learn More"} {/* Toggle button text */}
            </button>

            {/* Additional Content (only visible when showMore is true) */}
            {showMore && (
              <div className="mt-6 text-gray-600">
                <h2 className="text-3xl font-semibold text-purple-600 mb-4">Our Story</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ullamcorper nisl at enim
                  efficitur, vel tempus felis varius. Vestibulum ante ipsum primis in faucibus orci luctus
                  et ultrices posuere cubilia curae; Sed fringilla, mi vel tincidunt malesuada, ligula urna
                  interdum odio, sed volutpat nunc metus id libero. Nam sit amet mauris neque.
                </p>
                <ul className="mt-4">
                  <li>• We started in 2005 with a vision to improve customer experience.</li>
                  <li>• Our team consists of experts in the field with decades of combined experience.</li>
                  <li>• We are committed to sustainability and community impact.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Right Column - Image Section */}
          <div className="md:w-1/2">
            <img
              src={image}
              alt="Services"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
            <Objectives/>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
