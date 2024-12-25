import React, { useState, useEffect } from "react";
import { VideoContainer, Container } from "../index";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";

function MyVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/v1/videos/my-content`)
      .then((res) => {
        console.log("MYVIDEOS API Response:", res.data.data);
        setVideos(res.data.data);
      })
      .catch((error) => console.log("Error fetching videos", error));
  }, []);
  console.log("set MYVIdeos:", videos);

  if (videos) {
    return (
      <>
        <PlusOutlined
          className="text-5xl border-2 rounded-full p-3 bg-violet-300 mt-10 text-violet-500"
          onClick={() =>  <UploadVideo  />}
        />
        <p className="text-gray-500 text-xl mt-3">Click here to Uplaod Video</p>
        <p className=" text-4xl text-gray-400 mt-2">No Video Uploaded</p>
      </>
    );
  }

  return (
    <div className="flex flex-wrap">
      {videos.length > 0
        ? videos.map((video) => {
            return (
              <VideoContainer
                key={video._id}
                title={video.title}
                thumbnail={video.thumbnail}
                views={video.views || 0}
                createdAt={video.createdAt}
                description={video.description}
                src={video.video}
                owner={video.owner}
              />
            );
          })
        : "No Videos"}
    </div>
  );
}

export default MyVideos;
