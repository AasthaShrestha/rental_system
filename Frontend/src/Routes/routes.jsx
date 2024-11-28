import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Rooms from "../pages/Rooms";
import Vehicles from "../pages/Vehicles";
import Login from "../components/Login";
import PostFree from "../pages/PostFree";
import SignUp from "../components/SignUp.jsx";
import SinglePost from "../components/SinglePost.jsx";
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
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <Error />,
  },
  // {
  //   path: "/chatsection",
  //   element: <ChatSection />,
  //   errorElement: <Error />,
  // },
]);

export default router;
