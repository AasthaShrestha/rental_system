import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { AuthUserContext } from "../App"; // Import AuthUserContext

function Navbar() {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useContext(AuthUserContext); // Access authUser and setAuthUser from context

  const handleLoginClick = () => {
    navigate("/login");
  };

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-pink-500 font-bold border-b-2 border-pink-500"
              : "text-black hover:text-gray-300 transition duration-300"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/rooms"
          className={({ isActive }) =>
            isActive
              ? "text-pink-500 font-bold border-b-2 border-pink-500"
              : "text-black hover:text-gray-300 transition duration-300"
          }
        >
          Rooms
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/vehicles"
          className={({ isActive }) =>
            isActive
              ? "text-pink-500 font-bold border-b-2 border-pink-500"
              : "text-black hover:text-gray-300 transition duration-300"
          }
        >
          Vehicles
        </NavLink>
      </li>
      <li>
        <button className="flex items-center space-x-1 text-black hover:text-gray-300 transition duration-300">
          <FaPlus />
          <span>Post for free</span>
        </button>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 px-4">
      <div className="flex items-center justify-between w-full">
        <div className="navbar-start flex items-center space-x-4">
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost">
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
              className="menu menu-sm dropdown-content bg-white rounded-box mt-3 w-52 p-2 shadow z-[1]"
            >
              {navItems}
            </ul>
          </div>
          <a className="text-2xl font-bold text-pink-600 cursor-pointer">
            YatriKuti
          </a>
        </div>

        <div className="flex flex-1 justify-start lg:w-1/3">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full max-w-sm lg:w-96 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
          />
        </div>

        <div className="navbar-end hidden lg:flex items-center space-x-4">
          <ul className="menu menu-horizontal px-1 space-x-4">{navItems}</ul>
        </div>

        <div>
          {!authUser && (
            <button
              onClick={handleLoginClick} // Open modal on click
              className="px-3 py-3 text-white font-semibold bg-gradient-to-r from-pink-500 to-pink-500 rounded-lg shadow-md hover:pink-600 transform transition duration-200 ease-in-out hover:scale-105 flex items-center space-x-2"
            >
              <span>Login</span>
            </button>
          )}
        </div>
        {authUser && (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={authUser?.name} src={"fdsfa.jpg"} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {authUser?.roles?.includes("Admin") && (
                <MenuItem onClick={() => navigate("/dashboard")}>
                  <Typography sx={{ textAlign: "center" }}>
                    Dashboard
                  </Typography>
                </MenuItem>
              )}

              <MenuItem onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: "center" }}>Profile</Typography>
              </MenuItem>

              <MenuItem onClick={handleLogout}>
                <Typography sx={{ textAlign: "center" }}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        )}
      </div>
    </div>
  );
}

export default Navbar;
