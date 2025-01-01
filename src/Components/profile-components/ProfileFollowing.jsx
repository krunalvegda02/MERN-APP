import React, { useEffect, useState } from "react";
import { UserCard } from "../../index";
import axios from "axios";

function ProfileFollowing({ isChannel, channelId, username }) {
  
  console.log("ChannelId:", channelId);
  
  const [followingList, setFollowingList] = useState();

  useEffect(() => {
    axios
      .get(`/api/v1/subscriptions/u/${channelId}`)
      .then((res) => {
        console.log("following list:", res.data);
      })
      .catch((err) => {
        console.log("ChannelId:", channelId);
        console.log("Following list ERR:".err);
      });
  }, []);

  return (
    <div>
      <UserCard username={username} />
    </div>
  );
}

export default ProfileFollowing;
