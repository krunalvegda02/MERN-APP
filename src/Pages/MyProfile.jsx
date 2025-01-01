import React from "react";
import { Container } from "../index";
import { MyProfileComponent } from "../index";
import { useParams } from "react-router-dom";

export default function MyProfile({isChannel}) {
  const user = useParams();
  return (
    <div>
      <Container>
        <MyProfileComponent Username={user} isChannel={isChannel}  />
      </Container>
    </div>
  );
}
