import React from "react";
import { Avatar } from "../index";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function NavbarUserDetails() {
  const username = useSelector((state) => state.userData.username);
  const fullname = useSelector((state) => state.userData.fullname);
  const avatar = useSelector((state) => state.userData.avatar);

  return (
    <div className="flex">
      <div className="flex-col text-white mr-3">
        <p className="text-sm text-right ">{fullname}</p>
        <p className="text-base text-right text-gray-400">@{username}</p>
      </div>
      <Link to="/edit-profile">
        <Avatar src={avatar} h={45} w={45} />
      </Link>
    </div>
  );
}

export default NavbarUserDetails;
