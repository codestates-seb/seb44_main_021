import React from "react";
import styled, { css } from "styled-components";

const Input = ({
  type = "text",
  label,
  variant,
  errMsg = "",
  children,
  ...inputProps
}) => {
  return (
    <InputField variant={variant}>
      <label>{label}</label>
      {children ? (
        <div className="horizontal">
          <input type={type} {...inputProps} />
          <span>{children}</span>
        </div>
      ) : (
        <input type={type} {...inputProps} />
      )}

      <p>{errMsg}</p>
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
  & label {
    display: inline-block;
    margin-bottom: 0.5rem;
    font-weight: 400;
  }
  & input {
    ${(props) => props.variant && VARIANT[props.variant]};
    width: 100%;
  }
  & p {
    margin-top: 5px;
    font-size: 14px;
    color: rgb(221, 106, 106);
  }
  .horizontal {
    display: flex;
    align-items: center;
    justify-content: center;
    > input {
      flex: 1;
    }
    > span {
      margin-left: 0.7rem;
      flex-basis: 90px;
    }
  }
`;
