import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import { Loading } from "../index";
import { useNavigate } from "react-router-dom";

function AddVideoToPlaylist({ isOpen, onClose, VideoId }) {
  const [playlist, setplaylist] = useState();
  const [loading, setLoading] = useState(true);
  
  const userid = useSelector((state) => state.userData._id);
const navigate = useNavigate();

  const getAllUserPlaylist = () => {
    axios
      .get(`/api/v1/playlist/user/${userid}`)
      .then((res) => {
        setplaylist(res.data.data);
        setLoading(false);
        console.log("Res", res);
      })
      .catch((err) => {
        setLoading(false);
        message.error("Errorin Fetching Playlist");
      });
  };

  const AddVideoToPlaylist = (playlistid) => {
    axios
      .patch(`/api/v1/playlist/add/${VideoId}/${playlistid}`)
      .then(() => {
        onClose();
        message.success("Video Added to Playlist");
        navigate(`/playlist/${playlistid}`);
      })
      .catch((err) => {
        console.log("ERR", err);
        message.error("Error Adding Video To Playlist");
      });
  };

  useEffect(() => {
    getAllUserPlaylist();
  }, []);

  if (!playlist) {
    return (
      <Loading />
      // message.warning("No PLaylist Found")
    );
  }

  return (
    <Modal
      title={<p className="text-gray-400 text-xl">Choose Playlist</p>}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      closable={false}
      maskClosable={!loading}
      centered
      width={250}
      styles={{
        content: { backgroundColor: "rgb(24,24,24)" },
        header: { backgroundColor: "rgb(24,24,24)" },
      }}
    >
      {playlist.length > 0 &&
        playlist.map((i) => (
          <div
            key={i._id}
            className=" text-xl text-white flex gap-2"
            onClick={() => {
              AddVideoToPlaylist(i._id);
            }}
          >
            <PlusOutlined /> <p>{i.name}</p>
          </div>
        ))}
    </Modal>
  );
}

export default AddVideoToPlaylist;
