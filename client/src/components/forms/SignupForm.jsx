import React, { useState } from "react";
import useInputs from "../../hooks/useInputs";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Input from "../common/Input";
import { axiosInstance } from "../../api/axiosInstance";
import * as S from "./SignupForm.styled";
import { LodingSpiner } from "../common/LodingSpiner";

const SignupForm = ({ role }) => {
  const NAME_REGEX = /^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,6}$/;
  const EMAIL_REGEX = /^[A-Za-z0-9.\-_]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
  const PWD_REGEX =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,24}$/;

  const [signupInfo, onChange] = useInputs({
    displayName: "",
    email: "",
    password: "",
    role: role,
    verifyPwd: "",
    code: "",
  });
  /* 에러메세지 */
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [pwdErrMsg, setPwdErrMsg] = useState("");
  const [nameErrMsg, setNameErrMsg] = useState("");
  const [AuthNumErrMsg, setAuthNumErrMsg] = useState("");

  /* 입력란 공백 및 유효성 통과 여부 */
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isName, setIsName] = useState(false);

  /* 이메일 인증번호 전송 여부*/
  const [isAuthNum, setIsAuthNum] = useState("");
  const [isAuthNumSent, setIsAuthNumSent] = useState(false);
  const [isCheckAuthNum, setIsCheckAuthNum] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* 유효성 함수 */
  const IsValidName = () => {
    if (!NAME_REGEX.test(signupInfo.displayName)) {
      setNameErrMsg("특수 문자 제외 2자 ~ 6자를 입력하세요.");
      setIsName(false);
    } else {
      setNameErrMsg("");
      setIsName(true);
    }
  };

  const IsValidEmail = () => {
    if (!EMAIL_REGEX.test(signupInfo.email)) {
      setEmailErrMsg("이메일 형식에 맞지 않습니다.");
      setIsEmail(false);
    } else {
      setEmailErrMsg("");
      setIsEmail(true);
    }
  };

  const IsValidPwd = () => {
    if (!PWD_REGEX.test(signupInfo.password)) {
      setPwdErrMsg("숫자, 문자, 특수문자 포함 8자 이상 입력하세요.");
      setIsPassword(false);
    } else if (signupInfo.password !== signupInfo.verifyPwd) {
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

    const { displayName, email, password, role, code } = signupInfo;

    if (isPassword && isEmail && isName && isCheckAuthNum) {
      axiosInstance
        .post("/members/signup", { displayName, email, password, role, code })
        .then((res) => {
          if (res.status === 201) {
            alert("회원가입이 완료 되었습니다.");
            navigate("/login");
          }
        })
        .catch((err) => {
          if (err.response.data === "DisplayName exists") {
            setNameErrMsg("중복된 닉네임입니다.");
            setIsName(false);
          }

          if (err.response.data === "Email exists") {
            setEmailErrMsg("중복된 이메일입니다.");
            setIsEmail(false);
          }
        });
    }
  };
  /* 이메일 인증 */
  const sendAuthNumber = () => {
    const { email } = signupInfo;

    if (!email) {
      setEmailErrMsg("이메일을 입력하세요.");
    }
    if (isEmail) {
      setLoading(true);
      axiosInstance
        .post("/members/sendmail", { email })
        .then((res) => {
          setIsAuthNum(res.data.message);
          setIsAuthNumSent(true);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.data.message === "이미 존재하는 이메일입니다.") {
            setEmailErrMsg("이미 존재하는 이메일입니다.");
            setLoading(false);
          }
        });
    }
  };

  const CheckAuthNumber = () => {
    const { code } = signupInfo;

    if (code === isAuthNum) {
      // console.log(code);
      setIsCheckAuthNum(true);
      setAuthNumErrMsg("");
      alert("인증이 완료되었습니다.");
    }
    if (code !== isAuthNum) {
      // console.log(code);
      setIsCheckAuthNum(false);
      setAuthNumErrMsg("인증번호를 확인해주세요.");
    }
  };

  return (
    <S.SignupFormContainer onSubmit={AxiosPost}>
      <div>
        <S.EmailAuthField>
          <Input
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요."
            name="email"
            onChange={onChange}
            onBlur={IsValidEmail}
          />
          <S.EmailAuthBtn type="button" onClick={sendAuthNumber}>
            {loading ? <LodingSpiner /> : "인증 요청"}
          </S.EmailAuthBtn>
        </S.EmailAuthField>
        {emailErrMsg !== "" && <S.ErrMsg>{emailErrMsg}</S.ErrMsg>}
      </div>

      {isAuthNumSent && (
        <div>
          <S.EmailAuthField>
            <Input
              label="인증번호"
              type="text"
              placeholder="인증번호를 입력하세요."
              name="code"
              onChange={onChange}
            />
            <S.EmailAuthBtn type="button" onClick={CheckAuthNumber}>
              인증 확인
            </S.EmailAuthBtn>
          </S.EmailAuthField>
          {AuthNumErrMsg !== "" && <S.ErrMsg>{AuthNumErrMsg}</S.ErrMsg>}
        </div>
      )}

      {signupInfo.role === "users" && (
        <div>
          <Input
            label="닉네임"
            type="text"
            placeholder="닉네임을 입력하세요."
            name="displayName"
            onChange={onChange}
            onBlur={IsValidName}
          />
          {nameErrMsg !== "" && <S.ErrMsg>{nameErrMsg}</S.ErrMsg>}
        </div>
      )}

      {signupInfo.role === "upcycler" && (
        <div>
          <Input
            label="업사이클러명"
            type="text"
            placeholder="업사이클러명을 입력하세요."
            name="displayName"
            onChange={onChange}
            onBlur={IsValidName}
          />
          {nameErrMsg !== "" && <S.ErrMsg>{nameErrMsg}</S.ErrMsg>}
        </div>
      )}

      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력하세요."
        name="password"
        onChange={onChange}
        onBlur={IsValidPwd}
      />
      <div>
        <Input
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 한번 더 입력하세요."
          name="verifyPwd"
          onChange={onChange}
          onBlur={IsValidPwd}
        />
        {pwdErrMsg !== "" && <S.ErrMsg>{pwdErrMsg}</S.ErrMsg>}
      </div>

      <Button formFields={signupInfo} content="sign up" />
    </S.SignupFormContainer>
  );
};

export default SignupForm;
