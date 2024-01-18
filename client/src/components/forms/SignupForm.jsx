import React, { useState } from "react";
import useInputs from "../../hooks/useInputs";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../common/Button";
import Input from "../common/Input";
import { axiosInstance } from "../../api/axiosInstance";
import * as S from "./SignupForm.styled";
import { LodingSpiner } from "../common/LodingSpiner";
import useErrHandler from "../../hooks/useErrHandler";
import { isEmpty } from "../../utils/validateInput";

const SignupForm = () => {
  const { role } = useParams();

  const [signupInfo, onChange] = useInputs({
    displayName: "",
    email: "",
    password: "",
    role: role,
    verifyPwd: "",
    code: "",
  });
  /* 에러메세지 */
  const NAME_REGEX = /^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,6}$/;
  const EMAIL_REGEX = /^[A-Za-z0-9.\-_]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
  const PWD_REGEX =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,24}$/;
  const validationsSignup = {
    displayName: (value) =>
      !NAME_REGEX.test(value) ? "특수 문자 제외 2자 ~ 6자를 입력하세요." : "",
    email: (value) =>
      !EMAIL_REGEX.test(value) ? "이메일 형식에 맞지 않습니다." : "",
    password: (value) =>
      !PWD_REGEX.test(value)
        ? "숫자, 문자, 특수문자 포함 8자 이상 입력하세요."
        : "",
    verifyPwd: (value) =>
      signupInfo.password !== value ? "비밀번호가 일치하지 않습니다." : "",
    code: (value) =>
      value.toString().startsWith("0")
        ? "판매 금액 첫번째 자리에 0이 입력되면 안됩니다."
        : "",
  };
  const handleInputChange = (e) => {
    handleInputErr(e, validationsSignup);
    onChange(e);
  };
  const { handleInputErr, errMsgObj } = useErrHandler();

  /* 이메일 인증번호 전송 여부*/
  const [isAuthNum, setIsAuthNum] = useState("");
  const [isAuthNumSent, setIsAuthNumSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* post 요청 함수 */
  const AxiosPost = (e) => {
    e.preventDefault();
    const signupCondition = isEmpty(errMsgObj) && !isEmpty(signupInfo);

    const { displayName, email, password, role, code } = signupInfo;

    if (signupCondition) {
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
            handleInputErr({
              target: { name: "code", value: "중복된 닉네임입니다." },
            });
          }

          if (err.response.data === "Email exists") {
            handleInputErr({
              target: { name: "code", value: "중복된 이메일입니다." },
            });
          }
        });
    }
  };
  /* 이메일 인증 */
  const sendAuthNumber = () => {
    const { email } = signupInfo;

    if (!email) {
      return handleInputErr({
        target: { name: "email", value: "이메일을 입력하세요." },
      });
    }
    if (!errMsgObj.email && email) {
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
          if (err.response.data.message === "이미 존재하는 이메일입니다.") {
            handleInputErr({
              target: { name: "email", value: "이미 존재하는 이메일입니다." },
            });
            setLoading(false);
          }
        });
    }
  };

  const CheckAuthNumber = () => {
    const { code } = signupInfo;

    if (code === isAuthNum) {
      handleInputErr({
        target: { name: "code", value: "" },
      });
      alert("인증이 완료되었습니다.");
      return;
    }
    if (code !== isAuthNum) {
      handleInputErr({
        target: { name: "code", value: "인증번호를 확인해주세요." },
      });
      return;
    }
  };

  return (
    <S.SignupFormContainer onSubmit={AxiosPost}>
      <div>
        <S.EmailAuthField>
          <Input
            variant="primary"
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요."
            name="email"
            onChange={handleInputChange}
          />
          <S.EmailAuthBtn type="button" onClick={sendAuthNumber}>
            {loading ? <LodingSpiner /> : "인증 요청"}
          </S.EmailAuthBtn>
        </S.EmailAuthField>
        <S.ErrMsg>{errMsgObj.email}</S.ErrMsg>
      </div>

      {isAuthNumSent && (
        <div>
          <S.EmailAuthField>
            <Input
              variant="primary"
              label="인증번호"
              type="text"
              placeholder="인증번호를 입력하세요."
              name="code"
              onChange={handleInputChange}
            />
            <S.EmailAuthBtn type="button" onClick={CheckAuthNumber}>
              인증 확인
            </S.EmailAuthBtn>
          </S.EmailAuthField>
          <S.ErrMsg>{errMsgObj.code}</S.ErrMsg>
        </div>
      )}

      {signupInfo.role === "users" && (
        <div>
          <Input
            variant="primary"
            label="닉네임"
            type="text"
            placeholder="닉네임을 입력하세요."
            name="displayName"
            onChange={handleInputChange}
          />
          <S.ErrMsg>{errMsgObj.displayName}</S.ErrMsg>
        </div>
      )}

      {signupInfo.role === "upcycler" && (
        <div>
          <Input
            variant="primary"
            label="업사이클러명"
            type="text"
            placeholder="업사이클러명을 입력하세요."
            name="displayName"
            onChange={handleInputChange}
          />
          <S.ErrMsg>{errMsgObj.displayName}</S.ErrMsg>
        </div>
      )}

      <div>
        <Input
          variant="primary"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요."
          name="password"
          onChange={handleInputChange}
        />
        <S.ErrMsg>{errMsgObj.password}</S.ErrMsg>
      </div>

      <div>
        <Input
          variant="primary"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 한번 더 입력하세요."
          name="verifyPwd"
          onChange={handleInputChange}
        />
        <S.ErrMsg>{errMsgObj.verifyPwd}</S.ErrMsg>
      </div>

      <Button formFields={signupInfo} content="sign up" />
    </S.SignupFormContainer>
  );
};

export default SignupForm;
