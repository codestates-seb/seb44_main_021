import React from "react";
import Style from "./UserSelectionPage.module.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";

const UserSelectionPage = () => {
  const navigate = useNavigate();

  const handleClickButton = (el) => {
    sessionStorage.setItem("userName", el);
    navigate(`/signup/${el}`);
  };

  return (
    <div className={Style.formContainer}>
      <div className={Style.formWrapper}>
        <Logo />
        <h1>어떤 서비스를 이용하고 싶으신가요?</h1>

        <div className={Style.userRoleForm}>
          <p>쓰지 않는 물건을 펀딩하고 싶다면</p>
          <div
            className={Style.userRoleButton}
            onClick={() => handleClickButton("users")}
          >
            <CheckCircleOutlineIcon className={Style.icon} />
            일반 사용자로 가입
          </div>

          <p>업사이클 자제를 찾고 있다면</p>
          <div
            className={Style.userRoleButton}
            onClick={() => handleClickButton("upcycler")}
          >
            <CheckCircleOutlineIcon className={Style.icon} />
            업사이클러로 가입
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSelectionPage;
