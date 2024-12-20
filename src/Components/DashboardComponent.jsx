import React from "react";

function DashboardComponent() {
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
          <div className="border-2 bg-violet-500 h-9 p-2 pb-1">
            <div>Upload Video</div>
          </div>
        </div>
      </div>
      {/* total followers total views total likes */}
      <div className="mt-7 flex justify-between">
        <div className="border w-[30%] h-32">efvnjred</div>
        <div className="border w-[30%]">nvjkbkdes</div>
        <div className="border w-[30%]">rgreger</div>
      </div>
      {/* dashboard : STATUS TOGGLE STATUS RATINGS DATE */}
      <div className="border w-full rounded-sm mt-3">
        <div className="flex justify-between text-white">
          <p>Status</p>
          <p>Status</p>
          <p>Uploaded</p>
          <p>Ratings</p>
          <p> Date Uploaded</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardComponent;
