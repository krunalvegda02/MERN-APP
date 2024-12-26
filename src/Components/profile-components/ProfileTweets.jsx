import React, { useEffect, useState } from "react";
import { Avatar, Container, Loading } from "../../index";
import { useSelector } from "react-redux";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { message } from "antd";
import axios, { all } from "axios";
// import { Input } from "antd";

function ProfileTweets({ isChannel, userid }) {
  const userId = userid || useSelector((state) => state.userData._id);
  const [formTweet, setFormTweet] = useState(null);
  const [alltweets, setallTweets] = useState(null);

  useEffect(() => {
    axios
      .get(`api/v1/tweets/user/${userid}`)
      .then((res) => {
        console.log("res", res.data.data);
        setallTweets(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const getAlltweets = () => {
    axios
      .get(`api/v1/tweets/user/${userid}`)
      .then((res) => {
        console.log("res", res.data.data);
        setallTweets(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const saveTweet = (tweet) => {
    if (!tweet.trim()) {
      message.warning("Tweet cannot be empty!");
      return;
    }
    axios
      .post(`/api/v1/tweets`, { userId: userId, content: tweet })
      .then(() => {
        message.success("Tweet posted successfully!");
        setFormTweet("");
        getAlltweets();
      })
      .catch((err) => {
        message.error("Failed to post tweet!");
      });
  };

  if (!alltweets) {
    return <Loading />;
  }

  return (
    <>
      <div className="relative w-full border border-gray-300 mb-3 shadow-sm">
        <input
          name="tweet"
          value={formTweet || ""}
          onChange={(e) => setFormTweet(e.target.value)}
          className="w-full h-16 p-2 pb-9 border text-lg text-white border-gray-300  focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-700 pr-16"
          placeholder="Write an Announcement..."
        />
        <button
          className="absolute bottom-2 right-2 h-8 bg-violet-500 hover:bg-red-600 text-white px-4 py-1 shadow-md text-sm rounded"
          onClick={() => saveTweet(formTweet)}
        >
          Save
        </button>
      </div>

      <div>
        {alltweets.map((tweet) => {
          return (
            <div className="flex ml-2 mt-3 " key={tweet._id}>
              <Avatar h={50} w={50} src={tweet.ownerDetails.avatar} />
              <div className="flex-col text-white pl-3 text-left">
                <div className="flex items-center">
                  <p className="text-sm text-gray-400 ">
                    {tweet.ownerDetails.username}
                  </p>
                </div>
                <p className="text-base">{tweet.content}</p>
                <div className="mt-1 text-sm text-gray-300">
                  <LikeOutlined className="pr-1" />
                  {"344"}
                  <DislikeOutlined className="pr-1 pl-2" />
                  {"344"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ProfileTweets;
