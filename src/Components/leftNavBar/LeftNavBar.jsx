import React, { useState } from "react";
import { Settings } from "../../index";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  LikeOutlined,
  CreditCardOutlined,
  VideoCameraOutlined,
  HistoryOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import LeftNavbarItemBox from "../LeftNavbarItemBox";
import { useSelector } from "react-redux";

function LeftNavBar() {
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();
  const username = useSelector((state) => state.userData.username);

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleBackToMainNav = () => {
    setShowSettings(false);
  };

  const profileOpen = () => {
    const isChannel = false;
    navigate(`/profile/${username}`, {
      state: { isChannel },
    });
  };

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
      itemName: "My Profile",
      itemIcon: <UserOutlined className="text-2xl px-2 text-white" />,
      onClick: profileOpen, // Use onClick for navigation
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
      link: "#",
      onClick: handleSettingsClick,
    },
  ];

  return (
    <div className="fixed top-[3.5rem] left-0 h-[calc(100vh-3.5rem)] w-[235px] border-r border-white-300">
      {/* Upper Section */}
      <div className="pt-2">
        {UpperNavItems.map((item) =>
          item.onClick ? (
            <div
              key={item.itemName}
              onClick={item.onClick}
              className="cursor-pointer"
            >
              <LeftNavbarItemBox name={item.itemName} icon={item.itemIcon} />
            </div>
          ) : (
            <Link to={item.link} key={item.itemName}>
              <LeftNavbarItemBox name={item.itemName} icon={item.itemIcon} />
            </Link>
          )
        )}
      </div>

      {/* Lower Section */}
      <div className="absolute bottom-2">
        {lowerNavItems.map((item) => (
          <Link
            to={item.link}
            onClick={item.onClick || null}
            key={item.itemName}
          >
            <LeftNavbarItemBox
              key={item.itemName}
              name={item.itemName}
              icon={item.itemIcon}
            />
          </Link>
        ))}
      </div>

      {/* Settings Navbar */}
      <Settings show={showSettings} onBack={handleBackToMainNav} />
    </div>
  );
}

export default LeftNavBar;
