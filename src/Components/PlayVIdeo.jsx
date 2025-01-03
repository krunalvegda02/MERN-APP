import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useParams, Link } from "react-router-dom";
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
import moment from "moment";

function PlayVIdeo() {
  const videoId = useParams();
  console.log("Video id", videoId);
  const [formComment, setFormComment] = useState(null);
  const [comment, setCommentData] = useState();
  const [userData, setuserData] = useState();
  const [videoData, setVideoData] = useState();

  // const [cmntLikes, setCmntLikes] = useState();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState();

  const userAvatar = useSelector((state) => state.userData.avatar);
  const currentUserId = useSelector((state) => state.userData._id);

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
        setFormComment("");
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

  //? get number of total likes
  const getLikes = () => {
    axios
      .get(`/api/v1/likes/toggle/v/${videoId.id}`)
      .then((res) => {
        // console.log("res", res.data.data);

        //setting likes arary
        setLikes(res.data.data);

        const { likedBy } = res.data.data;
        const userLiked = likedBy.includes(currentUserId);
        setLiked(userLiked);
      })
      .catch((err) => {
        console.log("error in Likes", err);
      });
  };

  //? video Like toggle
  const toggleLike = () => {
    axios
      .post(`/api/v1/likes/toggle/v/${videoId.id}`)
      .then((res) => {
        const { likedBy } = res.data.data;
        const totalLikes = likedBy.length;
        setLikes(totalLikes);
        //for setting like color

        const userLiked = likedBy.includes(currentUserId);
        setLiked(userLiked);
        message.success(
          userLiked ? "You liked this video!" : "You unliked this video."
        );
      })
      .catch((err) => {
        message.error("Error during like");
      });
  };

  //?Comment toggle
  const toggleCmnt = (cmntId) => {
    axios
      .post(`/api/v1/likes/toggle/c/${cmntId}`)
      .then((res) => {
        console.log("resres", res);
        message.success("Comment toggle succesfull");
      })
      .catch((err) => {
        message.error("Error during like");
      });
  };

  //todo: create functionality
  // const getCommentLikes = (commentId) => {
  //   axios
  //     .get(`/api/v1/likes/toggle/c/${commentId}`)
  //     .then((res) => {
  //       console.log("res", res.data.data);
  //       setCmntLikes(res.data.data);
  //       // const { likedBy } = res.data.data;
  //       // const userLiked = likedBy.includes(currentUserId);
  //       // setLiked(userLiked);
  //     })
  //     .catch((err) => {
  //       console.log("error in Likes", err);
  //     });
  // };

  //? calling getVideoById for setting video and user data in playVIdeo Container
  useEffect(() => {
    axios
      .get(`/api/v1/videos/${videoId.id}`)
      .then((res) => {
        // console.log("API Response:", res.data.data);
        setVideoData(res.data.data.video);
        setuserData(res.data.data.user);
        getAllcomments();
        getLikes();
      })
      .catch((error) => console.log("Error fetching videos", error));
  }, []);

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
            <div className="flex">
              <UserCard username={userData.username} />
            </div>

            <div className="flex">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleLike}
              >
                {liked ? (
                  <LikeFilled className="pr-2 text-2xl text-violet-500" />
                ) : (
                  <LikeOutlined className="pr-2 text-2xl" />
                )}
                <p>{likes} </p>
              </div>

              <div
                className="flex items-center pl-2 cursor-pointer"
                onClick={toggleLike}
              >
                {!liked ? (
                  <DislikeFilled className="pr-2 text-2xl text-gray-500" />
                ) : (
                  <DislikeOutlined className="pr-2 text-2xl" />
                )}
                <p></p>
              </div>
            </div>
          </div>

          {/*COmment part */}
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
                      <div className="text-white pl-3 text-left">
                        <div className="flex items-center">
                          <p className="text-sm text-gray-300 mr-2">
                            {cmnt.owner.username}
                          </p>
                          <p className="text-xs text-gray-500 ">
                            {moment(cmnt.createdAt).fromNow()}
                          </p>
                        </div>
                        <p className="text-base">{cmnt.content}</p>
                        <div
                          className="mt-1 text-xs text-gray-300"
                          onClick={() => {
                            toggleCmnt(cmnt._id);
                          }}
                        >
                          <LikeOutlined className="pr-1" />

                          <DislikeOutlined className="pr-1 pl-2" />
                        </div>
                      </div>
                      <div className="absolute right-5">
                        {cmnt.owner._id === currentUserId && (
                          <div>
                            <EditFilled
                              className="text-base text-green-500 mr-2"
                              onClick={() => editCmnt(cmnt)}
                            />
                            <DeleteFilled
                              className="text-base text-red-500 mr-1"
                              onClick={() => deleteCmnt(cmnt)}
                            />
                          </div>
                        )}
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
