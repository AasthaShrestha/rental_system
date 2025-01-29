import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "./Cards";
import { Link } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../api/axiosInstance";

function Featured() {
  const [posts, setPosts] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [places, setPlaces] = useState([]);
  const token = localStorage.getItem("token");
  const authUser = localStorage.getItem('authUser');
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/posts/latest"
        );
        if (response.data.success) {
          setPosts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };



    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/suggest/room?numberOfResult=5",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setRooms(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/suggest/vehicle?numberOfResult=5",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setVehicles(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    const fetchPlaces = async () => { // Fetching data from haversine API
      try {
        const response = await axiosInstance.get(
          "http://localhost:4001/api/haversine"
        );
        setPlaces(response.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPosts();
    fetchRooms();
    fetchVehicles();
    fetchPlaces();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      {/* Latest Rooms & Vehicles Section */}
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Latest Rooms & Vehicles
        </h1>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-6">
          Discover the most popular rooms and vehicles tailored just for you,
          with comfort and style at every step.
        </p>
      </div>
      <div className="slider-container relative w-full mb-8 sm:mb-10 lg:mb-12">
        <Slider {...settings}>
          {posts.map((post) => (
            <Link to={`/post/${post._id}`} key={post._id}>
              <Cards post={post} />
            </Link>
          ))}
        </Slider>
      </div>

      {/* Recommended Rooms Section */}
      {authUser !== 'null' &&
        <div className="w-full flex flex-col gap-6 items-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Recommended Rooms
          </h2>
          <div className="slider-container relative w-full">
            <Slider {...settings}>
              {rooms.map((room) => (
                <Link to={`/post/${room._id}`} key={room._id}>
                  <Cards post={room} />
                </Link>
              ))}
            </Slider>
          </div>
        </div>
      }
      {/* Recommended Vehicles Section */}
      {authUser !== 'null' &&
        <div className="w-full flex flex-col gap-6 items-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Recommended Vehicles
          </h2>
          <div className="slider-container relative w-full">
            <Slider {...settings}>
              {vehicles.map((vehicle) => (
                <Link to={`/post/${vehicle._id}`} key={vehicle._id}>
                  <Cards post={vehicle} />
                </Link>
              ))}
            </Slider>
          </div>
        </div>}

      {/* Recommended Places Section */}
      {authUser != 'null' &&
        <div className="w-full flex flex-col gap-6 items-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nearby you
          </h2>
          <div className="slider-container relative w-full">
            <Slider {...settings}>
              {places && places.map((place) => (

                <Link to={`/post/${place._id}`} key={place._id}>
                  <Cards post={place} />
                </Link>
              ))}
            </Slider>
          </div>
        </div>}
    </div>
  );
}

export default Featured;
