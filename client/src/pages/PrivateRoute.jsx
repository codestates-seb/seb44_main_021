import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const auth = localStorage.getItem("login");

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" {...alert("로그인이 필요합니다.")} />
  );
};

export default PrivateRoute;
