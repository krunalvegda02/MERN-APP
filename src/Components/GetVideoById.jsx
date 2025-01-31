import React, { useState, useEffect } from "react";
import { VideoContainer, UploadVideo, Container, Loading } from "../index";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";

function GetVideoById({ userid }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/v1/videos/c/${userid}`)
      .then((res) => {
        console.log("Channel Videos:", res.data.data);
        setVideos(res.data.data.myVideos);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error fetching videos", error);
      });
  }, [loading]);
  // console.log("set MYVIdeos:", videos);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (videos.length === 0) {
    return (
      <>
        <PlusOutlined
          className="text-5xl border-2 rounded-full p-3 bg-violet-300 mt-10 text-violet-500"
          onClick={() => <UploadVideo />}
        />
        <p className="text-gray-500 text-xl mt-3">Click here to Uplaod Video</p>
        <p className=" text-4xl text-gray-400 mt-2">No Video Uploaded</p>
      </>
    );
  }

  return (
    <div className="flex flex-wrap">
      {videos.length > 0 &&
        videos.map((video) => {
          return (
            <VideoContainer
              key={video._id}
              videoId={video._id}
              title={video.title}
              thumbnail={video.thumbnail}
              views={video.views || 0}
              createdAt={video.createdAt}
              description={video.description}
              src={video.video}
              owner={video.owner.username}
              avatar={video.owner.avatar}
            />
          );
        })}
    </div>
  );
}

export default GetVideoById;
