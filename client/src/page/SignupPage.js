import React from "react";
import Style from "./SignupPage.module.css";
import { AiOutlineCheckCircle } from "react-icons/ai";

const SignupPage = () => {
  return (
    <div className={Style.formContainer}>
      <div className={Style.formWrapper}>
        <img src={`${process.env.PUBLIC_URL}/image/logo2.png`} alt="logo" />
        <h1>어떤 서비스를 이용하고 싶으신가요?</h1>
        <div className={Style.userRoleForm}>
          <p>쓰지 않는 물건을 펀딩하고 싶다면</p>
          <div className={Style.userRoleButton}>
            <AiOutlineCheckCircle className={Style.icon} />
            일반 사용자로 가입
          </div>
          <p>업사이클 자제를 찾고 있다면</p>
          <div className={Style.userRoleButton}>
            <AiOutlineCheckCircle className={Style.icon} />
            업사이클러로 가입
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
