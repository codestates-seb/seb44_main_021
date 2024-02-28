import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as ArrowBackIcon } from "../../assets/icon/arrow_back_icon.svg";

const GoBack = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <GoBackBtnContainer>
      <ArrowBackIcon stroke="var(--color-main)" onClick={handleGoBack} />
    </GoBackBtnContainer>
  );
};
export default GoBack;

const GoBackBtnContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
  @media (max-width: 768px) {
    top: 30px;
    left: 20px;
  }
`;
