import React from "react";
import styled from "styled-components";

const RadioGroup = ({ name, options, onChange }) => {
  return (
    <RadioBox>
      {options.map((option) => (
        <RadioBtn
          key={option.value}
          name={name}
          type="radio"
          aria-label={`${option.label} 옵션`}
          value={option.value}
          $url={option.btnImgUrl}
          onChange={onChange}
        />
      ))}
    </RadioBox>
  );
};
export default RadioGroup;

const RadioBox = styled.div`
  display: flex;
  border: 1px solid var(--color-gray-50);
  border-radius: 5px;
`;

const RadioBtn = styled.input`
  background-image: ${({ $url }) => `url(${$url})`};
  background-size: cover;
  appearance: none;
  width: 3rem;
  height: 3rem;
  margin: 0.5rem auto;
  border: 1.5px solid transparent;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 10px;
  &:focus {
    border-color: var(--color-main);
  }
  &:checked {
    border-color: var(--color-main);
    /* border-radius: 50px; */
  }
`;
