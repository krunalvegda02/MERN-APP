import React, { useEffect, useState } from "react";
import { UserCard, Loading } from "../../index";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";

function ProfileFollowing({ isChannel, channelId, username }) {
  console.log("ChannelId:", channelId);

  const [followingList, setFollowingList] = useState();

  useEffect(() => {
    axios
      .get(`/api/v1/subscriptions/u/${channelId}`)
      .then((res) => {
        console.log("following list:", res.data);
        setFollowingList(res.data.data);
      })
      .catch((err) => {
        console.log("ChannelId:", channelId);
        console.log("Following list ERR:".err);
      });
  }, []);

  if (!followingList) {
    return <Loading />;
  }

  if (followingList.length == 0) {
    return (
      <div className=" pt-10">
        <div>
          <UserOutlined className="border p-3 bg-violet-300 text-4xl rounded-full" />
        </div>
        <p className="text-white text-2xl pt-2">Channel Does not Follow any User</p>
      </div>
    );
  }

  return (
    <div>
      {followingList.length > 0 &&
        followingList.map((following) => {
          return (
            <div key={following._id}>
              <UserCard username={following.username} />
            </div>
          );
        })}
    </div>
  );
}

export default ProfileFollowing;
