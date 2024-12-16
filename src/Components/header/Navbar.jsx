import React from "react";
import AuthButton from "../Buttons/AuthButton";
import SearchBox from "../SearchBox";
import Logo from "../Logo/Logo";

function Navbar() {
  return (
    <div className="fixed flex justify-between items-center w-full bg-slate-950 p-2 border-b border-gray-300 mx-2 ">
      {/* Logo Section */}
      <div>
        <Logo />
      </div>

      {/* Search Box */}
      <SearchBox placeholder={"Search Users...!"} />

      {/* Authentication Buttons */}
      <div className="mr-5">
        <AuthButton />
      </div>
    </div>
  );
}

export default Navbar;
