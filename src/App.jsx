import "./App.css";
import React from "react";
import Navbar from "./Components/header/Navbar";
import { Outlet } from "react-router-dom";
import LeftNavBar from "./Components/leftNavBar/LeftNavBar";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex-row">
        <LeftNavBar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
