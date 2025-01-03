import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Loading, HorizontalVideoContainer } from "../index";
import { useNavigate, useParams } from "react-router-dom";
import { message, Popover } from "antd";
import { DeleteFilled, MoreOutlined } from "@ant-design/icons";

function PlaylistPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [videos, setVideos] = useState(null);
  const [playlist, setpLaylist] = useState(null);

  const navigate = useNavigate();
  const playVideo = (id) => {
    navigate(`/play-video/${id}`);
  };

  const getPlaylist = () => {
    axios
      .get(`/api/v1/playlist/${id}`)
      .then((res) => {
        setLoading(false);
        setpLaylist(res.data.data);
        setVideos(res.data.data.videos);
        console.log("APi res:", res.data.data.videos);
      })
      .catch((err) => {
        setLoading(false);
        message.error("Error Fetching Playlist");
        console.log("Err", err);
      });
  };

  const removePlaylistVideo = (videoId) => {
    axios
      .patch(`/api/v1/playlist/remove/${videoId}/${playlist._id}`)
      .then((res) => {
        getPlaylist();
        message.success("Remove Video Succesfully");
      })
      .catch((err) => {
        console.log("err", err);
        message.error("Error removing video");
      });
  };

  const content = (videoId) => {
    return (
      <div
        className="flex gap-2 text-white font-semibold"
        onClick={() => removePlaylistVideo(videoId)}
      >
        <DeleteFilled className="text-red-500 text-lg" />
        <p>Remove Video</p>
      </div>
    );
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  console.log("playlist", playlist);

  if (loading) {
    return (
      <div>
        <Loading />;
      </div>
    );
  }

  return (
    <Container>
      <div className="flex ">
        <div className="w-[32.60%] h-[250px] mt-[10px]">
          <div className=" relative">
            <img
              src={
                playlist.videos[0]?.thumbnail ||
                "https://tse4.mm.bing.net/th?id=OIP.hOxRAamDzpX0wH9QTatSbAHaEc&pid=Api&P=0&h=180"
              }
              alt="PlayListimage"
              className="h-48 "
            />
            <div className="flex justify-between  px-4  absolute bottom-0 backdrop-blur w-full h-14">
              <div className=" text-white text-left  text-sm pt-2">
                <p>PLaylist</p>
                <div className="flex text-xs pt-1">
                  <p>{100} Views</p> <p className="px-3"> ● </p>
                  <p>{new Date(playlist.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-white text-sm pt-3 ">
                {playlist.videos.length} Videos
              </div>
            </div>
          </div>
          {/* description */}
          <div className="flex justify-between text-left p-1 px-4 text-white">
            <div>
              <p className=" text-lg">{playlist.name}</p>
              <p className="text-xs text-gray-500">{playlist.description}</p>
            </div>
          </div>
        </div>
        <div>
          {videos.length > 0 &&
            videos.map((videoId) => (
              <div key={videoId} className="relative flex">
                <div onClick={() => playVideo(videoId)}>
                  <HorizontalVideoContainer id={videoId} />
                </div>
                <Popover
                  content={() => content(videoId)}
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
      </div>
    </Container>
  );
}

export default PlaylistPage;
