import React from "react";
import { Avatar } from "../index";
function UserCard() {
  return (
    <div className="m-2">
      <div className="flex">
        <Avatar h={50} w={50} />{" "}
        <div className="text-left text-white">
          <p className=" text-lg pl-2"> {"username"}</p>
          <div className="flex pl-2 text-gray-400 text-xs ">
            <p>{100} Subscribers</p> <p className="px-1"> ● </p>{" "}
            <p>{20} Subscribed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
