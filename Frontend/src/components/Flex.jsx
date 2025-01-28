import React from "react";
import { Link } from "react-router-dom";

export default function Flex({ children, title, subtitle, image }) {
  return (
    <div className="relative w-full h-full py-[10rem] bg-cover bg-center overflow-hidden">
      {/* Background Image */}
      <img
        src={image}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-80"
        alt="background"
      />

      
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 "></div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full text-center px-6 md:px-12 space-y-8">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-pink-600 tracking-wide leading-snug md:leading-tight drop-shadow-lg animate-bounce">
          {title}
        </h1>

        {/* Subtitle with enhanced visibility */}
        <p className="text-base sm:text-lg md:text-2xl text-white font-light max-w-3xl leading-relaxed bg-black bg-opacity-50 p-4 rounded-lg drop-shadow-lg">
          {subtitle}
        </p>

        {/* Button */}
        <Link
          to="/"
          className="relative inline-block bg-pink-600 text-white py-3 px-8 sm:px-10 rounded-full text-base sm:text-lg font-medium shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 z-10"
        >
          {children}
        </Link>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-10 w-full text-center">
        <p className="text-sm text-gray-300 animate-bounce">
          Scroll down for more &darr;
        </p>
      </div>
    </div>
  );
}
