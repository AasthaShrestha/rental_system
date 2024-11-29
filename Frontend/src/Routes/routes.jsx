import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Rooms from "../pages/Rooms";
import Vehicles from "../pages/Vehicles";
import PostFree from "../pages/PostFree";

import SinglePost from "../components/SinglePost.jsx";
import AboutUs from "../pages/AboutUs.jsx";
import ContactUs from "../pages/AboutUs.jsx";
import Blog from "../pages/AboutUs.jsx";
import BlogDetailsPage from "../pages/AboutUs.jsx";
import Objectives from "../pages/AboutUs.jsx";
import Search from "../pages/SearchandSort/Search.jsx";
// import SinglePost from "../pages/SinglePost.jsx";
// import ChatSection from "../components/ChatSection.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/post/:id",
    element: <SinglePost />,
    errorElement: <Error />,
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
    path: "/search",
    element: <Search />,
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
  // {
  //   path: "/chatsection",
  //   element: <ChatSection />,
  //   errorElement: <Error />,
  // },
]);

export default router;
