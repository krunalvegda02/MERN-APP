import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Avatar } from "../index";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchModal({ isOpen, onClose, username }) {
  console.log("usrname", username);
  const [searchedUser, setSearchedUser] = useState(null);
  const navigate = useNavigate();

  const searchUser = (username) => {
    if (!username) {
      message.warning("Please enter a username to search");
      return;
    }

    axios
      .get(`/api/v1/users/${username}`)
      .then((res) => {
        // message.success("User Get");
        setSearchedUser(res.data.data);
        console.log("res", res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
        // message.error("User not Found");
      });
  };

  const profileOpen = () => {
    onClose();
    navigate(`/profile/${username}`);
  };
  useEffect(() => {
    searchUser(username);
  }, []);

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      closable={false}
      //    maskClosable={!loading}
      centered
      //   height={500}
      width={400}
      styles={{
        content: { backgroundColor: "rgb(24,24,24)" },
      }}
    >
      {!searchedUser ? (
        <div className="flex gap-24">
          <div>
            <p className="text-xl text-white">User Does not exist</p>
            <p className="text-red-500">Please Enter A valid Userrname !</p>
          </div>
          <div>
            <ExclamationCircleOutlined className=" text-red-500 text-5xl" />
          </div>
        </div>
      ) : (
        <div>
          <p className="text-white text-lg font-sans">Your Search</p>
          <div className="m-2 ">
            <div className="flex ">
              <div
                onClick={() => {
                  profileOpen();
                }}
              >
                <Avatar src={searchedUser.avatar} h={47} w={47} />
              </div>

              <div
                className="text-left text-white"
                onClick={() => {
                  profileOpen();
                }}
              >
                <p className=" text-lg pl-3"> @{searchedUser.username}</p>
                <p className=" text-sm text-gray-400 pl-3">
                  {" "}
                  {searchedUser.fullname}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default SearchModal;
