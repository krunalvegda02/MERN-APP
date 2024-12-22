import React, { useState } from "react";
import {
  EyeTwoTone,
  EditFilled,
  DeleteFilled,
  UserAddOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import { Switch } from "antd";
import { Avatar } from "../index";

function DashboardComponent() {
  const [published, setpublished] = useState(true);

  const togglePublish = (checked) => {
    setpublished(checked);
  };

  return (
    <div className="p-10">
      {/* Introduction */}
      <div className="text-white text-start">
        <div className="flex justify-between">
          <div>
            <p className="text-4xl font-serif"> Hello, {"Krunal Vegda"}</p>
            <p className="text-sm text-gray-500">
              Track, Manage and Analys your Viewers
            </p>
          </div>
          <div className="border-2 bg-violet-500 h-9 px-4 flex items-center cursor-pointer">
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
            {34349}
          </p>
        </div>
        <div className="border w-[30%] h-36 text-start p-4">
          <UserAddOutlined className="text-2xl text-white border-violet-600 rounded-full bg-violet-400 p-1.5" />
          <p className="mt-3.5 text-white text-xs">Total Followers</p>
          <p className="mt-2 font-bold font-mono text-white text-3xl">
            {34349}
          </p>
        </div>
        <div className="border w-[30%] h-36 text-start p-4">
          <HeartTwoTone
            twoToneColor="#7c3aed"
            className="text-3xl rounded-full bg-violet-400 p-1"
          />
          <p className="mt-3.5 text-white text-xs">Total Likes</p>
          <p className="mt-2 font-bold font-mono text-white text-3xl">
            {34349}
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
        <div
          className="grid text-sm h-12 text-white text-left px-3 py-1 border items-center"
          style={{
            gridTemplateColumns: "80px 100px 1fr 170px 150px 60px",
          }}
        >
          <div className="flex justify-left">
            <Switch
              className="bg-slate-700"
              checked={published}
              onChange={togglePublish}
              size="small"
            />
          </div>
          <div className="text-start">
            {published ? (
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
              <Avatar h={30} w={30} />
              <p className="truncate max-w-[150px] ml-1 items-center flex">
                t. Aperiam, officiis.
              </p>
            </div>
          </div>
          <div className="text-start flex">
            <p className="mr-1 bg-green-100 text-green-600 px-1 py-0.5 rounded-md">
              {155} Likes
            </p>
            <p className="bg-red-100 text-red-600 px-1 py-0.5 rounded-md">
              {499} Dislikes
            </p>
          </div>
          <div className="text-start">21/21/21</div>
          <div className="flex  gap-3">
            <EditFilled className=" text-green-300 text-xl" />
            <DeleteFilled className="text-red-400 text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardComponent;
