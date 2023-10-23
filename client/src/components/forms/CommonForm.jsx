import React from "react";
import { Link } from "react-router-dom";
import * as S from "./CommonForm.styled";
import GoBack from "../common/GoBack";

const CommonForm = ({ children }) => {
  return (
    <S.FormContainer>
      <S.FormWrapper>
        <GoBack />
        <S.NoticeBox>
          숨어있는 것들로 세상을 이롭게,
          <Link to="/">
            <S.Logo src={`${process.env.PUBLIC_URL}/image/logo6.png`} />
          </Link>
        </S.NoticeBox>
        <S.FormBox>{children}</S.FormBox>
      </S.FormWrapper>
    </S.FormContainer>
  );
};

export default CommonForm;
