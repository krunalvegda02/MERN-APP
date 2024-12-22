import React from "react";
import { Link } from "react-router-dom";
import LeftNavbarItemBox from "../Components/LeftNavbarItemBox";
import { HomeOutlined, LikeOutlined, HistoryOutlined } from "@ant-design/icons";
import { Container } from "../index";

function Settings() {
  const settingItems = [
    {
      itemName: "Edit Profile",
      itemIcon: <HomeOutlined className="text-2xl px-2 text-white" />,
      link: "/edit-profile",
    },
    {
      itemName: "Change Password",
      itemIcon: <LikeOutlined className="text-2xl px-2 text-white" />,
      link: "/change-password",
    },
    {
      itemName: "LogPut !",
      itemIcon: <HistoryOutlined className="text-2xl px-2 text-white" />,
      link: "/logout",
    },
  ];

  return (
    <Container>
      <div className="" >
      <div className="pt-2">
        {settingItems.map((item) => (
          <Link to={item.link} key={item.link}>
            <LeftNavbarItemBox
              key={item.itemName}
              name={item.itemName}
              icon={item.itemIcon}
            />
          </Link>
        ))}
      </div>
      </div>
     
    </Container>
  );
}

export default Settings;
