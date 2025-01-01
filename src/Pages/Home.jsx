import React, { useState, useEffect } from "react";
import { Container } from "../index";
import { VideoContainer } from "../index";
import axios from "axios";
import { FloatingActionButton, Loading } from "../index";

function Home() {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/v1/videos/")
      .then((res) => {
        console.log("API Response:", res.data);
        setLoading(false);
        setVideos(res.data.data.videos);
      })
      .catch((error) => {
        console.log("Error fetching videos", error);
        setLoading(false);
      });
  }, []);
  // console.log("set VIdeos:", videos);

  if (loading) {
    <Loading />;
  }
  return (
    <Container>
      <div className="flex flex-wrap my-2 ">
        {videos.length > 0
          ? videos.map((video) => {
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
            })
          : "No Videos"}
      </div>
      <FloatingActionButton />
    </Container>
  );
}

export default Home;
