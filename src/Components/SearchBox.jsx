import React from "react";
import { SearchOutlined } from "@ant-design/icons";

function SearchBox({ placeholder }) {
  return (
    <div className="flex">
      <input
        type="text"
        placeholder={placeholder}
        onFocus={null}
        className={`text-white focus:outline-none  border rounded-md border-r-0 rounded-r-none border-white bg-slate-950  h-9  p-2 w-72 placeholder-gray-400 `}
      />
      <button className="text-white">
        <SearchOutlined className="px-2 text-[19px] bg-slate-950 h-9 border rounded-md rounded-l-none border-l-0" />
      </button>
    </div>
  );
}

export default SearchBox;
