import React, { useState } from "react";
import { Avatar } from "../index";
import { useSelector } from "react-redux";
import { EditOutlined } from "@ant-design/icons";

function MyProfileComponent() {
  const userdata = useSelector((state) => state.userData);
  const[pageState, setPageState] = useState(1);

  const openVideos = () => {
    setPageState(1);
  };
  const openPlaylist = () => {
    setPageState(2);
  };
  const openTweets = () => {
    setPageState(3);
  };
  const openFollowing = () => {
    setPageState(4);
  };

  return (
    <div>
      {/* header cover image */}
      <div className="h-[100px] bg-white w-full ">
        <img
          src="https://tse1.mm.bing.net/th?id=OIP.ExnS3_PBvo0jK-W75PxmEwHaEK&pid=Api&P=0&h=180"
          alt="coverimage"
          className="object-cover h-36 w-full"
        />
      </div>
      {/* My Profile and edit */}
      <div className="flex justify-between p-3 ">
        <div className="flex text-left">
          <Avatar h={130} w={130} src={userdata.avatar} />
          {/* USER DETAILS CONTAINER */}
          <div className="flex-col  pt-11 pl-4">
            <p className="text-white text-3xl pb-1 font-semibold">
              {userdata.fullname}
            </p>
            <p className="text-gray-300 text-sm pb-0.5">@{userdata.username}</p>
            <div className="flex">
              <p className="text-gray-300 text-sm">{100} Subscribers</p>
              <p className="px-2 text-gray-300 text-sm">●</p>
              <p className="text-gray-300 text-sm">{100} Subscribed</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center bg-violet-400 mt-12 mr-5 h-9 pt-1 w-20 rounded-xl hover:bg-violet-500 hover:border duration-300">
          <EditOutlined /> <p className="pl-2 font-medium text-lg  ">Edit</p>
        </div>
      </div>
      {/* menu slider */}
      <div className="flex text-white justify-evenly border-b-violet-500  mt-2 border-b-2 border-gray-500 pb-2">
        <div onclicl={openVideos}>
          <p className=" px-24 py-1 font-semibold text-base  hover:bg-violet-400 hover:text-black duration-100">
            Videos
          </p>
        </div>
        <div onclicl={openPlaylist}>
          <p className=" px-24 py-1 font-semibold text-base hover:bg-violet-400 hover:text-black duration-100">
            Playlist
          </p>
        </div>
        <div onclicl={openTweets}>
          <p className=" px-24 py-1 font-semibold text-base hover:bg-violet-400 hover:text-black duration-100">
            Tweets
          </p>
        </div>
        <div onclicl={openFollowing}>
          <p className=" px-24 py-1 font-semibold text-base hover:bg-violet-400 hover:text-black hover:border-b-violet-700 duration-100">
            Following
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyProfileComponent;
