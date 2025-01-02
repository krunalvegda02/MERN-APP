import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  let navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.isAuthenticated);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      console.log("Redirecting to login...");
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      console.log("Redirecting to home...");
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1> Loading... </h1> : <>{children}</>;
}
