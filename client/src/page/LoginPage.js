import { useState } from "react";
import Style from "./LoginPage.module.css";
import axios from "axios";

const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
    console.log(loginInfo);
  };

  const AxiosLogin = async () => {
    await axios
      .post(
        "ec2-43-201-105-214.ap-northeast-2.compute.amazonaws.com:8080/members/login",
        loginInfo
      )

      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          const authHeader = res.headers.authorization;
          const accessToken = authHeader.split(" ")[1];

          axios.defaults.headers.common[
            "authorization"
          ] = `Bearer ${accessToken}`;

          console.log("성공");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log("실패");
      });
  };

  return (
    <div id={Style.loginContainer}>
      <form id={Style.loginInputContainer} onSubmit={AxiosLogin}>
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
