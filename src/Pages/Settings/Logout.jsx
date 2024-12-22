import React from "react";
import { setLogOut } from "../../redux/Current user data/userSlice";
import { Container } from "../../index";
import { useDispatch } from "react-redux";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setLogOut());
    navigate("/login");
  };
  return (
    <Container>
      <div className="h-1/2 w-2/3 mt-36 ml-36 p-10 bg-slate-900 align-middle justify-center flex rounded-xl">
        <div>
          <p className=" text-white text-2xl pb-3 font-semibold" >
            Are you sure! Do You Want to Log Out ?
          </p>
          <div className="flex justify-end mt-5">
            <Button
              onClick={handleLogout}
              className="px-15 py-2.5  text-lg text-red-200 bg-red-500 h-10 w-40 font-bold"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Logout;


