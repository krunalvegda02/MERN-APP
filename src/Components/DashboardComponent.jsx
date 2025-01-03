import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EyeTwoTone,
  EditFilled,
  DeleteFilled,
  UserAddOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import { Switch, message, Modal } from "antd";
import { Avatar, Loading, Container, UploadVideo } from "../index";
import axios from "axios";

function DashboardComponent() {
  const navigate = useNavigate();
  const [editVideoId, setEditVideoId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [statData, setStatData] = useState(null);
  const [videoData, setvideoData] = useState(null);
  const [loading, setloading] = useState(false);
  // const views = 0;

  const DeleteVideo = (i) => {
    setloading(true);
    Modal.confirm({
      title: "Are you sure you want to delete this Video?",
      onOk: () => {
        axios
          .delete(`/api/v1/videos/${i._id}`)
          .then(() => {
            setloading(false);
            message.success("Video Deleted Successfully");
          })
          .catch((err) => {
            message.error("Error deleting Video");
            console.log("DELETE ERR:", err);
            setloading(false);
          });
      },
      onCancel: () => {
        setloading(false);
        message.info("Video deletion canceled.");
      },
    });
  };

  const EditVideo = (i) => {
    setEditVideoId(i._id);
    setIsEditModalOpen(true);
  };

  const handleUploadVideo = () => {
    setIsUploadModalOpen(true);
  };
  const handleCloseEditModel = () => {
    setIsEditModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsUploadModalOpen(false);
  };

  const togglePublish = (id) => {
    setloading(true);
    axios
      .patch(`/api/v1/videos/toggle/publish/${id}`)
      .then((res) => {
        console.log("toggle publsih:", res);
        message.success("Video Publish Status Changed");
        setloading(false);
      })
      .catch(() => {
        setloading(false);
        message.error("Error Occured!");
      });
  };

  useEffect(() => {
    axios
      .get("api/v1/dashboard/stats")
      .then((res) => {
        console.log("API RES:", res.data.data);
        setStatData(res.data.data);
      })
      .catch((err) => {
        console.log("API ERR:", err);
      });

    axios
      .get("api/v1/dashboard/videos")
      .then((res) => {
        console.log("API RES:", res.data.data);
        setvideoData(res.data.data);
      })
      .catch((err) => {
        console.log("API ERR:", err);
      });
  }, [loading, isEditModalOpen, isUploadModalOpen]);

  if (!(statData && videoData)) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  // const TotalViews ={
  //   videoData.views.map((view) => {
  //     views += view;
  //   });
  // }
  // console.log("Total viewa", TotalViews );

  return (
    <div className="p-10">
      {/* Introduction */}
      <div className="text-white text-start">
        <div className="flex justify-between">
          <div>
            <p className="text-4xl font-serif">
              Hello, {statData.userdata.fullname}
            </p>
            <p className="text-sm text-gray-500">
              Track, Manage and Analys your Viewers
            </p>
          </div>
          <div
            className="border-2 bg-violet-500 h-9 px-4 flex items-center cursor-pointer"
            onClick={handleUploadVideo}
          >
            Upload Video
          </div>
        </div>
      </div>

      {/* Total followers, views, likes */}
      <div className="mt-5 flex justify-between">
        <div className="border w-[30%] h-36 text-start p-4">
          <EyeTwoTone
            twoToneColor="#7c3aed"
            className="text-3xl border-violet-500 rounded-full bg-violet-400 p-1"
          />
          <p className="mt-3.5 text-white text-xs">Total Views</p>
          <p className="mt-2 font-bold font-mono text-white text-3xl">
            {statData.totalViews[0]?.totalViews || 0}
          </p>
        </div>
        <div className="border w-[30%] h-36 text-start p-4">
          <UserAddOutlined className="text-2xl text-white border-violet-600 rounded-full bg-violet-400 p-1.5" />
          <p className="mt-3.5 text-white text-xs">Total Followers</p>
          <p className="mt-2 font-bold font-mono text-white text-3xl">
            {statData.totalSubscribers}
          </p>
        </div>
        <div className="border w-[30%] h-36 text-start p-4">
          <HeartTwoTone
            twoToneColor="#7c3aed"
            className="text-3xl rounded-full bg-violet-400 p-1"
          />
          <p className="mt-3.5 text-white text-xs">Total Likes</p>
          <p className="mt-2 font-bold font-mono text-white text-3xl">
            {statData.totalLikes[0]?.totalLikes || 0}
          </p>
        </div>
      </div>

      {/* Data Analysis Table */}
      <div className="border w-full rounded-sm mt-3">
        {/* Table Header */}
        <div
          className="grid border font-medium px-3 py-1 text-base text-white text-left bg-slate-700"
          style={{
            gridTemplateColumns: "80px 128px 1fr 170px 150px 60px",
          }}
        >
          <div className="text-left">Status</div>
          <div className="text-left">Status</div>
          <div className="text-left">Uploaded</div>
          <div className="text-left">Ratings</div>
          <div className="text-left">Date Uploaded</div>
          <div className="text-left">Actions</div>
        </div>

        {/* Table Body */}
        {videoData.length > 0 &&
          videoData.map((i) => {
            return (
              <div
                key={i._id}
                className="grid text-sm h-12 text-white text-left px-3 py-1 border items-center"
                style={{
                  gridTemplateColumns: "80px 100px 1fr 170px 150px 60px",
                }}
              >
                <div className="flex justify-left">
                  <Switch
                    className="bg-slate-700"
                    checked={i.isPublished}
                    onChange={() => togglePublish(i._id)}
                    size="small"
                  />
                </div>
                <div className="text-start">
                  {i.isPublished ? (
                    <p className="border-2 text-green-400 border-green-400 px-1 py-0.5 text-center rounded-xl ">
                      Published
                    </p>
                  ) : (
                    <p className="border-2 text-red-400 border-red-400 px-1 py-0.5 text-center rounded-xl ">
                      Unpublished
                    </p>
                  )}
                </div>
                <div className="ml-7 text-start">
                  <div className="flex ">
                    <Avatar h={30} w={30} src={i.thumbnail} />
                    <p className="truncate max-w-[250px] ml-1 items-center flex">
                      {i.title}
                    </p>
                  </div>
                </div>
                <div className="text-start flex">
                  <p className="mr-1 bg-green-100 text-green-600 px-1 py-0.5 rounded-md">
                    {i.likes} Likes
                  </p>
                </div>
                <div className="text-start">
                  {new Date(i.createdAt).toLocaleDateString()}
                </div>
                <div className="flex  gap-3">
                  <EditFilled
                    className=" text-green-300 text-xl"
                    onClick={() => EditVideo(i)}
                  />
                  <DeleteFilled
                    className="text-red-400 text-xl"
                    onClick={() => DeleteVideo(i)}
                  />
                </div>
              </div>
            );
          })}
      </div>
      {isUploadModalOpen && (
        <UploadVideo isOpen={isUploadModalOpen} onClose={handleCloseModal} />
      )}
      {isEditModalOpen && (
        <UploadVideo
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModel}
          isEditVideo={true}
          editVideoId={editVideoId}
        />
      )}
    </div>
  );
}

export default DashboardComponent;
