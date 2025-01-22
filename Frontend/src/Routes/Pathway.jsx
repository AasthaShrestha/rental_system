import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from "../pages/Error.jsx";
import Home from "../pages/Home.jsx";
import Rooms from "../pages/Rooms.jsx";
import Vehicles from "../pages/Vehicles.jsx";
import PostFree from "../pages/PostFree.jsx";
import ProfileDetails from "../components/ProfileDetailPage.jsx";
import AboutUs from "../pages/AboutUs.jsx";
import Objectives from "../components/Objectives.jsx";
import ContactUs from "../pages/ContactUs.jsx";
import Blog from "../pages/Blog.jsx";
import BlogDetailsPage from "../pages/BlogDetailsPage.jsx";
import Profile from "../components/Profile.jsx";
import SinglePost from "../components/SinglePost.jsx";
import LogIn from "../pages/Login.jsx";
import SignUp from "../pages/SignUp.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect, createContext, useContext } from "react";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import DashboardRooms from "../pages/dashboard/DashboardRooms.jsx";
import { Outlet } from "react-router-dom";
import DashboardVehicle from "../pages/dashboard/DashboardVehicle.jsx";
import Kyc from '../pages/Kyc.jsx'
import DashboardKyc from '../pages/dashboard/DashboardKyc.jsx';
import DashboardExpiredRentals from "../pages/dashboard/DashboardRenewal.jsx";
import DashboardQuery from "../pages/dashboard/DashboardQuery.jsx";
// import ValidUserForm from "../components/Validuserform.jsx";


const AuthUserContext = createContext(null);

export const useAuthUser = () => {
  return useContext(AuthUserContext);
};

const getValueFromLocalstorage = () => {
  const authUser = localStorage.getItem("authUser");
  console.log(typeof authUser, authUser);
  return authUser ? JSON.parse(authUser) : null;
};

// function ProtectedRoutes() {
//   const { authUser } = useAuthUser();
//   if (!authUser) return <Navigate to="/login" />;
//   return <Outlet />;
// }

function AdminRoutes() {
  const { authUser } = useAuthUser();
  if (authUser.roles.includes("Admin")) return <Outlet />;
  return <Navigate to="/login" />;
}

function Pathway() {
  const [authUser, setAuthUser] = useState(getValueFromLocalstorage);

  useEffect(() => {
    localStorage.setItem("authUser", JSON.stringify(authUser));
  }, [authUser]);

  return (
    <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
      
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/vehicles" element={<Vehicles />} />
            {/* <Route path="/validuserform" element={<ValidUserForm />} /> */}
            {/* <Route element={<ProtectedRoutes />}> */}
            <Route path="/postforfree" element={<PostFree />} />
            {/* </Route> */}

            <Route element={<AdminRoutes />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<h2>Dashboard section</h2>} />
                <Route path="rooms" element={<DashboardRooms />} />
                <Route path="vehicles" element={<DashboardVehicle />} />
                <Route path="kycs" element = {<DashboardKyc/>} />
                <Route path="expiredRentals" element = {<DashboardExpiredRentals/>} />
                <Route path="userquery" element = {<DashboardQuery/>} />
              </Route>
            </Route>

            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetailsPage />}/>
            <Route path="/objectives" element={<Objectives />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profileDetails" element={<ProfileDetails />} />
            <Route path="/kyc" element={<Kyc/>} />

            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
    </AuthUserContext.Provider>
  );
}

export default Pathway;
