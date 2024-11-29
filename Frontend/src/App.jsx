import React from "react";
import {RouterProvider} from "react-router-dom";
import router from "./Routes/routes";
// import Esewa from "./pages/esewa";
// import Search from "./pages/SearchandSort/Search";

function App() {
  return (
    <>
      <RouterProvider router={router}/>
      {/* <Search/> */}
    </>
  );
}

export default App;
