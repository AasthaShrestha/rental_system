import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Rooms from "../pages/Rooms";
import Vehicles from "../pages/Vehicles";
import PostFree from "../pages/PostFree";
import AboutUs from "../pages/AboutUs.jsx";
import Objectives from "../components/Objectives.jsx";
import ContactUs from "../pages/ContactUs.jsx";
import Blog from "../pages/Blog.jsx";
import BlogDetailsPage from "../pages/BlogDetailsPage.jsx";
// import ProtectedRoute from "../components/modal/ProtectedRoute.jsx";
import SinglePost from "../components/SinglePost.jsx";
import LogIn from "../pages/Login.jsx";
import SignUp from "../pages/SignUp.jsx";
import SuccessPage from "../pages/Esewa/success.jsx";
import FailurePage from "../pages/Esewa/failure.jsx";

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
    element: (
        <PostFree />
    ),
    errorElement: <Error />,
  },
  // {
  //   path: "/search",
  //   element: <Search />,
  //   errorElement: <Error />,
  // },

  {
    path: "/aboutus",
    element: <AboutUs />,
    errorElement: <Error />,
  },
  {
    path: "/contactus",
    element: <ContactUs />,
    errorElement: <Error />,
  },
  {
    path: "/blog",
    element: <Blog />,
    errorElement: <Error />,
  },
  {
    path: "/blog/:id",
    element: <BlogDetailsPage />,
    errorElement: <Error />,
  },
  {
    path: "/objectives",
    element: <Objectives />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <LogIn/>,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <Error />,
  },
  {
    path: "/success",
    element: <SuccessPage/>,
    errorElement: <Error />,
  },
  {
    path: "/failure",
    element: <FailurePage />,
    errorElement: <Error />,
  },
  // {
  //   path: "/profile",
  //   element: <Profile />,
  //   errorElement: <Error />,
  // },
  // {
  //   path: "/profileDetails",
  //   element: <ProfileDetails />,
  //   errorElement: <Error />,
  // },
]);

export default router;
