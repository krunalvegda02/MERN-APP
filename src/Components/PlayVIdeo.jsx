import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useParams, Link } from "react-router-dom";
import { Container, UserCard, Loading } from "../index";
import {
  LikeOutlined,
  LikeFilled,
  DislikeOutlined,
  DislikeFilled,
} from "@ant-design/icons";
import axios from "axios";
import { message } from "antd";
import { useEffect } from "react";

function PlayVIdeo() {
  const videoId = useParams();
  // console.log("videoid", videoId.id);

  const [userData, setuserData] = useState();
  const [videoData, setVideoData] = useState();

  const [likes, setLikes] = useState(10);
  const [dislikes, setDislikes] = useState(20);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/v1/videos/${videoId.id}`)
      .then((res) => {
        console.log("API Response:", res.data.data);
        setVideoData(res.data.data.video);
        setuserData(res.data.data.user);
        // setuserData(res)
      })
      .catch((error) => console.log("Error fetching videos", error));
  }, []);

  // useEffect(() => {
  //   if (videoData) {
  //     console.log("Updated videoData:", videoData);
  //     console.log("Updated userData:", userData);
  //   }
  // }, [videoData]);

  const toggleLike = () => {
    axios
      .post(`/api/v1/likes/toggle/v/${videoId}`)
      .then((res) => {
        console.log("API RES:", res);
      })
      .catch((err) => {
        message.error("Error during like");
      });
  };

  if (!videoData) {
    return (
      <Container>
        <Loading  className={"mt-36 ml-40"}/>
      </Container>
    );
  }

  return (
    <Container>
      <Link to="/play-video">
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
          </div>
        </div>
      </Link>
    </Container>
  );
}

export default PlayVIdeo;
