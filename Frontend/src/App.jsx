import React from "react";
import {RouterProvider} from "react-router-dom";
import router from "./Routes/routes";
import Esewa from "./pages/esewa";

function App() {
  return (
    <>
      {/* <RouterProvider router={router}/> */}
      <Esewa/>
    </>
  );
}

export default App;
