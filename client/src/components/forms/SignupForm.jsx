import React, { useState } from "react";
import useInputs from "../../hooks/useInputs";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../common/Button";
import Input from "../common/Input";
import { axiosInstance } from "../../api/axiosInstance";
import { LodingSpiner } from "../common/LodingSpiner";
import useErrHandler from "../../hooks/useErrHandler";
import { isEmpty, validationsSignup } from "../../utils/validateInput";
import { postSignup } from "../../api/authApi";
import styled from "styled-components";

const SignupForm = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { handleValidation, handleInputErr, errMsgObj } = useErrHandler();

  /* 이메일 인증번호 전송 여부*/
  const [isAuthNum, setIsAuthNum] = useState("");
  const [isAuthNumSent, setIsAuthNumSent] = useState(false);
  const [loading, setLoading] = useState(false);

  /* 회원가입 데이터 객체*/
  const [signupInfo, onChange] = useInputs({
    displayName: "",
    email: "",
    password: "",
    role: role,
    verifyPwd: "",
    code: "",
  });

  /* 가입 정보 유효성 검사 */
  const handleInputChange = (e) => {
    handleValidation(e, validationsSignup);
    onChange(e);
  };

  const IsValidPwd = (e) => {
    onChange(e);
    if (signupInfo.password !== signupInfo.verifyPwd) {
      handleInputErr("password", "비밀번호가 일치하지 않습니다.");
    } else {
      handleInputErr("password", "");
    }
  };

  /* 계정 생성 */
  const createAccount = (e) => {
    e.preventDefault();

    const signupCondition = isEmpty(errMsgObj) && !isEmpty(signupInfo);

    const { displayName, email, password, role, code } = signupInfo;

    if (signupCondition) {
      postSignup({ displayName, email, password, role, code })
        .then((res) => {
          if (res.status === 201) {
            console.log(res);
            alert("회원가입이 완료 되었습니다.");
            navigate("/login");
          }
        })
        .catch((err) => {
          if (err.response.data === "DisplayName exists") {
            handleInputErr("displayName", "중복된 닉네임입니다.");
          }

          if (err.response.data === "Email exists") {
            handleInputErr("email", "중복된 이메일입니다.");
          }
        });
    }
  };

  /* 이메일 인증 메일 전송*/
  const sendAuthCode = () => {
    const { email } = signupInfo;

    if (!email) {
      return handleInputErr("email", "이메일을 입력하세요.");
    } else if (!errMsgObj.email) {
      handleInputErr("email", "");
      setLoading(true);
      return axiosInstance
        .post("/members/sendmail", { email })
        .then((res) => {
          console.log(res.data.message);
          setIsAuthNum(res.data.message);
          setIsAuthNumSent(true);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          if (err.response.data.message === "이미 존재하는 이메일입니다.") {
            handleInputErr("email", err.response.data.message);
            setLoading(false);
          }
        });
    }
  };
  /* 인증번호 확인 */
  const CheckAuthCode = () => {
    const { code } = signupInfo;

    if (code === isAuthNum) {
      handleInputErr("code", "");

      return alert("인증이 완료되었습니다.");
    }
    if (code !== isAuthNum) {
      return handleInputErr("code", "인증번호를 확인해주세요.");
    }
  };

  return (
    <SignupFormContainer onSubmit={createAccount}>
      <Input
        variant="primary"
        label="이메일"
        type="email"
        placeholder="이메일을 입력하세요."
        name="email"
        onChange={handleInputChange}
        errMsg={errMsgObj.email}
      >
        <Button type="button" onClick={sendAuthCode}>
          {loading ? <LodingSpiner /> : "인증 요청"}
        </Button>
      </Input>

      {isAuthNumSent && (
        <Input
          variant="primary"
          label="인증번호"
          type="text"
          placeholder="인증번호를 입력하세요."
          name="code"
          onChange={handleInputChange}
          errMsg={errMsgObj.code}
        >
          <Button type="button" onClick={CheckAuthCode}>
            인증 확인
          </Button>
        </Input>
      )}

      {signupInfo.role === "users" && (
        <Input
          variant="primary"
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력하세요."
          name="displayName"
          onChange={handleInputChange}
          errMsg={errMsgObj.displayName}
        />
      )}

      {signupInfo.role === "upcycler" && (
        <Input
          variant="primary"
          label="업사이클러명"
          type="text"
          placeholder="업사이클러명을 입력하세요."
          name="displayName"
          onChange={handleInputChange}
          errMsg={errMsgObj.displayName}
        />
      )}

      <Input
        variant="primary"
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력하세요."
        name="password"
        onChange={handleInputChange}
        errMsg={errMsgObj.password}
      />

      <Input
        variant="primary"
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 한번 더 입력하세요."
        name="verifyPwd"
        onChange={IsValidPwd}
        errMsg={errMsgObj.verifyPwd}
      />

      <Button type="submit" formFields={signupInfo}>
        sign up
      </Button>
    </SignupFormContainer>
  );
};

export default SignupForm;

const SignupFormContainer = styled.form`
  display: grid;
  grid-gap: 1.5rem;
  width: 100%;
  @media (max-width: 768px) {
    max-width: 350px;
  }
`;
