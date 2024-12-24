import React, { useEffect, useState } from "react";
import {Container, FloatingActionButton} from "../index";
import HorizontalVideoContainer from "../Components/HorizontalVideoContainer";
import axios from "axios";

function LikedVideos() {
  const [likedVideos, setLikedVideos] = useState("");
  console.log(likedVideos);

  useEffect(() => {
    axios
      .get("/api/v1/likes/videos")
      .then((res) => {
        console.log("API RESPONSE", res);
        setLikedVideos(res.data.data);
      })
      .catch((err) => console.log("API error", err));
  }, []);

  return (
    <Container>
      {likedVideos.length > 0 ? (
        likedVideos.map((likevideo) => (
          <HorizontalVideoContainer
            key={likevideo.video._id}
            src={likevideo.video.src}
            createdAt={likevideo.video.createdAt}
            owner={likevideo.video.owner}
            thumbnail={likevideo.video.thumbnail}
            title={likevideo.video.title}
            views={likevideo.video.views}
            description={likevideo.video.description}
          />
        ))
      ) : (
        <p className="font-semibold text-4xl text-white mt-48">
          No Likes Found
        </p>
      )}
      <FloatingActionButton />
    </Container>
  );
}

export default LikedVideos;
