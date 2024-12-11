import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Rooms from "../pages/Rooms";
import Vehicles from "../pages/Vehicles";
import PostFree from "../pages/PostFree";
<<<<<<< HEAD
import ProfileDetails from "../components/ProfileDetailPage.jsx";
=======

>>>>>>> 3de77366e0a1acc4e6a514a340d12a0014012fef
import AboutUs from "../pages/AboutUs.jsx";
import Objectives from "../components/Objectives.jsx";
import ContactUs from "../pages/ContactUs.jsx";
import Blog from "../pages/Blog.jsx";
import BlogDetailsPage from "../pages/BlogDetailsPage.jsx";
<<<<<<< HEAD
import Profile from "../components/Profile.jsx";
// import ProtectedRoute from "../components/modal/ProtectedRoute.jsx";
import SinglePost from "../components/SinglePost.jsx";
import LoginModal from "../components/modal/loginmodal.jsx";
import SignUpModal from "../components/modal/signupmodal.jsx";
import LogIn from "../pages/Login.jsx";
import SignUp from "../pages/SignUp.jsx";
=======
import ProtectedRoute from "../components/modal/ProtectedRoute.jsx";
import SinglePost from "../components/SinglePost.jsx";
>>>>>>> 3de77366e0a1acc4e6a514a340d12a0014012fef

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
<<<<<<< HEAD
  // {
  //   path: "/postforfree",
  //   element: (
  //     <ProtectedRoute>
  //       <PostFree />
  //     </ProtectedRoute>
  //   ),
  //   errorElement: <Error />,
  // },
=======
  {
    path: "/postforfree",
    element: (
      <ProtectedRoute>
        <PostFree />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
  },
>>>>>>> 3de77366e0a1acc4e6a514a340d12a0014012fef
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
    element: <LogIn />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <Error />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <Error />,
  },
  {
    path: "/profileDetails",
    element: <ProfileDetails />,
    errorElement: <Error />,
  },
]);

export default router;
