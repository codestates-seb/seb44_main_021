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
  padding: 10px;
  width: 100%;
  letter-spacing: 3.5px;
  color: #ffffff;
  background: ${({ disabled }) => (disabled ? "#afafaf" : "var(--color-main)")};
  border-radius: 5px;
  border: none;

  text-transform: uppercase;
  box-shadow: ${({ disabled }) =>
    disabled ? "none" : "3px 3px 6px rgba(95, 95, 95, 0.37)"};

  &:active {
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "1px 1px 3px rgba(95, 95, 95, 0.37)"};
  }
  &:hover {
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  }
`;
