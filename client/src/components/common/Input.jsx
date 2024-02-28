import React from "react";
import styled, { css } from "styled-components";

const Input = ({
  type = "text",
  label,
  variant,
  children,
  errMsg,
  color = "",
  ...inputProps
}) => {
  return (
    <InputField variant={variant} errMsg={errMsg} color={color}>
      <label>{label}</label>
      <input type={type} {...inputProps} />
      {errMsg && <p>{errMsg}</p>}
    </InputField>
  );
};

export default Input;

const VARIANT = {
  primary: css`
    box-shadow: var(--shadow-input);
    border-radius: 20px;
    transition: all 0.2s ease-in-out;
    padding: 0.7rem;
    &:focus {
      box-shadow: var(--shadow-input-focus);
    }
  `,

  outline: css`
    border-radius: 5px;
    border: 1px solid var(--color-gray-50);
    padding: 0.7rem;
    &:focus {
      border-color: var(--color-main);
    }
  `,
};

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  & label {
    display: inline-block;
    margin-bottom: 0.5rem;
    font-weight: 300;
    font-size: 0.875rem;
    color: ${(props) => props.color !== "" && props.color};
  }
  & input {
    ${(props) => props.variant && VARIANT[props.variant]};
    /* width: 100%; */
  }
  & p {
    margin-top: 5px;
    font-size: 14px;
    color: rgb(221, 106, 106);
  }
`;
