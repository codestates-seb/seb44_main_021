import React from "react";
import styled from "styled-components";

const Button = ({ formFields = {}, content, onClick }) => {
  const isDisabled = Object.values(formFields).some((field) => !field);
  const buttonType = Object.keys(formFields).length === 0 ? "button" : "submit";
  return (
    <SubmitButton type={buttonType} disabled={isDisabled} onClick={onClick}>
      {content}
    </SubmitButton>
  );
};

export default Button;

const SubmitButton = styled.button`
  /* height: 100%; */
  padding: 13px;
  width: 100%;
  /* letter-spacing: 3.5px; */
  color: #ffffff;
  background: ${({ disabled }) => (disabled ? "#afafaf" : "var(--color-main)")};
  border-radius: 5px;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  box-shadow: ${({ disabled }) =>
    disabled ? "none" : "5px 5px 10px rgba(0, 0, 0, 0.1)"};

  &:hover {
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : " 2px 2px 3px rgba(0, 0, 0, 0.1)"};
  }
  &:active {
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "inset 2px 2px 3px rgba(0, 0, 0, 0.1)"};
  }
`;
