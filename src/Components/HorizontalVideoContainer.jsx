import React, { useEffect, useState } from "react";
import { Avatar } from "../index";
import axios from "axios";
import { message } from "antd";

function HorizontalVideoContainer({ id }) {
  const [video, setVideo] = useState(null);
  const [user, setUser] = useState(null);
  // console.log("id", id);

  useEffect(() => {
    axios
      .get(`/api/v1/videos/${id}`)
      .then((res) => {
        setUser(res.data.data.user);
        // console.log("Playlist Videos:", res.data.data.video);
        setVideo(res.data.data.video);
        // console.log(`Video ${id}`, res.data.data);
      })
      .catch((err) => {
        console.log("Video Fetching Video", err);
        message.error("Error Fetching Videos");
      });
  }, [id]);

  // console.log("video", video);

  if (!video && !user) {
    return null;
  }

  return (
    <div className="flex items-start gap-4 px-3 pt-3  shadow-lg">
      {/* Thumbnail */}
      <div className="w-[300px] h-[143px]">
        <img
          src={video.thumbnail}
          alt={video.thumbnail}
          className="w-[100%] h-full object-cover "
        />
      </div>

      {/* Video Details */}
      <div className="flex-col text-left ">
        <h3 className="text-2xl  text-white font-normal text-ellipsis overflow-hidden whitespace-nowrap  max-w-[330px] mb-2">{video.title}</h3>

        {/* Views and Created At */}
        <div className="flex  text-xs text-gray-400 mt-1 overflow-auto">
          <div> {video.views.length} Views </div>
          <p className="px-3 ">●</p>
          <div> {new Date(video.createdAt).toLocaleDateString()}</div>
        </div>
        <div className="flex">
          <div className="mt-2 mr-2">
            <Avatar w={40} h={40} src={user.avatar} />
          </div>

          <div className="mt-2">
            {/* Creator Info */}
            <div className="mt-2 text-xs text-gray-300 flex">
              {user.username}
            </div>
          </div>
        </div>
        <h3 className="text-xs pt-2  text-white  text-ellipsis overflow-hidden whitespace-nowrap  max-w-[350px]">
          {video.description}
        </h3>
      </div>
    </div>
  );
}

export default HorizontalVideoContainer;
