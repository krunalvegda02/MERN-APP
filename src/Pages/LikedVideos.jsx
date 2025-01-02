import React, { useEffect, useState } from "react";
import {
  Container,
  FloatingActionButton,
  Loading,
  HorizontalVideoContainer,
  AddVideoToPlaylist,
} from "../index";
import axios from "axios";
import { HomeOutlined, MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Popover } from "antd";

function LikedVideos() {
  const [loading, setLoading] = useState(true);

  const [videoId, setVideoid] = useState(null);
  const [likedVideos, setLikedVideos] = useState([]);
  const [playlistmodal, setplaylistmodal] = useState(false);

  // console.log(likedVideos);

  const navigate = useNavigate();
  const playVideo = (id) => {
    navigate(`/play-video/${id}`);
  };

  const openAddPlaylistModal = (videoId) => {
    setVideoid(videoId);
    setplaylistmodal(true);
  };

  const closeAddPlaylistModal = () => {
    setplaylistmodal(false);
  };

  const content = (videoId) => {
    return (
      <div
        className="flex gap-2 text-white font-semibold"
        onClick={() => openAddPlaylistModal(videoId)}
      >
        <PlusOutlined />
        <p>Add Video To Playlist</p>
      </div>
    );
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
            <div className="flex relative" key={likevideo.video._id}>
              <div onClick={() => playVideo(likevideo.video._id)}>
                <HorizontalVideoContainer id={likevideo.video._id} />
              </div>
              <Popover
                content={() => content(likevideo.video._id)}
                trigger="click"
                color="#1e293b  "
                placement="bottom"
                arrow=""
              >
                <MoreOutlined className="text-white text-2xl right-3 absolute top-4" />
              </Popover>
            </div>
          ))}
      </div>

      <FloatingActionButton />
      {playlistmodal && (
        <AddVideoToPlaylist
          isOpen={playlistmodal}
          onClose={closeAddPlaylistModal}
          VideoId={videoId}
        />
      )}
    </Container>
  );
}

export default LikedVideos;
