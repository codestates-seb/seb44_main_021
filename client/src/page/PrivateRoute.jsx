import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component }) => {
  const auth = localStorage.getItem("login");

  return auth ? (
    component
  ) : (
    <Navigate to="/login" {...alert("로그인이 필요합니다.")}></Navigate>
  );
};

export default PrivateRoute;
