import React from "react";
import Style from "./UserSelectionPage.module.css";
// import { AiOutlineCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const UserSelectionPage = ({ setUserName }) => {
  const navigate = useNavigate();

  const handleClickButton = (el) => {
    setUserName(el);
    navigate(`/signup/${el}`);
  };

  return (
    <div className={Style.formContainer}>
      <div className={Style.formWrapper}>
        <img src={`${process.env.PUBLIC_URL}/image/logo2.png`} alt="logo" />
        <h1>어떤 서비스를 이용하고 싶으신가요?</h1>
        <div className={Style.userRoleForm}>
          <p>쓰지 않는 물건을 펀딩하고 싶다면</p>
          <div
            className={Style.userRoleButton}
            onClick={() => handleClickButton("users")}
          >
            {/* <AiOutlineCheckCircle className={Style.icon} /> */}
            일반 사용자로 가입
          </div>
          <p>업사이클 자제를 찾고 있다면</p>
          <div
            className={Style.userRoleButton}
            onClick={() => handleClickButton("upcycler")}
          >
            {/* <AiOutlineCheckCircle className={Style.icon} /> */}
            업사이클러로 가입
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSelectionPage;
