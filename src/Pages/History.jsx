import React, { useEffect, useState } from "react";
import { Container, FloatingActionButton, Loading } from "../index";
import HorizontalVideoContainer from "../Components/HorizontalVideoContainer";
import axios from "axios";
import { HomeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function History() {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  console.log(history);

  const navigate = useNavigate();
  const playVideo = (id) => {
    navigate(`/play-video/${id}`);
  };

  useEffect(() => {
    axios
      .get("/api/v1/users/history")
      .then((res) => {
        console.log("API RESPONSE", res);
        setHistory(res.data.data);
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

  if (history.length == 0) {
    return (
      <Container>
        <HomeOutlined
          className="text-5xl border-2 rounded-full p-3 bg-violet-300 mt-48 text-violet-500"
          onClick={() => navigate("/")}
        />
        <p className="text-gray-500 text-xl mt-3">
          watch videos from feed to save history
        </p>
        <p className=" text-4xl text-gray-400 mt-2">No History Found</p>
      </Container>
    );
  }

  return (
    <Container>
      <div>
        {history.length > 0 &&
          history.map((video) => (
            <div onClick={() => playVideo(video.video._id)}>
              <HorizontalVideoContainer
                key={video.video._id}
                src={video.video.src}
                createdAt={video.video.createdAt}
                owner={video.video.owner}
                thumbnail={video.video.thumbnail}
                title={video.video.title}
                views={video.video.views}
                description={video.video.description}
              />
            </div>
          ))}
      </div>

      <FloatingActionButton />
    </Container>
  );
}

export default History;
