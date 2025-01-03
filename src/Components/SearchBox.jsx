import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import SearchModal from "./SearchModal";

function SearchBox({ placeholder }) {
  const [inputValue, setInputValue] = useState("");
  const [searchUserModal, setSearchUserModal] = useState(false);

  console.log(inputValue);

  const searchUser = () => {
    setSearchUserModal(true);
    // setInputValue("");
  };

  const closeModal = () => {
    setSearchUserModal(false);
    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchUser();
    }
  };

  return (
    <div>
      <div className="flex">
        <input
          type="text"
          name="username"
          placeholder={placeholder}
          value={inputValue}
          onFocus={null}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className={`text-white focus:outline-none  border rounded-md border-r-0 rounded-r-none border-white bg-slate-950  h-9  p-2 w-72 placeholder-gray-400 `}
        />
        <button
          className="text-white"
          onClick={() => {
            searchUser();
          }}
        >
          <SearchOutlined className="px-2 text-[19px] bg-slate-950 h-9 border rounded-md rounded-l-none border-l-0" />
        </button>
      </div>
      {searchUserModal && (
        <SearchModal
          isOpen={searchUserModal}
          onClose={closeModal}
          username={inputValue}
        />
      )}
    </div>
  );
}

export default SearchBox;
