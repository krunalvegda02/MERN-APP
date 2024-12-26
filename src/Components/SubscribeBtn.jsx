import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

export default function SubscribeBtn({ isSubscribed, channelId }) {
  console.log("isSubscribed", isSubscribed);

  const [subscribeBtnClick, setSubscribeBtnClick] = useState(0);

  useEffect(() => {
    axios
      .post(`/api/v1/subscriptions/c/${channelId}`)
      .then((res) => {
        setSubscribeBtnClick(1)
        console.log("API RES:", res);
      })
      .catch((err) => {
        console.log("API ERR:", err);
      });
  }, []);

  const toggleSubscriber = () => {
    setSubscribeBtnClick(!isSubscribed);
  };

  return (
    <Button
      className={`h-8 p-2 px-2 border-gray-600 border text-black rounded-2xl text-center  ${
        !isSubscribed ? "bg-violet-400" : "bg-gray-600"
      }`}
      onClick={toggleSubscriber}
    >
      {!isSubscribed ? (
        <p className="text-lg font-semibold ">
          <PlusOutlined className="pr-0.5 text-base" /> Follow
        </p>
      ) : (
        <p className="text-base font-semibold ">Unsubscribe</p>
      )}
    </Button>
  );
}
