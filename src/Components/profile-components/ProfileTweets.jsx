import React, { useEffect, useState } from "react";
import { Avatar, Loading } from "../../index";
import { useSelector } from "react-redux";
import {
  LikeOutlined,
  DislikeOutlined,
  MoreOutlined,
  DeleteFilled,
  EditFilled,
} from "@ant-design/icons";
import { message, Modal } from "antd";
import axios from "axios";
import moment from "moment";

function ProfileTweets({ isChannel, channelId }) {
  const userid = channelId;
  console.log("userid", userid);

  const [formTweet, setFormTweet] = useState(null);
  const [alltweets, setallTweets] = useState(null);

  const editTweet = (tweet) => {
    let edit = prompt("Enter a tweet to update", tweet.content);

    if (edit) {
      // console.log("edit", edit);
      axios
        .patch(`/api/v1/tweets/${tweet._id}`, { newContent: edit })
        .then((res) => {
          // console.log("Edit response:", res);
          message.success("Tweet Updated succesfully");
          getAlltweets();
        })
        .catch((err) => {
          console.log("Updating error:", err);
          message.error("Error updating tweet:", err);
        });
    }
  };

  const deleteTweet = (tweet) => {
    Modal.confirm({
      title: "Are you sure you want to delete this tweet?",
      onOk: () => {
        axios
          .delete(`/api/v1/tweets/${tweet._id}`)
          .then(() => {
            message.success("Tweet deleted successfully!");
            getAlltweets();
          })
          .catch((err) => {
            console.error("Error deleting tweet:", err);
            message.error("Failed to delete tweet!");
          });
      },
      onCancel: () => {
        message.info("Tweet deletion canceled.");
      },
    });
  };

  const getAlltweets = () => {
    axios
      .get(`/api/v1/tweets/user/${userid}`)
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
      .post(`/api/v1/tweets`, { userId: userid, content: tweet })
      .then(() => {
        message.success("Tweet posted successfully!");
        setFormTweet("");
        getAlltweets();
      })
      .catch(() => {
        message.error("Failed to post tweet!");
      });
  };

  useEffect(() => {
    getAlltweets();
  }, []);

  if (!alltweets) {
    return <Loading />;
  }

  return (
    <>
      {!isChannel ? (
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
      ) : null}

      <div>
        {alltweets.map((tweet) => {
          return (
            <div className="flex ml-2 mt-3 " key={tweet._id}>
              <div className="flex ">
                <Avatar h={50} w={50} src={tweet.owner.avatar} />
                <div className="flex-col text-white pl-3 text-left">
                  <div className="flex items-center">
                    <p className="text-sm text-gray-400 mr-2">
                      {tweet.owner.username}
                    </p>
                    <p className="text-[10px] text-gray-500 ">
                      {moment(tweet.createdAt).fromNow()}
                    </p>
                  </div>
                  <p className="text-base">{tweet.content}</p>
                  <div className="mt-1 text-sm text-gray-300">
                    <LikeOutlined className="pr-1" />

                    <DislikeOutlined className="pr-1 pl-2" />
                  </div>
                </div>
                <div className="absolute right-5">
                  <EditFilled
                    className="text-2xl text-green-500 mr-2"
                    onClick={() => editTweet(tweet)}
                  />
                  <DeleteFilled
                    className="text-2xl text-red-500 mr-1"
                    onClick={() => deleteTweet(tweet)}
                  />
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
