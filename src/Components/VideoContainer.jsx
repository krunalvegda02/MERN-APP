import React from "react";

function VideoContainer({ src, title, thumbnail, createdAt, views, owner }) {
  return (
    <div className="w-1/4 p-2">
      {/* Image Container */}
      <div className="relative w-full  pb-[56.25%] overflow-hidden rounded-md">
        <img
          src={src}
          alt={thumbnail}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="mt-2">
        {/* Title */}
        <div className="text-white font-semibold text-sm truncate flex">
          {title}
        </div>

        {/* Views and Created At */}
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <div>{views}</div>
          <div>{createdAt}</div>
        </div>

        {/* Creator Info */}
        <div className="mt-2 text-xs text-gray-300 flex">{owner}</div>
      </div>
    </div>
  );
}

export default VideoContainer;
