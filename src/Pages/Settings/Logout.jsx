import React from "react";
import { setLogOut, userSlice } from "../../redux/Current user data/userSlice";
import { Container } from "../../index";
import { useDispatch } from "react-redux";

function Logout() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogOut());
  };
  return (
    <Container>
      <div className="bg-white">
        <p>logout</p>
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
    </Container>
  );
}

export default Logout;
