import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import list from "../list.json";
import Cards from "./Cards";
import { Link } from "react-router-dom";

function Featured() {
  const filterData = list.filter((data) => data.category === "Featured");

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    arrows: false, // Disable arrows on mobile for a cleaner look
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false, // Simplify for smaller screens
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
          Featured Rooms & Vehicles
        </h1>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
          Discover the most popular rooms and vehicles tailored just for you,
          with comfort and style at every step.
        </p>
      </div>
      <div className="slider-container relative">
        <Slider {...settings}>
          {filterData.map((item) => (
            <div key={item.id} className="px-2 sm:px-4">
              <Link to={`/post/${item.id}`}>
                <Cards item={item} />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Featured;
