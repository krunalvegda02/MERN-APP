import React, { useState } from "react";
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

function MyProfileComponent({ isUser = true }) {
  const userdata = useSelector((state) => state.userData);
  const [pageState, setPageState] = useState(1); // Default active menu: Videos

  {
    if (!isUser) {
      axios
        .get(`/api/v1/c/:username`)
        .then((res) => {
          console.log("API RESPONSE:", res);
        })
        .catch((err) => {
          message.error("Channel fetching error", err);
          console.log("API ERROR:", err);
        });
    }
  }

  return (
    <div>
      {/* Header cover image */}
      <div className="h-[100px] bg-white w-full">
        <img
          src={isUser ? userdata.coverImage : res.data.data.coverImage}
          // "https://tse1.mm.bing.net/th?id=OIP.ExnS3_PBvo0jK-W75PxmEwHaEK&pid=Api&P=0&h=180"
          alt="coverimage"
          className="object-cover h-36 w-full"
        />
      </div>

      {/* Profile Section */}
      <div className="flex justify-between p-3">
        <div className="flex text-left">
          <Avatar
            h={130}
            w={130}
            src={isUser ? userdata.avatar : res.data.data.avatar}
          />
          <div className="flex-col pt-11 pl-4">
            <p className="text-white text-3xl pb-1 font-semibold">
              {isUser ? userdata.fullname : res.data.data.fullname}
            </p>
            <p className="text-gray-300 text-sm pb-0.5">
              @{isUser ? userdata.username : res.data.data.username}
            </p>
            <div className="flex">
              <p className="text-gray-300 text-sm">{100} Subscribers</p>
              <p className="px-2 text-gray-300 text-sm">●</p>
              <p className="text-gray-300 text-sm">{100} Subscribed</p>
            </div>
          </div>
        </div>
        <Link to="/settings">
          {" "}
          <div className="flex justify-center bg-violet-400 mt-12 mr-5 h-9 pt-1 w-20 rounded-xl hover:bg-violet-500 hover:border duration-300">
            <EditOutlined /> <p className="pl-2 font-medium text-lg">Edit</p>
          </div>
        </Link>
      </div>

      {/* Menu Bar */}
      <div className="flex text-white justify-evenly border-b-2 border-gray-500 pb-2 mt-2">
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
      <div className="mt-2">
        {pageState === 1 && <ProfileVideos />}
        {pageState === 2 && <ProfilePlaylist />}
        {pageState === 3 && <ProfileTweets />}
        {pageState === 4 && <ProfileFollowing />}
      </div>
    </div>
  );
}

export default MyProfileComponent;
