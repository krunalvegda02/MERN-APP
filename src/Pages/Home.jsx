import React, { useState, useEffect } from "react";
import { Container } from "../index";
import { VideoContainer } from "../index";
import axios from "axios";

function Home() {
  const [videos, setVideos] = useState("");

  useEffect(() => {}, []);
  console.log("set VIdeos:", setVideos);
  return (
    <Container>
      <VideoContainer />
    </Container>
  );
}

export default Home;
