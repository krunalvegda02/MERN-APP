import React from "react";

function AuthButton() {
  return (
    <div className="flex ">
      <div  className="text-xl font-medium text-white px-3 py-4  h-8 flex items-center justify-center mr-3 rounded-md  border-2   w-full  bg-transparent hover:bg-violet-600 hover:text-black duration-300">
        <button>Login</button>
      </div>
      <div className="text-xl font-medium text-white px-3 py-4  h-8 flex items-center justify-center rounded-md  border-2   w-full   hover:bg-violet-600 hover:text-black duration-300">
        <button>SignUp</button>
      </div>
    </div>
  );
}

export default AuthButton;
