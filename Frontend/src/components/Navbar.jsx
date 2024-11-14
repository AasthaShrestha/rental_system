import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/rooms">Rooms</Link>
      </li>
      <li>
        <Link to="/vehicles">Vehicles</Link>
      </li>
      <li>
        <Link to="/postforfree">Post for free</Link>
      </li>
    </>
  );

  return (
    <div
      className={`max-w-screen-2xl mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 
        ${
          sticky
            ? "bg-base-200 shadow-md transition duration-300"
            : "bg-base-100"
        } 
        dark:bg-slate-800 dark:text-white`}
    >
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-[1]"
            >
              {navItems}
            </ul>
          </div>
          <a className="text-2xl font-bold cursor-pointer">YatriKuti</a>
        </div>
        <div className="navbar-end  items-center space-x-4 hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">{navItems}</ul>
        </div>
        <div className="navbar-end">
          <Link
           to="/login"
            className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
