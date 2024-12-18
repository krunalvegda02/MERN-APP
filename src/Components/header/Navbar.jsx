import React from "react";
import AuthButton from "../Buttons/AuthButton";
import SearchBox from "../SearchBox";
import Logo from "../Logo/Logo";
import { useSelector } from "react-redux";
import {NavbarUserDetails} from "../../index";

function Navbar() {
  const authenticationStatus = useSelector((state) => state.isAuthenticated);

  return (
    <div className="fixed flex justify-between items-center w-full bg-slate-950 p-1 border-b border-gray-300 mx-2">
      {/* Logo Section */}
      <div className="ml-4">
        <Logo />
      </div>

      {/* Search Box */}
      <SearchBox placeholder={"Search Users...!"} />

      {/* Authentication Buttons */}
      <div className="mr-7">
        {authenticationStatus ? <NavbarUserDetails /> : <AuthButton />}
      </div>
    </div>
  );
}

export default Navbar;
