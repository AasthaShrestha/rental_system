import React from "react";
import hero1 from "../assets/main0.jpeg";

function Banner() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-cover">
      <img
        src={hero1}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        alt="hero"
      />
      <div className="relative max-w-screen-2xl container mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center justify-end h-full text-black z-10 -mt-20">
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Hello, welcome to <span className="text-pink-500">YatriKuti!</span>
          </h1>
          <p className="text-base md:text-lg font-bold font-extraligh">
            Whether you're looking for a cozy place to stay or the perfect ride
            for your adventure, we have you covered. Explore our range of rooms
            and vehicles designed to fit your lifestyle and make your journey
            unforgettable.
          </p>
          <button className="bg-pink-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-pink-600 transition duration-300">
            Start your Journey
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
