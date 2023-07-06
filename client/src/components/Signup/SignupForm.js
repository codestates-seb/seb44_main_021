import { useState } from "react";
import Style from "./SignupForm.module.css";
import axios from "axios";

const SignupForm = ({ userName }) => {
  const [userData, setUserData] = useState({
    displayName: "",
    password: "",
    email: "",
  });

  const handleInputValue = (key) => (e) => {
    setUserData({ ...userData, [key]: e.target.value });
    console.log(userData);
  };

  const AxiosData = (e) => {
    e.preventDefault();
    console.log(userName);
    axios
      .post(
        `http://ec2-43-201-105-214.ap-northeast-2.compute.amazonaws.com:8080/members/${userName}`,
        userData
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={Style.formContainer}>
      <form className={Style.formWrapper} onSubmit={AxiosData}>
        <img src={`${process.env.PUBLIC_URL}/image/logo2.png`} alt="logo" />
        {userName === "users" && (
          <>
            <p>닉네임</p>
            <input
              type="text"
              placeholder="닉네임을 입력하세요."
              onChange={handleInputValue("displayName")}
            />
          </>
        )}
        {userName === "upcycler" && (
          <>
            <p>업사이클러명</p>
            <input
              type="text"
              placeholder="업사이클러명을 입력하세요."
              onChange={handleInputValue("displayName")}
            />
          </>
        )}

        <p>이메일</p>
        <input
          type="email"
          placeholder="이메일을 입력하세요."
          onChange={handleInputValue("email")}
        />
        <p>비밀번호</p>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요."
          onChange={handleInputValue("password")}
        />
        <p>비밀번호 확인</p>
        <input type="password" placeholder="비밀번호를 한번 더 입력하세요." />
        <button type="submit" className={Style.submitButton}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
