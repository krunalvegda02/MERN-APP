import { useNavigate } from "react-router-dom";
import { AddVideoToPlaylist, Avatar } from "../index";
import React, { useState } from "react";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { Popover } from "antd";

function VideoContainer({
  videoId,
  title,
  thumbnail,
  createdAt,
  views,
  owner,
  avatar,
}) {
  const [playlistmodal, setplaylistmodal] = useState(false);

  const openAddPlaylistModal = () => {
    setplaylistmodal(true);
  };

  const closeAddPlaylistModal = () => {
    setplaylistmodal(false);
  };

  const navigate = useNavigate();
  const playVideo = () => {
    navigate(`/play-video/${videoId}`);
  };

  const content = (videoId) => (
    <div
      className="flex gap-2 text-white font-semibold"
      onClick={openAddPlaylistModal}
    >
      <PlusOutlined />
      <p>Add Video To Playlist</p>
    </div>
  );

  return (
    <div className="w-1/4 p-2">
      {/* Image Container */}
      <div className="relative w-full pb-[56.25%]">
        <img
          src={thumbnail}
          alt={`Thumbnail for ${title}`}
          onClick={playVideo}
          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
        />
      </div>
      <div className="flex mt-2 gap-3 ">
        {/* Avatar */}
        <div>
          <Avatar w={37} h={37} src={avatar} />
        </div>

        {/* Video Details */}
        <div className="flex-grow">
          {/* Title */}
          <div className="flex items-center justify-between text-white font-semibold text-sm">
            <p   className="truncate max-w-[170px] text-ellipsis whitespace-nowrap">{title}</p>
          </div>

          {/* Views and Created At */}
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <span>{views.length} Views</span>
            <span className="px-1">•</span>
            <span>{moment(createdAt).fromNow()}</span>
          </div>

          {/* Creator Info */}
          <div className="text-xs text-gray-400 text-start mt-1">{owner}</div>
        </div>

        {/* More Options */}
        <div className="flex items-start mt-1">
          <Popover
            content={() => content(videoId)}
            trigger="click"
            color="#1e293b  "
            placement="bottom"
            arrow=""
          >
            <MoreOutlined className="text-lg text-white cursor-pointer" />
          </Popover>
        </div>
      </div>
      {playlistmodal && (
        <AddVideoToPlaylist
          isOpen={playlistmodal}
          onClose={closeAddPlaylistModal}
          VideoId={videoId}
        />
      )}
    </div>
  );
}

export default VideoContainer;
