import React, { useState, useEffect } from "react";
import { VideoContainer } from "../index";
import axios from "axios";

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
