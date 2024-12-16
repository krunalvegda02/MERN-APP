import React from "react";
import { Link } from "react-router-dom";
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
    {
      itemName: "Home",
      itemIcon: <HomeOutlined className="text-2xl px-2 text-white" />,
      link: "/",
    },
    {
      itemName: "Liked Videos",
      itemIcon: <LikeOutlined className="text-2xl px-2 text-white" />,
      link: "/likes",
    },
    {
      itemName: "History",
      itemIcon: <HistoryOutlined className="text-2xl px-2 text-white" />,
      link: "/watch-history",
    },
    {
      itemName: "My Content",
      itemIcon: <VideoCameraOutlined className="text-2xl px-2 text-white" />,
      link: "/my-content",
    },
    {
      itemName: "My PlayLists",
      itemIcon: <FolderOpenOutlined className="text-2xl px-2 text-white" />,
      link: "/playlist",
    },
  ];
  const lowerNavItems = [
    {
      itemName: "My DashBoard",
      itemIcon: <CreditCardOutlined className="text-2xl px-2 text-white" />,
      link: "/dashboard",
    },
    {
      itemName: "Settings",
      itemIcon: <SettingOutlined className="text-2xl px-2 text-white" />,
      link: "/settings",
    },
  ];

  return (
    <div className="fixed top-[3.5rem] left-0 h-[calc(100vh-3.5rem)] w-[260px]  border-r border-white-300">
      {/* Upper Section */}
      <div className="pt-2">
        {UpperNavItems.map((item) => (
          <Link to={item.link}>
            <LeftNavbarItemBox
              key={item.itemName}
              name={item.itemName}
              icon={item.itemIcon}
            />
          </Link>
        ))}
      </div>

      {/* Lower Section */}
      <div className="absolute bottom-2">
        {lowerNavItems.map((item) => (
          <Link to={item.link}>
            <LeftNavbarItemBox
              key={item.itemName}
              name={item.itemName}
              icon={item.itemIcon}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LeftNavBar;
