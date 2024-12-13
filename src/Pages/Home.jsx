import React from "react";
import Navbar from "../Components/header/Navbar";
import LeftNavBar from "../Components/leftNavBar/LeftNavBar";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex-row">
        <LeftNavBar />
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
