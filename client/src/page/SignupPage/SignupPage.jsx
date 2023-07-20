import React from "react";
import Style from "./SignupPage.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";

const SignupPage = () => {
  const NAME_REGEX = /^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,6}$/;
  const EMAIL_REGEX = /^[A-Za-z0-9.\-_]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
  const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  /* 유저 데이터 */
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    password: "",
    role: "",
    verifyPwd: "",
    authNum: "",
  });

  /* 에러메세지 */
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [pwdErrMsg, setPwdErrMsg] = useState("");
  const [nameErrMsg, setNameErrMsg] = useState("");

  /* 입력란 공백 및 유효성 통과 여부 */
  const [disabled, setDisabled] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isName, setIsName] = useState(false);

  /* 이메일 인증번호 전송 여부*/
  const [isAuthNum, setIsAuthNum] = useState("");
  const [isAuthNumSent, setIsAuthNumSent] = useState(false);

  const navigate = useNavigate();
  const storedUserRole = sessionStorage.getItem("userRole");

  /* 첫 마운트시 유저 가입 유형 데이터에 업데이트 */
  useEffect(() => {
    setUserData({ ...userData, role: storedUserRole });
  }, []);

  /* 공백시 버튼 비활성화 */
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

  /* 유효성 함수 */
  const IsValidName = () => {
    if (!NAME_REGEX.test(userData.displayName)) {
      setNameErrMsg("특수 문자 제외 2자 ~ 6자를 입력하세요.");
      setIsName(false);
    } else {
      setNameErrMsg("");
      setIsName(true);
    }
  };

  const IsValidEmail = () => {
    if (!EMAIL_REGEX.test(userData.email)) {
      setEmailErrMsg("이메일 형식에 맞지 않습니다.");
      setIsEmail(false);
    } else {
      setEmailErrMsg("");
      setIsEmail(true);
    }
  };

  const IsValidPwd = () => {
    if (!PWD_REGEX.test(userData.password)) {
      setPwdErrMsg("숫자, 문자, 특수문자 포함 5자 이상 입력하세요.");
      setIsPassword(false);
    } else if (userData.password !== userData.verifyPwd) {
      setPwdErrMsg("비밀번호가 일치하지 않습니다.");
      setIsPassword(false);
    } else {
      setPwdErrMsg("");
      setIsPassword(true);
    }
  };

  /* post 요청 함수 */
  const AxiosPost = (e) => {
    e.preventDefault();

    const { displayName, email, password, role } = userData;

    if (isPassword && isEmail && isName) {
      axios
        .post("/members/signup", { displayName, email, password, role })
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            alert("회원가입이 완료 되었습니다.");
            navigate("/login");
          }
        })
        .catch((err) => {
          if (err.response.data === "DisplayName exists") {
            console.log(err);
            setNameErrMsg("중복된 닉네임입니다.");
            setIsName(false);
          }

          if (err.response.data === "Email exists") {
            console.log(err);
            setEmailErrMsg("중복된 이메일입니다.");
            setIsEmail(false);
          }
        });
    }
  };
  /* 이메일 인증 */
  const sendAuthNumber = () => {
    const { email } = userData;

    setIsAuthNumSent(true);

    axios
      .post("/members/sendmail", { email })
      .then((res) => {
        console.log(res.data.message);
        setIsAuthNum(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CheckAuthNumber = () => {
    const { authNum } = userData;

    if (authNum === isAuthNum) {
      console.log(authNum);
      alert("인증이 완료되었습니다.");
      setIsAuthNumSent(false);
    }
    if (authNum !== isAuthNum) {
      alert("인증번호가 맞지 않습니다.");
    }
  };

  // const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className={Style.SignupformContainer}>
      <div className={Style.SignupFormWrapper} onSubmit={AxiosPost}>
        <Logo />
        <form className={Style.SignupForm}>
          <label>이메일</label>
          <div className={Style.authEmailInput}>
            <input
              type="email"
              placeholder="이메일을 입력하세요."
              onChange={handleInputValue("email")}
              onBlur={IsValidEmail}
            />

            <button className={Style.authBtn} onClick={sendAuthNumber}>
              인증번호 전송
            </button>
          </div>
          {emailErrMsg !== "" && <p className={Style.errMsg}>{emailErrMsg}</p>}
          {isAuthNumSent && (
            <>
              <label>인증번호</label>
              <div className={Style.authEmailInput}>
                <input
                  type="text"
                  placeholder="인증번호를 입력하세요."
                  onChange={handleInputValue("authNum")}
                />
                <button className={Style.authBtn} onClick={CheckAuthNumber}>
                  인증번호 확인
                </button>
              </div>
            </>
          )}

          {storedUserRole === "users" && (
            <>
              <label>닉네임</label>
              <input
                type="text"
                placeholder="닉네임을 입력하세요."
                onChange={handleInputValue("displayName")}
                onBlur={IsValidName}
              />
              {nameErrMsg !== "" && (
                <p className={Style.errMsg}>{nameErrMsg}</p>
              )}
            </>
          )}

          {storedUserRole === "upcycler" && (
            <>
              <label>업사이클러명</label>
              <input
                type="text"
                placeholder="업사이클러명을 입력하세요."
                onChange={handleInputValue("displayName")}
                onBlur={IsValidName}
              />
              {nameErrMsg !== "" && (
                <p className={Style.errMsg}>{nameErrMsg}</p>
              )}
            </>
          )}

          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            onChange={handleInputValue("password")}
            onBlur={IsValidPwd}
          />

          <label>비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호를 한번 더 입력하세요."
            onChange={handleInputValue("verifyPwd")}
            onBlur={IsValidPwd}
          />
          {pwdErrMsg !== "" && <p className={Style.errMsg}>{pwdErrMsg}</p>}

          <button
            type="submit"
            className={disabled ? Style.disabledButton : Style.submitButton}
            disabled={disabled}
          >
            sign up
          </button>
        </form>
      </div>
      {/* {isOpenModal && (
        <AlertModal
        isOpenModal ={isOpenModal}
        setIsOpenModal {setIsOpenModal}
        />
      )} */}
    </div>
  );
};

export default SignupPage;
