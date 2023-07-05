import { useState } from "react";
import Style from "./LoginPage.module.css";
import axios from "axios";
import { useCookies } from "react-cookie";

const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });
  const [cookies, setCookie] = useCookies();

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
    console.log(loginInfo);
  };

  const AxiosLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://ec2-43-201-105-214.ap-northeast-2.compute.amazonaws.com:8080/auth/login",
        loginInfo
      )

      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          // 엑세스 토큰 저장
          const authHeader = res.headers.authorization;
          const accessToken = authHeader.split(" ")[1];
          // 쿠키에 리프레시 토큰 저장
          const refreshToken = res.headers.refresh;
          setCookie("refreshToken", refreshToken, { path: "/" });

          // axios.defaults.headers.common[
          //   "Authorization"
          // ] = `Bearer ${accessToken}`;

          console.log(accessToken);
          console.log(cookies.refreshToken);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log("실패");
      });
  };

  return (
    <div id={Style.loginContainer} onSubmit={AxiosLogin}>
      <form id={Style.loginInputContainer}>
        <input
          className={Style.loginInput}
          type="email"
          placeholder="이메일을 입력해주세요."
          onChange={handleInputValue("username")}
        ></input>

        <input
          className={Style.loginInput}
          type="password"
          placeholder="비밀번호를 입력해주세요."
          onChange={handleInputValue("password")}
        ></input>
        <button type="submit" className={Style.loginButton}>
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
