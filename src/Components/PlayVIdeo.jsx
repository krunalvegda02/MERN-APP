import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { Container, UserCard, Loading, Avatar } from "../index";
import {
  LikeOutlined,
  LikeFilled,
  DislikeOutlined,
  DislikeFilled,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";
import axios from "axios";
import { message, Modal } from "antd";
import { useSelector } from "react-redux";

function PlayVIdeo() {
  const videoId = useParams();
  console.log("Video id", videoId);

  const [profileOpen, setProfileOpen] = useState();

  const [formComment, setFormComment] = useState(null);
  const [comment, setCommentData] = useState();
  const [userData, setuserData] = useState();
  const [videoData, setVideoData] = useState();

  const [likes, setLikes] = useState(10);
  const [dislikes, setDislikes] = useState(20);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const userAvatar = useSelector((state) => state.userData.avatar);

  //? Edit Comment
  const editCmnt = (cmnt) => {
    let edit = prompt("Enter a Comment to update", cmnt.content);

    if (edit) {
      // console.log("edit", edit); checked
      axios
        .patch(`/api/v1/comments/c/${cmnt._id}`, { newComment: edit })
        .then((res) => {
          // console.log("Edit response:", res);
          console.log("commnet update:", res);

          message.success("Comment Updated succesfully");
          getAllcomments();
        })
        .catch((err) => {
          console.log("Updating error:", err);
          message.error("Error updating Comment:", err);
        });
    }
  };

  //? Delete Comment
  const deleteCmnt = (cmnt) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Comment?",
      onOk: () => {
        axios
          .delete(`/api/v1/comments/c/${cmnt._id}`)
          .then(() => {
            message.success("Comment deleted successfully!");
            getAllcomments();
          })
          .catch((err) => {
            console.error("Error deleting Comment:", err);
            message.error("Failed to delete Comment!");
          });
      },
      onCancel: () => {
        message.info("Comment deletion canceled.");
      },
    });
  };

  //? Add Comment
  const addComment = (formComment) => {
    if (!formComment.trim()) {
      message.warning("Comment cannot be empty!");
      return;
    }

    axios
      .post(`/api/v1/comments/${videoId.id}`, { comment: formComment })
      .then(() => {
        getAllcomments();
        message.success("Comment Added Succesfully!");
      })
      .catch((err) => {
        console.log(err);
        message.error("Error Adding Comment");
      });
  };

  //? All Comments fetching
  const getAllcomments = () => {
    axios
      .get(`/api/v1/comments/${videoId.id}`)
      .then((res) => {
        console.log("Comments:", res.data.data);
        setCommentData(res.data.data.comments);
      })
      .catch((error) => console.log("Error fetching Comments", error));
  };

  //? calling getVideoById for setting video and user data in playVIdeo Container
  useEffect(() => {
    axios
      .get(`/api/v1/videos/${videoId.id}`)
      .then((res) => {
        // console.log("API Response:", res.data.data);
        setVideoData(res.data.data.video);
        setuserData(res.data.data.user);
        getAllcomments();
      })
      .catch((error) => console.log("Error fetching videos", error));
  }, []);

  //? Like toggle
  const toggleLike = () => {
    axios
      .post(`/api/v1/likes/toggle/v/${videoId.id}`)
      .then((res) => {
        console.log("API RES:", res);
      })
      .catch((err) => {
        message.error("Error during like");
      });
  };

  if (!videoData || !comment) {
    return (
      <Container>
        <Loading className={"mt-36 ml-40"} />
      </Container>
    );
  }

  return (
    <Container>
      <div>
        <ReactPlayer
          playing={true}
          pip={false}
          loop={true}
          url={videoData.video}
          controls={true}
          width={"full"}
          height={"calc(100vh - 153px)"}
        />
        <div className="text-lg text-white text-left p-2 pb-0 align-middle">
          <p className="text-2xl font-semibold ml-2">{videoData.description}</p>
          <div className="flex  justify-between ">
            <div
              className="flex"
              onClick={() => {
                OpenProfile;
              }}
            >
              <UserCard username={userData.username} />
            </div>

            <div className="flex">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleLike}
              >
                {liked ? (
                  <LikeFilled className="pr-2 text-2xl text-blue-500" />
                ) : (
                  <LikeOutlined className="pr-2 text-2xl" />
                )}
                <p>{likes} likes</p>
              </div>
              <p className="px-2 text-gray-500 pt-4">•</p>
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleLike}
              >
                {disliked ? (
                  <DislikeFilled className="pr-2 text-2xl text-red-500" />
                ) : (
                  <DislikeOutlined className="pr-2 text-2xl" />
                )}
                <p>{dislikes} dislikes</p>
              </div>
            </div>
          </div>
          <div className="border rounded-md p-2">
            <p className="text-white text-xl text-semibold ml-1 mb-1">
              {comment.length} Comments
            </p>
            <div className="relative w-full shadow-sm flex mt-2">
              <Avatar h={33} w={33} src={userAvatar} />
              <input
                name="tweet"
                value={formComment || ""}
                onChange={(e) => setFormComment(e.target.value)}
                className="w-1/2 h-7 ml-2 p-3 border-b text-lg text-white border-gray-300  focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-950 pr-16"
                placeholder="Add a Comment..."
              />
              <button
                className="ml-2 h-7 bg-violet-500 hover:bg-red-600 text-white px-4 py-1 shadow-md text-sm rounded"
                onClick={() => addComment(formComment)}
              >
                Post
              </button>
            </div>

            <div>
              {comment.map((cmnt) => {
                return (
                  <div className="flex ml-2 mt-3 " key={cmnt._id}>
                    <div className="flex ">
                      <Avatar h={35} w={35} src={cmnt.owner.avatar} />
                      <div className="flex-col text-white pl-3 text-left">
                        <div className="flex items-center">
                          <p className="text-xs text-gray-400 ">
                            {cmnt.owner.username}
                          </p>
                        </div>
                        <p className="text-sm">{cmnt.content}</p>
                        <div className="mt-1 text-xs text-gray-300">
                          <LikeOutlined className="pr-1" />
                          {"344"}
                          <DislikeOutlined className="pr-1 pl-2" />
                          {"344"}
                        </div>
                      </div>
                      <div className="absolute right-5">
                        //TODO: IF it is my commment then and then only it should see this icons
                        <EditFilled
                          className="text-base text-green-500 mr-2"
                          onClick={() => editCmnt(cmnt)}
                        />
                        <DeleteFilled
                          className="text-base text-red-500 mr-1"
                          onClick={() => deleteCmnt(cmnt)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default PlayVIdeo;
