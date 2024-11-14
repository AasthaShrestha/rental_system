import React from "react";
import { Link } from "react-router-dom";

export default function Flex({ children, title, subtitle,image }) {
  return (
    <>
      <div className=" relative w-full h-screen overflow-hidden bg-cover">
        <img
          src={image}
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          alt="background"
        />
        <div className="flex flex-col mt-60 items-center justify-center text-center space-y-4  p-8 bg-opacity-60 bg-orange-200 rounded-lg shadow-md">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {title}
          </h1>
          <div className="w-60 h-px bg-gray-400"></div>
          <p className="text-base md:text-lg font-extralight">{subtitle}</p>
          <Link
            to="/"
            className="bg-pink-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-pink-600 transition duration-300"
          >
            {children}
          </Link>
        </div>
      </div>
    </>
  );
}
