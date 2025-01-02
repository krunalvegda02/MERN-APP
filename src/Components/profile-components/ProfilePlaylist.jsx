import React, { useEffect, useState } from "react";
import { AddPlaylistModal, Loading } from "../../index";
import axios from "axios";
import {
  PlusCircleOutlined,
  MoreOutlined,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment";
import { Popover, Modal, message } from "antd";

function ProfilePlaylist({ isChannel, channelId }) {
  const [playList, setPlaylist] = useState(null);
  const [modal, setmodal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const getAllPlaylists = () => {
    axios
      .get(`/api/v1/playlist/user/${channelId}`)
      .then((res) => {
        console.log("Playlist response:", res.data.data);
        setPlaylist(res.data.data);
      })
      .catch((err) => {
        console.log("Playlist err:", err);
      });
  };

  const createPlaylist = () => {
    setmodal(true);
  };

  const onClose = () => {
    setmodal(false);
  };

  const CloseEditModal = () => {
    setEditModal(false);
  };

  const EditPlaylist = () => {
    setEditModal(true);
  };

  const deletePlaylist = (playlistId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Playlist?",
      onOk: () => {
        axios
          .delete(`/api/v1/playlist/${playlistId}`)
          .then(() => {
            message.success("Playlist deleted successfully!");
            getAllPlaylists();
          })
          .catch((err) => {
            console.error("Error deleting Playlist:", err);
            message.error("Failed to delete Playlist!");
          });
      },
      onCancel: () => {
        message.info("Playlist deletion canceled.");
      },
    });
  };

  const content = (playlistId) => (
    <div>
      <div
        onClick={() => {
          EditPlaylist(playlistId);
        }}
      >
        <p className="text-base flex text-white font-semibold">
          <EditFilled />
        <p className=" ml-2">Edit</p>   
        </p>
      </div>
      <div
        onClick={() => {
          deletePlaylist(playlistId);
        }}
      >
        <p className="text-base font-semibold  text-white">
          <DeleteFilled className="mr-1"/> Delete
        </p>
      </div>
      {editModal && (
        <AddPlaylistModal
          isOpen={editModal}
          onClose={CloseEditModal}
          editPlaylist={true}
          editPlaylistid={playlistId}
        ></AddPlaylistModal>
      )}
    </div>
  );

  useEffect(() => {
    getAllPlaylists();
  }, [EditPlaylist]);

  if (!playList) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-wrap gap-[0.6rem] mb-2">
        {!isChannel ? (
          <div className="w-[32.60%]   relative" onClick={createPlaylist}>
            <div className="h-48 border-gray-700 border-[4px] ">
              <PlusCircleOutlined className="text-gray-700 text-8xl mt-7" />
              <p className="text-gray-500 font-semibold mt-2 text-2xl">
                Create Playlist
              </p>
            </div>
          </div>
        ) : null}

        {playList.length > 0 &&
          playList.map((i) => (
            <div className="w-[32.60%] h-[250px]" key={i._id}>
              <div className=" relative">
                <Link to={`/playlist/${i._id}`}>
                  <img
                    src={
                      "https://limitlessneurolab.com/wp-content/uploads/2024/03/bg-blur-tailwind-1024x585.png" ||
                      i.videos[0].thumbnail
                    }
                    alt="PlayListimage"
                    className="h-48 "
                  />
                </Link>
                <div className="flex justify-between  px-4  absolute bottom-0 backdrop-blur w-full h-14">
                  <div className=" text-white text-left  text-sm pt-2">
                    <p>PLaylist</p>
                    <div className="flex text-xs pt-1">
                      <p>{100} Views</p> <p className="px-3"> ● </p>
                      <p>{moment(i.createdAt).fromNow()}</p>
                    </div>
                  </div>
                  <div className="text-white text-sm pt-3 ">
                    {i.videos.length} Videos
                  </div>
                </div>
              </div>
              {/* description */}
              <div className="flex justify-between text-left p-1 px-4 text-white">
                <div>
                  <p className=" text-lg">{i.name}</p>
                  <p className="text-xs text-gray-500">{i.description}</p>
                </div>
                {!isChannel ? (
                  <Popover
                    content={() => content(i._id)}
                    trigger="click"
                    color="#1e293b  "
                    placement="left"
                    arrow=""
                  >
                    <MoreOutlined className="text-lg" />
                  </Popover>
                ) : null}
              </div>
            </div>
          ))}
      </div>

      {modal ? (
        <AddPlaylistModal isOpen={modal} onClose={onClose}></AddPlaylistModal>
      ) : null}
    </>
  );
}

export default ProfilePlaylist;
