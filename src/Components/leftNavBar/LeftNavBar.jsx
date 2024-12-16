import React from "react";
import {
  HomeOutlined,
  LikeOutlined,
  CreditCardOutlined,
  VideoCameraOutlined,
  HistoryOutlined,
  SettingOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import LeftNavbarItemBox from "../LeftNavbarItemBox";

function LeftNavBar() {
  const UpperNavItems = [
    { itemName: "Home", itemIcon: <HomeOutlined className="text-2xl" /> },
    { itemName: "Liked Videos", itemIcon: <LikeOutlined className="text-2xl" /> },
    { itemName: "History", itemIcon: <HistoryOutlined className="text-2xl" /> },
    { itemName: "My Content", itemIcon: <VideoCameraOutlined className="text-2xl" /> },
    { itemName: "My PlayLists", itemIcon: <FolderOpenOutlined className="text-2xl" /> },
  ];
  const lowerNavItems = [
    { itemName: "My DashBoard", itemIcon: <CreditCardOutlined className="text-2xl" /> },
    { itemName: "Settings", itemIcon: <SettingOutlined className="text-2xl" /> },
  ];

  return (
    <div className="fixed top-[3.5rem] left-0 h-[calc(100vh-3.5rem)] w-[260px]  border-r border-white-300">
      {/* Upper Section */}
      <div className="pt-2">
        {UpperNavItems.map((item) => (
          <LeftNavbarItemBox
            key={item.itemName}
            name={item.itemName}
            icon={item.itemIcon}
          />
        ))}
      </div>

      {/* Lower Section */}
      <div className="absolute bottom-2">
        {lowerNavItems.map((item) => (
          <LeftNavbarItemBox
            key={item.itemName}
            name={item.itemName}
            icon={item.itemIcon}
          />
        ))}
      </div>
    </div>
  );
}

export default LeftNavBar;
