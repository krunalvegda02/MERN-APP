import { Button } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";

export default function SubscribeBtn({ id }) {
  return (
    <Button className="h-8 p-2 px-4 border-gray-600 border text-black rounded-2xl bg-violet-400 text-center">
      <p className="text-lg font-semibold">
        
        <PlusOutlined className="pr-0.5 text-base" /> Follow
      </p>
    </Button>
  );
}
