import { useNavigate } from "react-router-dom";
import { Avatar } from "../index";
import React from "react";
import { MoreOutlined } from "@ant-design/icons";
import moment from "moment";

function VideoContainer({
  videoId,
  title,
  thumbnail,
  createdAt,
  views,
  owner,
  avatar,
}) {
  const navigate = useNavigate();
  const playVideo = () => {
    navigate(`/play-video/${videoId}`);
  };

  return (
    <div className="w-1/4 p-2">
      {/* Image Container */}
      <div className="relative w-full  pb-[56.25%]">
        <img
          src={thumbnail}
          alt={thumbnail}
          onClick={playVideo}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex justify-between">
        <div className="mt-2 mr-2">
          <Avatar w={37} h={37} src={avatar} />
        </div>
        <div className="mr-20  mt-2">
          {/* Title */}
          <div className="text-white font-semibold text-sm truncate flex">
            {title}
          </div>

          {/* Views and Created At */}
          <div className="flex items-center w-full text-xs text-gray-500 ">
            <div className="flex text-nowrap">{views.length} Views</div>
            <p className="px-1">•</p>
            <div> {moment(createdAt).fromNow()}</div>
          </div>

          {/* Creator Info */}
          <div className="text-xs text-gray-400 flex">{owner}</div>
        </div>
      </div>
    </div>
  );
}

export default VideoContainer;
