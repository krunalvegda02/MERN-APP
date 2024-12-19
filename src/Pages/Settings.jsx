import React from "react";
import { useDispatch } from "react-redux";
import { setLogOut, userSlice } from "../redux/Current user data/userSlice";
import { Container } from "../index";

function Settings() {
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

export default Settings;
