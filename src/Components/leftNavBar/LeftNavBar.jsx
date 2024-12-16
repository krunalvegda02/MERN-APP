import React from "react";
import LeftNavbarItemBox from "../LeftNavbarItemBox";
import {
  HomeOutlined,
  LikeOutlined,
  CreditCardOutlined,
  VideoCameraOutlined,
  HistoryOutlined,
  SettingOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";

function LeftNavBar() {
  const UpperNavItems = [
    {
      itemName: "Home ",
      itemIcon: <HomeOutlined className="text-2xl pr-3 pl-0.5 text-white" />,
    },
    {
      itemName: "Liked Videos",
      itemIcon: <LikeOutlined className="text-2xl pr-3 pl-0.5 text-white" />,
    },
    {
      itemName: "History",
      itemIcon: <HistoryOutlined className="text-2xl pr-3 pl-0.5 text-white" />,
    },
    {
      itemName: "My Content",
      itemIcon: (
        <VideoCameraOutlined className="text-2xl pr-3 pl-0.5 text-white" />
      ),
    },
    {
      itemName: "My PlayLists",
      itemIcon: (
        <FolderOpenOutlined className="text-2xl pr-3 pl-0.5 text-white" />
      ),
    },
  ];
  const lowerNavItems = [
    {
      itemName: "My DashBoard",
      itemIcon: <CreditCardOutlined className="text-2xl pr-3 pl-0.5 text-white" />,
    },
    {
      itemName: "Settings",
      itemIcon: <SettingOutlined className="text-2xl pr-3 pl-0.5 text-white" />,
    },
  ];
  return (
    <div className="h-screen">
      {/* Full height of the screen */}
      <div className="flex flex-col justify-between h-full w-[260px]  left-0 top-0 border-r border-b border-white  ">
        <div className="pt-1 ">
          <div>
            {UpperNavItems.map((item) => {
              return (
                <LeftNavbarItemBox
                  key={item.itemName}
                  name={item.itemName}
                  icon={item.itemIcon}
                />
              );
            })}
          </div>
        </div>
        <div className="mb-4">
          <div>
            {lowerNavItems.map((item) => {
              return (
                <LeftNavbarItemBox
                  key={item.itemName}
                  name={item.itemName}
                  icon={item.itemIcon}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftNavBar;
