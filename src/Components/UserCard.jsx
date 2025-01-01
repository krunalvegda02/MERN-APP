import React, { useEffect, useState } from "react";
import { Avatar, MyProfileComponent, SubscribeBtn } from "../index";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserCard({ username }) {
  // console.log("username", username);
  const [channelData, setChannelData] = useState();
  const navigate = useNavigate();

  const profileOpen = () => {
    const isChannel = true;
    navigate(`/profile/${username}/${false}`);
  };

  useEffect(() => {
    axios
      .get(`/api/v1/users/c/${username}`)
      .then((res) => {
        console.log("USER CARD:", res.data.data);
        setChannelData(res.data.data);
      })
      .catch((err) => {
        console.log("USER CARD ERR", err);
      });
  }, [username]);

  if (!channelData) {
    return null;
  }
  return (
    <div className="m-2 ">
      <div className="flex ">
        <div
          onClick={() => {
            profileOpen();
          }}
        >
          <Avatar src={channelData.avatar} h={45} w={45} />
        </div>

        <div className="text-left text-white">
          <p className=" text-lg pl-2"> {channelData.username}</p>
          <div className="flex pl-2 text-gray-400 text-xs mr-7 ">
            <p>{channelData.subscriberCount} Subscribers</p>
            <p className="px-1"> ● </p>
            <p>{channelData.channelsSubscribedToCount} Subscribed</p>
          </div>
        </div>
        <div className="pt-2">
          <SubscribeBtn
            isSubscribed={channelData.isSubscribed}
            channelId={channelData._id}
          />
        </div>
      </div>
    </div>
  );
}

export default UserCard;
