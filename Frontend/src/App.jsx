import React from "react";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Vehicles from "./pages/Vehicles";

function App() {
  return (
    <>
      <Router>
        <div className="dark:bg-slate-900 dark:text-white">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/rooms" element={<Rooms />}></Route>
            <Route path="/vehicles" element={<Vehicles />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
