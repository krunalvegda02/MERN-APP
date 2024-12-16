import React from "react";
import AuthButton from "../Buttons/AuthButton";
import SearchBox from "../SearchBox";
import Logo from "../Logo/Logo";

function Navbar() {
  return (
    <div className="flex justify-between align-middle w-full bg-slate-950 p-2 relative">
      <div>
        <Logo />
      </div>

      <SearchBox placeholder={"Search Users...!"}></SearchBox>

      <div>
        <AuthButton />
      </div>

      {/* Add a border with margin using a pseudo-element */}
      <div className="absolute bottom-0 left-0 right-0 border-b border-gray-300 mx-2"></div>
    </div>
  );
}

export default Navbar;
