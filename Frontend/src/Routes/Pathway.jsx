import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import BrowserRouter, Route, and Routes
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
import {Navigate} from 'react-router'

const queryClient = new QueryClient();
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

// function AdminRoutes() {
//   const { authUser } = useAuthUser();
//   if (authUser.roles.includes("Admin")) return <Outlet />;
//   return <Navigate to="/signup" />;
// }

const Pathway = () => {
  const [authUser, setAuthUser] = useState(getValueFromLocalstorage);

   useEffect(() => {
     localStorage.setItem("authUser", JSON.stringify(authUser));
   }, [authUser]);

  return (
    <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/vehicles" element={<Vehicles />} />

            {/* <Route element={<ProtectedRoutes />}> */}
              <Route path="/postforfree" element={<PostFree />} />
            {/* </Route> */}

            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetailsPage />} />
            <Route path="/objectives" element={<Objectives />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profileDetails" element={<ProfileDetails />} />

            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthUserContext.Provider>
  );
};

export default Pathway;
