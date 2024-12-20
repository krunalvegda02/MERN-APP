import React from "react";
import { Container } from "../../index";

function ProfilePlaylist({ isChannel }) {
  return (
    <div>
      <div className="w-[32.60%]   relative">
        <img
          src={
            "https://limitlessneurolab.com/wp-content/uploads/2024/03/bg-blur-tailwind-1024x585.png"
          }
          alt="PlayListimage"
          className="h-48"
        />
        <div className="flex justify-between  px-4  absolute bottom-0 backdrop-blur w-full h-14">
          <div className=" text-white text-left  text-sm pt-2">
            <p>PLaylist</p>
            <div className="flex text-xs pt-1">
              <p>{100} Views</p> <p className="px-3"> ● </p> <p>{"20/11/20"}</p>
            </div>
          </div>
          <div className="text-white text-sm pt-3 ">{38} Videos</div>
        </div>
      </div>
      {/* description */}
      <div className="w-[32.60%] text-left p-1 text-white">
        <p className=" text-lg">{"hey trnrevnenfejnv njeksvdnj"}</p>
        <p className="text-xs text-gray-500">{"efjsdbjsbvuisdbvjds bjd"}</p>
      </div>
      
    </div>
  );
}

export default ProfilePlaylist;
