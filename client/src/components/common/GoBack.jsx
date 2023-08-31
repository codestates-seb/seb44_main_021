import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styled from "styled-components";

const GoBack = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <GoBackBtnContainer>
      <ArrowBackIcon
        sx={{ fill: "#6e934d", fontSize: "2rem" }}
        onClick={handleGoBack}
      />
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
