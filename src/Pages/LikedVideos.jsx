import React, { useEffect, useState } from "react";
import { Container, FloatingActionButton, Loading } from "../index";
import HorizontalVideoContainer from "../Components/HorizontalVideoContainer";
import axios from "axios";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function LikedVideos() {
  const [loading, setLoading] = useState(true);
  const [likedVideos, setLikedVideos] = useState([]);
  console.log(likedVideos);

  const navigate = useNavigate();
  const playVideo = (id) => {
    navigate(`/play-video/${id}`);
  };

  useEffect(() => {
    axios
      .get("/api/v1/likes/videos")
      .then((res) => {
        // console.log("API RESPONSE", res);
        setLikedVideos(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("API error", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container>
        <Loading className={"mt-36 ml-40"} />
      </Container>
    );
  }

  if (likedVideos.length == 0) {
    return (
      <Container>
        <HomeOutlined
          className="text-5xl border-2 rounded-full p-3 bg-violet-300 mt-48 text-violet-500"
          onClick={() => navigate("/")}
        />
        <p className="text-gray-500 text-xl mt-3">
          Explore the Feed to Find your Favourite Content
        </p>
        <p className=" text-4xl text-gray-400 mt-2">No Likes Found</p>
      </Container>
    );
  }

  return (
    <Container>
      <div>
        {likedVideos.length > 0 &&
          likedVideos.map((likevideo) => (
            <div onClick={() => playVideo(likevideo.video._id)}>
              <HorizontalVideoContainer
                id={likevideo.video._id}
                key={likevideo.video._id}
                src={likevideo.video.src}
                createdAt={likevideo.video.createdAt}
                owner={likevideo.video.owner}
                thumbnail={likevideo.video.thumbnail}
                title={likevideo.video.title}
                views={likevideo.video.views}
                description={likevideo.video.description}
              />
            </div>
          ))}
      </div>

      <FloatingActionButton />
    </Container>
  );
}

export default LikedVideos;
