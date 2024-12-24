import React from "react";
import ReactPlayer from "react-player";
import { Container, UserCard, SubscribeBtn } from "../index";
import {
  LikeOutlined,
  LikeFilled,
  DislikeOutlined,
  DislikeFilled,
} from "@ant-design/icons";

function PlayVIdeo({ id, src }) {
  return (
    <Container>
      <div>
        <ReactPlayer
          url="https://res.cloudinary.com/krunalvegda02/video/upload/v1733937997/sussqe7pttnvfprflkn0.mp4"
          controls={true}
          width={"full"}
          height={"calc(100vh - 153px)"}
        />
        <div className="text-lg text-white text-left p-2 pb-0 align-middle">
          {/* <p className="text-2xl font-semibold "> VIDEO TITLE</p> */}
          <p className="text-2xl font-semibold ">
            Description Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Explicabo, odit.
          </p>
          <div className="flex  justify-between ">
            <div className="flex">
            <UserCard />
            </div>
           
            <div className="flex">
              <LikeOutlined className="pr-2 text-2xl" /> <p className="pt-4">{10} likes</p>
              <p className="px-2 text-gray-500 pt-4">•</p>
              <DislikeOutlined className="pr-2 text-2xl" /> <p className="pt-4">{20} dislikes</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default PlayVIdeo;
