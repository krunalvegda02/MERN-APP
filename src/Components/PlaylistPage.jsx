import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Loading, HorizontalVideoContainer } from "../index";
import { useNavigate, useParams } from "react-router-dom";

function PlaylistPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [videos, setVideos] = useState(null);
  const [playlist, setpLaylist] = useState(null);

  const navigate = useNavigate();
  const playVideo = (id) => {
    navigate(`/play-video/${id}`);
  };

  useEffect(() => {
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
                "https://limitlessneurolab.com/wp-content/uploads/2024/03/bg-blur-tailwind-1024x585.png" ||
                playlist.videos[0].thumbnail
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
              <div key={videoId} onClick={() => playVideo(videoId)}>
                <HorizontalVideoContainer id={videoId} />
              </div>
            ))}
        </div>
      </div>
    </Container>
  );
}

export default PlaylistPage;

// if (!videos)
//     {
//       <div>
//         <p className="text-white text-2xl">Please Add Video in the Playlist</p>
//       </div>
//     }
