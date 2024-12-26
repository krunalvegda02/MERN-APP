import React, { useEffect, useState } from "react";
import { AddPlaylistModal, Container, Loading } from "../../index";
import axios from "axios";
import { PlusCircleOutlined } from "@ant-design/icons";

function ProfilePlaylist({ isChannel, channelId }) {
  const [playList, setPlaylist] = useState(null);
  const [modal, setmodal] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/v1/playlist/user/${channelId}`)
      .then((res) => {
        console.log("Playlist response:", res.data.data);
        setPlaylist(res.data.data);
      })
      .catch((err) => {
        console.log("Playlist err:", err);
      });
  }, [onClose]);

  const createPlaylist = () => {
    setmodal(true);
  };

  const onClose = () => {
    setmodal(false);
  };

  if (!playList) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-wrap gap-[0.6rem] mb-2">
        <div className="w-[32.60%]   relative" onClick={createPlaylist}>
          <div className="h-48 border-gray-700 border-[4px] ">
            <PlusCircleOutlined className="text-gray-700 text-8xl mt-7" />
            <p className="text-gray-500 font-semibold mt-2 text-2xl">
              Create Playlist
            </p>
          </div>
        </div>

        {playList.length > 0 &&
          playList.map((i) => (
            <div className="w-[32.60%] h-[250px]" key={i._id}>
              <div className=" relative">
                <img
                  src={
                    "https://limitlessneurolab.com/wp-content/uploads/2024/03/bg-blur-tailwind-1024x585.png" ||
                    i.videos[0].thumbnail
                  }
                  alt="PlayListimage"
                  className="h-48 "
                />
                <div className="flex justify-between  px-4  absolute bottom-0 backdrop-blur w-full h-14">
                  <div className=" text-white text-left  text-sm pt-2">
                    <p>PLaylist</p>
                    <div className="flex text-xs pt-1">
                      <p>{100} Views</p> <p className="px-3"> ● </p>
                      <p>{new Date(i.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-white text-sm pt-3 ">
                    {i.videos.length} Videos
                  </div>
                </div>
              </div>
              {/* description */}
              <div className=" text-left p-1 px-4 text-white">
                <p className=" text-lg">{i.name}</p>
                <p className="text-xs text-gray-500">{i.description}</p>
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
