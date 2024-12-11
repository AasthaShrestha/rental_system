import React from "react";
import { Link } from "react-router-dom";

export default function Flex({ children, title, subtitle, image }) {
  return (
    <div className="relative w-full h-screen bg-cover bg-center overflow-hidden">
      {/* Background Image */}
      <img
        src={image}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-80"
        alt="background"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70 -z-10"></div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full text-center space-y-8 px-4 md:px-8">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-wider leading-tight shadow-md drop-shadow-2xl animate-fade-in-up">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl lg:text-3xl text-gray-200 font-light max-w-4xl tracking-wide animate-fade-in-up delay-200">
          {subtitle}
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-12 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-110 transform transition duration-300 animate-fade-in-up delay-400"
        >
          {children}
        </Link>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 w-full text-center">
        <p className="text-sm text-gray-300 animate-bounce">
          Scroll down for more &darr;
        </p>
      </div>
    </div>
  );
}
