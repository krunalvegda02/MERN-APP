import React from "react";
import { Container } from "../index";
import { MyProfileComponent } from "../index";
import { useParams } from "react-router-dom";

export default function MyProfile() {
  const { username, isChannel } = useParams();
  return (
    <div>
      <Container>
        <MyProfileComponent username={username} isChannel={isChannel} />
      </Container>
    </div>
  );
}
