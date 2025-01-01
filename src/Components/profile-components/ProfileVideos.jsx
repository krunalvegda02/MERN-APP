import React from "react";
import { MyVideos, GetVideoById } from "../../index";

function ProfileVideos({ isChannel, channelId }) {
  console.log("Chsnnel id", channelId);

  return (
    <div>
      {isChannel ? (
        <GetVideoById userid={channelId}></GetVideoById>
      ) : (
        <MyVideos />
      )}
    </div>
  );
}

export default ProfileVideos;
