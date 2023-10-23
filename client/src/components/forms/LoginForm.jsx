import React from "react";
import useInputs from "../../hooks/useInputs";
import { postLogin } from "../../api/postLogin";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Input from "../common/Input";
import * as S from "./LoginForm.styled";

const LoginForm = () => {
  const [loginInfo, onChange] = useInputs({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const AxiosLogin = (e) => {
    e.preventDefault();
    postLogin(loginInfo, navigate);
  };

  const handleButtonClick = () => {
    navigate("/signup");
  };

  return (
    <S.LoginFormContainer onSubmit={AxiosLogin}>
      <Input
        label="이메일"
        type="email"
        name="username"
        placeholder="이메일을 입력해주세요."
        onChange={onChange}
      ></Input>
      <Input
        label="비밀번호"
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요."
        onChange={onChange}
      ></Input>
      <Button formFields={loginInfo} content="log in" />
      <div>
        <p>아직 이은의 회원이 아니라면,</p>
        <S.SignupButton onClick={handleButtonClick}>signup</S.SignupButton>
      </div>
    </S.LoginFormContainer>
  );
};

export default LoginForm;
