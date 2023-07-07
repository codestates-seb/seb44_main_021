import React from "react";
import Style from "./SignupPage.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

const SignupPage = ({ userName }) => {
  const NAME_REGEX = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
  const EMAIL_REGEX = /^[A-Za-z0-9.\-_]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
  const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    password: "",
    verifyPwd: "",
  });

  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [pwdErrMsg, setPwdErrMsg] = useState("");
  const [nameErrMsg, setNameErrMsg] = useState("");
  const [disabled, setDisabled] = useState(false);

  // 공백시 버튼 비활성화
  useEffect(() => {
    const blankData =
      userData.displayName &&
      userData.email &&
      userData.password &&
      userData.verifyPwd;
    setDisabled(!blankData);
  }, [userData]);

  const handleInputValue = (key) => (e) => {
    setUserData({ ...userData, [key]: e.target.value });
  };

  // 유효성 검사 함수
  const IsValidName = () => {
    if (!NAME_REGEX.test(userData.displayName)) {
      setNameErrMsg("특수 문자 제외 2자 ~ 10자를 입력하세요.");
    } else {
      setNameErrMsg("");
    }
  };

  const IsValidEmail = () => {
    if (!EMAIL_REGEX.test(userData.email)) {
      setEmailErrMsg("이메일 형식에 맞지 않습니다.");
    } else {
      setEmailErrMsg("");
    }
  };

  const IsValidPwd = () => {
    if (!PWD_REGEX.test(userData.password)) {
      setPwdErrMsg("숫자 ,문자, 특수문자 포함 8자 이상 입력하세요.");
    } else if (userData.password !== userData.verifyPwd) {
      setPwdErrMsg("비밀번호가 일치하지 않습니다.");
    } else {
      setPwdErrMsg("");
    }
  };

  //axios post 요청 함수
  const AxiosPost = (e) => {
    e.preventDefault();

    const { displayName, email, password } = userData;

    if (!(pwdErrMsg && emailErrMsg && nameErrMsg)) {
      axios
        .post(
          `http://ec2-43-201-105-214.ap-northeast-2.compute.amazonaws.com:8080/members/${userName}`,
          { displayName, email, password }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          if (err.response.data === "DisplayName exists") {
            console.log(err);
            setNameErrMsg("닉네임 중복");
          }

          if (err.response.data === "Email exists") {
            console.log(err);
            setEmailErrMsg("이메일 중복");
          }
        });
    }
  };

  return (
    <div className={Style.formContainer}>
      <form onSubmit={AxiosPost}>
        <img src={`${process.env.PUBLIC_URL}/image/logo2.png`} alt="logo" />

        <label>
          이메일
          <input
            type="email"
            placeholder="이메일을 입력하세요."
            onChange={handleInputValue("email")}
            onBlur={IsValidEmail}
          />
          {emailErrMsg !== "" && <p className={Style.errMsg}>{emailErrMsg}</p>}
        </label>

        {userName === "users" && (
          <>
            <label>
              닉네임
              <input
                type="text"
                placeholder="닉네임을 입력하세요."
                onChange={handleInputValue("displayName")}
                onBlur={IsValidName}
              />
              {nameErrMsg !== "" && (
                <p className={Style.errMsg}>{nameErrMsg}</p>
              )}
            </label>
          </>
        )}

        {userName === "upcycler" && (
          <>
            <label>
              업사이클러명
              <input
                type="text"
                placeholder="업사이클러명을 입력하세요."
                onChange={handleInputValue("displayName")}
                onBlur={IsValidName}
              />
              {nameErrMsg !== "" && (
                <p className={Style.errMsg}>{nameErrMsg}</p>
              )}
            </label>
          </>
        )}

        <label>
          비밀번호
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            onChange={handleInputValue("password")}
            onBlur={IsValidPwd}
          />
        </label>

        <label>
          비밀번호 확인
          <input
            type="password"
            placeholder="비밀번호를 한번 더 입력하세요."
            onChange={handleInputValue("verifyPwd")}
            onBlur={IsValidPwd}
          />
          {pwdErrMsg !== "" && <p className={Style.errMsg}>{pwdErrMsg}</p>}
        </label>

        <button
          type="submit"
          className={disabled ? Style.disabledButton : Style.submitButton}
          disabled={disabled}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
