import React from "react";
import { LikeOutlined } from "@ant-design/icons";

function LeftNavbarItemBox({ icon, name }) {
  return (
    <div className="flex mx-2 my-1  ">
      <div className="border border-white pl-3 pt-1  w-[245px] h-10 flex bg-transparent hover:bg-violet-400  duration-300  ">
        <div>{icon}</div>
        <div className="flex  text-white text-base font-semibold hover:text-black hover:text-xl duration-300">{name}</div>
      </div>
    </div>
  );
}

export default LeftNavbarItemBox;
// className="text-2xl px-2 text-white
