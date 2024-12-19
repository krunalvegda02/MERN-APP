import React, { useEffect } from "react";
import { Avatar, Container } from "../../index";
import { useSelector } from "react-redux";

function ProfileTweets() {
  const userid = useSelector((state) => state.userData._id);
//   useEffect(() => {
//     axios.get(`api/v1/tweets/user/${userid}`);
//   });

  return (
    <Container>
      <div>
       <Avatar h={60} w={60}   />
      </div>
    </Container>
  );
}

export default ProfileTweets;
