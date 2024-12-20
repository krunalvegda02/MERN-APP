import React, { useEffect, useState } from "react";
import { Avatar, Container } from "../../index";
import { useSelector } from "react-redux";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { message } from "antd";
// import { Input } from "antd";

function ProfileTweets({ isChannel}) {
  const userid = useSelector((state) => state.userData._id);
  const [tweets, setTweets] = useState(null);

  // useEffect(() => {
  //   axios.get("api/v1/tweets");
  // }, []);

  const saveTweet = () => {
    // if (!tweet.trim()) {
    //   message.warning("Tweet cannot be empty!");
    //   return;
    // }
    // axios
    //   .post(`/api/v1/tweets`, { userId: userid, content: tweet })
    //   .then(() => {
    //     message.success("Tweet posted successfully!");
    //     setTweet(""); // Clear the input field
    //   })
    //   .catch((err) => {
    //     message.error("Failed to post tweet!");
    //     console.error("Tweet error:", err);
    //   });
  };

  return (
    <>
      <div className="relative w-full border border-gray-300 mb-3 shadow-sm">
        <input
          name="tweet"
          // value={tweet}
          className="w-full h-16 p-2 pb-9 border text-lg text-white border-gray-300  focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-700 pr-16"
          placeholder="Write an Announcement..."
        />
        <button
          className="absolute bottom-2 right-2 h-8 bg-violet-500 hover:bg-red-600 text-white px-4 py-1 shadow-md text-sm rounded"
          onClick={saveTweet}
        >
          Save
        </button>
      </div>

      <div className="flex ml-2 ">
        <Avatar
          h={50}
          w={50}
          src={
            "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
          }
        />
        <div className="flex-col text-white pl-3 text-left">
          <div className="flex items-center">
            <p className="text-lg">username</p>
            <p className="text-gray-400 text-xs ml-4  ">20/11/23</p>
          </div>
          <p className="text-base">
            Content Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Inventore, sequi.
          </p>
          <div className="mt-1">
            <LikeOutlined className="pr-1" />
            {"65"} <DislikeOutlined className="pr-1 pl-2" />
            {"34"}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileTweets;
