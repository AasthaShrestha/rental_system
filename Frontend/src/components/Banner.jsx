import React from "react";
import hero1 from "../assets/hero1.jpg";
function Banner() {
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 mt-0 px-4 flex flex-col md:flex-row my-10 p-0">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <div className="space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold">
              Hello, welcomes here to book something{" "}
              <span className="text-pink-500">new everyday!!!</span>
            </h1>
            <p className="text-sm md:text-xl">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
              et totam. Tempora amet atque expedita, quae corrupti totam sed
              pariatur corporis at veniam est voluptas animi!
            </p>
            <button className="bg-pink-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-pink-600 transition duration-300">
              Get Started
            </button>
          </div>
        </div>
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            src={hero1}
            className="md:w-[550px] md:h-[460px] md:ml-12"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
