import { useState } from "react";
import Style from "./LoginPage.module.css";
import axios from "axios";
// import { useCookies } from "react-cookie";
import Logo from "../../components/Logo/Logo";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  // const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
    // console.log(loginInfo);
  };

  const handleButtonClick = () => {
    // 페이지 이동 로직을 여기에 작성
    navigate("/signup"); // 원하는 경로로 이동
  };

  const AxiosLogin = (e) => {
    e.preventDefault();
    axios
      .post("/auth/login", loginInfo)

      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          // 엑세스 토큰 저장
          const authHeader = res.headers.authorization;
          const accessToken = authHeader.split(" ")[1];
          localStorage.setItem("token", accessToken);
          // 쿠키에 리프레시 토큰 저장
          // const refreshToken = res.headers.refresh;
          // setCookie("refreshToken", refreshToken, { path: "/" });

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("token")}`;

          // console.log(accessToken);
          // console.log(cookies.refreshToken);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
        console.log("실패");
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
        <button type="submit" className={Style.loginButton}>
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
