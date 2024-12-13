import React from "react";
import Logo from "../Logo/Logo";
import SearchBox from "../SearchBox";

function Navbar() {
  return (
    <div className="flex  justify-between align-middle w-full bg-red-200 p-[0.20rem]  pr-2 pl-2">
      <div>LOGO</div>

      <SearchBox placeholder={"Search Users...!"}></SearchBox>

      <div>BUtton</div>
    </div>
  );
}

export default Navbar;
