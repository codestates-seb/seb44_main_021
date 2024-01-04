import React from "react";
import styled from "styled-components";

const Input = ({ label, ...inputProps }) => {
  return (
    <FormField>
      <label>{label}</label>
      <InputField {...inputProps} />
    </FormField>
  );
};

export default Input;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 100%; */
`;

const InputField = styled.input`
  box-sizing: border-box;
  background-color: #ffffff9d;
  box-shadow: 3px 3px 10px 0 rgba(95, 95, 95, 0.37);
  border: none;
  border-radius: 5px;
  padding: 0.7rem;

  &:focus {
    outline: none !important;
    border-color: var(--color-main);
  }
`;
