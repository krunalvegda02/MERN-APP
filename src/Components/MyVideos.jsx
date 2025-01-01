import React, { useState, useEffect } from "react";
import { VideoContainer, UploadVideo, Container, Loading } from "../index";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";

function MyVideos() {
  const [uploadVideo, setUploadVideo] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const closeUploadVideo = () => {
    setUploadVideo(false);
  };

  const OpenUploadVideo = () => {
    setUploadVideo(true);
  };
  console.log("uplpoad video modal", uploadVideo);

  useEffect(() => {
    axios
      .get(`/api/v1/videos/my-content`)
      .then((res) => {
        // console.log("MYVIDEOS API Response:", res.data.data);
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
          onClick={OpenUploadVideo}
        />
        <p className="text-gray-500 text-xl mt-3">Click here to Uplaod Video</p>
        <p className=" text-4xl text-gray-400 mt-2">No Video Uploaded</p>
        {uploadVideo && (
          <UploadVideo isOpen={uploadVideo} onClose={closeUploadVideo} />
        )}
      </>
    );
  }

  return (
    <div>
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
                owner={video.userDetails.username}
                avatar={video.userDetails.avatar}
              />
            );
          })}
      </div>
    </div>
  );
}

export default MyVideos;
