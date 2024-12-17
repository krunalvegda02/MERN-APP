import React from "react";
import { Link } from "react-router-dom";

function AuthButton() {
  return (
    <div className="flex ">
      <div className="text-xl font-medium text-white px-3 py-4  h-8 flex items-center justify-center mr-3 rounded-md  border-2   w-full  bg-transparent hover:bg-violet-400 hover:text-black duration-300">
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
      <div className="text-xl font-medium text-white px-3 py-4  h-8 flex items-center justify-center rounded-md  border-2   w-full   hover:bg-violet-400 hover:text-black duration-300">
        <Link to="/register-user">
          <button>SignUp</button>
        </Link>
      </div>
    </div>
  );
}

export default AuthButton;
