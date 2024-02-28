import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const MainLayout = ({ pathname }) => {
  return (
    <>
      <Header pathname={pathname} />
      <Outlet />
    </>
  );
};

export default MainLayout;
