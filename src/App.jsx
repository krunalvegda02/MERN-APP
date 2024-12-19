import "./App.css";
import Navbar from "./Components/header/Navbar";
import { Outlet } from "react-router-dom";
import LeftNavBar from "./Components/leftNavBar/LeftNavBar";
import FloatingActionButton from "./Components/FAB/FloatingActionButton";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex-row">
        <LeftNavBar />
        <Outlet />
        <FloatingActionButton />
      </div>
    </>
  );
}

export default App;
