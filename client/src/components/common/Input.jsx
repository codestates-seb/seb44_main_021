import React from "react";
import styled from "styled-components";

const Input = ({ label, type, name, placeholder, onChange, onBlur }) => {
  return (
    <FormField>
      <label>{label}</label>
      <InputField
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
    </FormField>
  );
};

export default Input;
const FormField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const InputField = styled.input`
  background-color: #ffffff9d;
  box-shadow: 3px 3px 10px 0 rgba(95, 95, 95, 0.37);
  padding: 10px;
  border: none;
  border-radius: 5px;
  &:focus {
    outline: none !important;
    border-color: #6e934d;
  }
`;
