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
      <div className="">
        <Modal
          styles={{
            content: { backgroundColor: "#fca5a5" },
          }}
          visible={true}
          closable={false}
          footer={true}
        >
          <p className="bg-red-300 text-red-600 text-2xl">
            Are you sure! Do You Want to Log Out ?
          </p>
          <div className="flex justify-end mt-5">
            <Button
              onClick={handleLogout}
              className="px-15 py-2 text-lg bg-red-500 h-10 w-40 font-semibold"
            >
              Logout
            </Button>
          </div>
        </Modal>
      </div>
    </Container>
  );
}

export default Logout;

{
  /* <div className="bg-white">
<p>logout</p>
<button onClick={handleLogout}>LOGOUT</button>
</div> */
}
