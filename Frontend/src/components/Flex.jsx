import React from "react";
import { Link } from "react-router-dom";

export default function Flex({ children, title, subtitle, image }) {
  return (
    <div className="relative w-full h-screen bg-cover bg-center">
      {/* Background Image */}
      <img
        src={image}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        alt="background"
      />    
    
      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6 px-4 md:px-8">
        {/* Title */}
        <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-wide leading-tight drop-shadow-lg">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl text-white font-light max-w-2xl">
          {subtitle}
        </p>

        {/* Button */}
        <Link 
          to="/"
          className="inline-block bg-pink-600 text-white py-3 px-10 rounded-full text-lg font-medium shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
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
