import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Rooms from "../pages/Rooms";
import Vehicles from "../pages/Vehicles";
import PostFree from "../pages/PostFree";
import LoginWithModal from "../components/modal/loginmodal.jsx";
import SignUpWithModal from "../components/modal/signupmodal.jsx";
import ProfileDetails from "../components/ProfileDetailPage.jsx";
import Profile from "../components/profile.jsx";
import PostDetails from "../components/PostDetails.jsx";
import AboutUs from "../pages/AboutUs.jsx";
import Objectives from "../components/Objectives.jsx";
import ContactUs from "../pages/ContactUs.jsx";
import Blog from "../pages/Blog.jsx";
import BlogDetailsPage from "../pages/BlogDetailsPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path:"/post/:id",
    element:<PostDetails/>,
    errorElement:<Error/>
  },
  {
    path: "/rooms",
    element: <Rooms />,
    errorElement: <Error />,
  },
  {
    path: "/vehicles",
    element: <Vehicles />,
    errorElement: <Error />,
  },
  {
    path: "/postforfree",
    element: <PostFree />,
    errorElement: <Error />,
  },
  {
    path: "/loginmodal",
    element: <LoginWithModal />,
    errorElement: <Error />,
  },
  {
    path: "/signupmodal",
    element: <SignUpWithModal />,
    errorElement: <Error />,
  },
  {
    path: "/Profile",
    element: <Profile />,
    errorElement: <Error />,
  },
  {
    path: "/ProfileDetailPage",
    element: <ProfileDetails />,
    errorElement: <Error />,
  },
  {
    path: "/aboutus",
    element: <AboutUs/>,
    errorElement: <Error />,
  },
  {
    path: "/contactus",
    element: <ContactUs/>,
    errorElement: <Error />,
  },
  {
    path: "/blog",
    element: <Blog/>,
    errorElement: <Error />,
  }, {
    path: "/blog/:id",
    element: <BlogDetailsPage/>,
    errorElement: <Error />,
  },
  {
    path: "/objectives",
    element: <Objectives/>,
    errorElement: <Error />,
  },
]);

export default router;
