import { useState, useEffect } from "react";
import Style from "./LoginPage.module.css";
import axios from "axios";
import Logo from "../../components/Logo/Logo";
import { useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleButtonClick = () => {
    navigate("/signup");
  };

  useEffect(() => {
    const blankData = loginInfo.username && loginInfo.password;
    setDisabled(!blankData);
  }, [loginInfo]);

  const AxiosLogin = (e) => {
    e.preventDefault();
    axios
      .post("/auth/login", loginInfo)
      .then((res) => {
        if (res.status === 200) {
          // 엑세스 토큰 저장
          const authHeader = res.headers.authorization;
          const accessToken = authHeader.split(" ")[1];
          localStorage.setItem("token", accessToken);

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("token")}`;

          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response.data === "Member not found") {
          alert("이메일 또는 비밀번호를 확인하세요.");
        }
      });
  };

  return (
    <div id={Style.loginContainer} onSubmit={AxiosLogin}>
      <form className={Style.loginWrapper}>
        <Logo />
        <label>
          이메일
          <input
            type="email"
            placeholder="이메일을 입력해주세요."
            onChange={handleInputValue("username")}
          ></input>
        </label>
        <label>
          비밀번호
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={handleInputValue("password")}
          ></input>
        </label>

        <button
          type="submit"
          className={disabled ? Style.disabledButton : Style.loginButton}
          disabled={disabled}
        >
          login
        </button>
        <p>아직 이은의 회원이 아니라면,</p>
        <button className={Style.signupButton} onClick={handleButtonClick}>
          signup
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

// const GoogleLoginBtn = () => {
//   const oauthLoginClick = () => {
//     window.location.href = "https://re21.store/oauth2/authorization/google";
//   };
//   return (
//     <div className={Style.oauthBtnContainer} onClick={oauthLoginClick}>
//       <FcGoogle style={{ fontSize: "20px", marginRight: "5px" }} />
//       구글 계정으로 로그인하기
//     </div>
//   );
// };
