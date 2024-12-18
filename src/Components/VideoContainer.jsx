import { Avatar } from "../index";
import React from "react";

function VideoContainer({ src, title, thumbnail, createdAt, views, owner }) {
  const playVideo = () => {};

  return (
    <div className="w-1/4 p-2" onClick={playVideo}>
      {/* Image Container */}
      <div className="relative w-full  pb-[56.25%]  ">
        <img
          src={thumbnail}
          alt={thumbnail}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex">
        <div className="mt-2 mr-2">
          <Avatar  w={30} h={30} />
        </div>
        <div className="mt-2">
          {/* Title */}
          <div className="text-white font-semibold text-sm truncate flex">
            {title}
          </div>

          {/* Views and Created At */}
          <div className="flex justify-between text-xs text-gray-400 mt-1 overflow-auto">
            <div>{views || 0} Views</div>
            <p className="px-1">●</p> <div>{createdAt}</div>
          </div>

          {/* Creator Info */}
          <div className="mt-2 text-xs text-gray-300 flex">{owner}</div>
        </div>
      </div>
    </div>
  );
}

export default VideoContainer;
