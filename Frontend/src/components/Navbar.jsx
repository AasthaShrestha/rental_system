import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
    // const [sticky,setSticky]=useEffect(false)
    // useEffect(()=>{
    //   const handleScroll=()=>{
    //     if(window.scroll>0){
    //       setSticky(true)
    //     }else{
    //       setSticky(false)
    //     }
    //   };
    //   window.addEventListener('scroll',handleScroll);
    //   return()=>{
    //   window.removeEventListener("scroll", handleScroll);
    //   };
    // },[]);
    const navItems = (
      <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/rooms'>Rooms</Link></li>
        <li><Link to='/vehicles'>Vehicles</Link></li>
      </>
    );
  return (
    <>
      <div className={`max-w-screen-2xl container mx-auto md:px-20 px-4 `}>
        <div>
          <div className="navbar bg-base-100">
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  {navItems}
                </ul>
              </div>
              <a className="text-2xl font-bold cursor-pointer">YatriKuti</a>
            </div>
            <div className="navbar-end">
              <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                  <ul className="menu menu-horizontal px-1">
                    {navItems}
                    <li>
                      <a>Post for free</a>
                    </li>
                    <div className="menu menu-vertical px-1">|</div>
                  </ul>
                </ul>
              </div>
              <a className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer">Login</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar