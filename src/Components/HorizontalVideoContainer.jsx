import React from "react";
import { Avatar } from "../index";

function HorizontalVideoContainer({
  src,
  title,
  thumbnail,
  createdAt,
  views,
  owner,
  description
}) {
  return (
    <div className="flex items-start gap-4 px-3 pt-4  shadow-lg">
      {/* Thumbnail */}
      <div className="w-1/4 h-[143px]">
        <img
          src={thumbnail}
          alt={thumbnail}
          className="w-full h-full object-cover "
        />
      </div>

      {/* Video Details */}
      <div className="flex-col text-left ">
        <h3 className="text-2xl  text-white font-bold mb-2">{title}</h3>

        {/* Views and Created At */}
        <div className="flex  text-xs text-gray-400 mt-1 overflow-auto">
          <div> {views.length} Views </div>
          <p className="px-3 ">●</p>{" "}
          <div> {new Date(createdAt).toLocaleDateString()}</div>
        </div>
        <div className="flex">
          <div className="mt-2 mr-2">
            <Avatar w={40} h={40} />
          </div>

          <div className="mt-2">
            {/* Creator Info */}
            <div className="mt-2 text-xs text-gray-300 flex">{owner}</div>
          </div>
        </div>
        <h3 className="text-xs pt-2  text-white">{description}</h3>
        {/* Optional video player */}
        {src && (
          <video
            src={src}
            controls
            className="mt-4 rounded-lg w-full max-h-64"
          />
        )}
      </div>
    </div>
  );
}

export default HorizontalVideoContainer;
