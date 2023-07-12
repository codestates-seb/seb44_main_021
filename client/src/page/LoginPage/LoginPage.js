import { useState, useContext } from "react";
import Style from "./LoginPage.module.css";
import axios from "axios";
import Logo from "../../components/Logo/Logo";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../contexts/UserDataContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserDataContext);
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
    // console.log(loginInfo);
  };

  const handleButtonClick = () => {
    navigate("/signup");
  };

  const AxiosLogin = (e) => {
    e.preventDefault();
    axios
      .post("/auth/login", loginInfo)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          // 엑세스 토큰 저장
          const memberId = res.headers.memberid;
          const authHeader = res.headers.authorization;
          const accessToken = authHeader.split(" ")[1];
          localStorage.setItem("token", accessToken);

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("token")}`;

          axios.get(`/members/${memberId}`).then((res) => {
            const user = res.data.data;
            setUserData({
              ...userData,
              createdAt: user.createdAt,
              displayName: user.displayName,
              email: user.email,
              memberId: user.memberId,
              memberRole: user.memberRole,
              modifiedAt: user.modifiedAt,
            });
          });
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
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
