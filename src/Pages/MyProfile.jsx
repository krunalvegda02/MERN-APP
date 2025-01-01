import React from "react";
import { Container } from "../index";
import { MyProfileComponent } from "../index";
import { useParams, useLocation } from "react-router-dom";

export default function MyProfile() {
  const { username } = useParams();
  const location = useLocation();
  const isChannel = location.state?.isChannel;

  return (
    <div>
      <Container>
        <MyProfileComponent username={username} isChannel={isChannel} />
      </Container>
    </div>
  );
}
