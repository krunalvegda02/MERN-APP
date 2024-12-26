import React, { useState, useEffect } from "react";
import {
  Avatar,
  ProfileVideos,
  ProfileTweets,
  ProfileFollowing,
  ProfilePlaylist,
} from "../index";
import { useSelector } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { message } from "antd";

function MyProfileComponent({ isChannel = false, username = null }) {
  const userdata = useSelector((state) => state.userData);
  const [pageState, setPageState] = useState(1);
  const [channeldata, setChanneldata] = useState(null);
  const [userId, setUserId] = useState(userdata._id);
  console.log("userId", userId);

  useEffect(() => {
    if (isChannel) {
      axios
        .get(`/api/v1/c/${username}`)
        .then((res) => {
          setChanneldata(res.data.data);
        })
        .catch((err) => {
          message.error("Channel fetching error");
          console.error("API ERROR:", err);
        });
    }
  }, [isChannel]);

  const profileData = isChannel ? channeldata : userdata;

  return (
    <div>
      {/* Header cover image */}
      <div className="h-[100px] bg-white">
        <img
          src={
            profileData.coverImage ||
            "https://tse1.mm.bing.net/th?id=OIP.ExnS3_PBvo0jK-W75PxmEwHaEK&pid=Api&P=0&h=180"
          }
          alt="coverimage"
          className="object-cover h-36 w-full"
        />
      </div>

      {/* Profile Section */}
      <div className="flex justify-between p-3 ">
        <div className="flex text-left">
          <Avatar h={130} w={130} src={profileData.avatar} />
          <div className="flex-col pt-11 pl-4">
            <p className="text-white text-3xl pb-1 font-semibold">
              {profileData.fullname}
            </p>
            <p className="text-gray-300 text-sm pb-0.5">
              @{profileData.username}
            </p>
            <div className="flex">
              <p className="text-gray-300 text-sm">{100} Subscribers</p>
              <p className="px-2 text-gray-300 text-sm">●</p>
              <p className="text-gray-300 text-sm">{100} Subscribed</p>
            </div>
          </div>
        </div>
        <Link to="/edit-profile">
          <div className="flex justify-center bg-violet-400 mt-12 mr-3 h-9 pt-1 w-20 rounded-md hover:bg-violet-500 hover:border duration-300">
            <EditOutlined />
            <p className="pl-2 font-medium text-lg">
              {isChannel ? "Subscribe" : "Edit"}
            </p>
          </div>
        </Link>
      </div>

      {/* Menu Bar */}
      <div className="flex text-white justify-evenly border-b-2 border-gray-500 pb-2 mt-2 mr-3">
        {[
          { id: 1, label: "Videos" },
          { id: 2, label: "Playlist" },
          { id: 3, label: "Tweets" },
          { id: 4, label: "Following" },
        ].map((menu) => (
          <div
            key={menu.id}
            onClick={() => setPageState(menu.id)}
            className={`px-24 py-1  ${
              pageState === menu.id
                ? "bg-violet-400"
                : "hover:bg-violet-200 hover:text-black"
            } duration-100`}
          >
            <p
              className={`inline-block font-semibold text-base ${
                pageState === menu.id ? "text-black " : ""
              }`}
            >
              {menu.label}
            </p>
          </div>
        ))}
      </div>

      {/* Page Content */}
      <div className="mt-2 mr-3">
        {pageState === 1 && <ProfileVideos isChannel={isChannel} />}
        {pageState === 2 && <ProfilePlaylist isChannel={isChannel} />}
        {pageState === 3 && <ProfileTweets isChannel={isChannel} />}
        {pageState === 4 && (
          <ProfileFollowing isChannel={isChannel} channelId={userId} />
        )}
      </div>
    </div>
  );
}

export default MyProfileComponent;
