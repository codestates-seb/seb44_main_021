import React from "react";
import Select from "react-select";

const SelectBox = ({ options, onChange }) => {
  const customStyle = {
    control: (base) => ({
      ...base,
      width: "15rem",
      borderColor: "var(--color-gray-50)",
      boxShadow: "none",
      "&:focus-within": {
        borderColor: "var(--color-main)",
      },
    }),
    option: (styles, { data, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "var(--color-main)"
          : isFocused
          ? "var(--color-main-40)"
          : null,
      };
    },
    placeholder: (styles) => ({
      ...styles,
      color: "#777",
      fontSize: "0.85rem",
    }),
  };
  return (
    <Select
      options={options}
      placeholder="카테고리를 선택해주세요!"
      styles={customStyle}
      name="sellCategoryId"
      onChange={(selectedOption, { action, name }) => {
        if (action === "select-option") {
          onChange({ target: { name: name, value: selectedOption.value } });
        }
      }}
    />
  );
};
export default SelectBox;

// const StyledSelect = styled(Select)`
//   width: 200px;
//   outline: 0 none;
//   -webkit-appearance: none;
//   -moz-appearance: none;
//   appearance: none;

//   &:focus {
//     border-color: var(--color-main);
//   }
// `;
// const StyledSelect = styled(Select).attrs({
//   classNamePrefix: "react-select",
// })`
//   .react-select__control {
//     background-color: #fa5938;
//     width: 100px;
//     height: 40px;
//     padding-right: 15px;
//     border: none;
//     border-radius: 20px;
//     display: flex;
//     text-align: center;
//     cursor: pointer;

//     -webkit-appearance: none;
//     -moz-appearance: none;
//     appearance: none;
//     &:focus {
//       border-color: var(--color-main);
//     }
//   }
//   .react-select__single-value {
//     color: #ffffff; /* 텍스트 색상 지정 */
//     font-size: 16px;
//     font-weight: 700;
//   }
//   .react-select__menu {
//     background-color: #ffffff;
//     border-radius: 4px;
//     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//     font-weight: 600;
//     text-align: center;
//   }
//   .react-select__option {
//     background-color: transparent; /* option 배경색 */
//     color: black; /* option 텍스트 색상 */
//   }
//   .react-select__option--is-selected {
//     background-color: #fa5938; /* 클릭된 option 배경색 */
//     color: white; /* 클릭된 option 텍스트 색상 */
//   }
//   .react-select__option--is-focused {
//     border: 1px solid #afaeb7;
//     color: black; /* hover 상태의 option 텍스트 색상 */
//   }
//   .react-select__placeholder {
//     color: white;
//     font-weight: 600;
//   }
// `;
// const Select = styled.select`
//   /* margin: 0;
//   min-width: 0;
//   display: block;
//   width: 100%;
//   padding: 8px 8px;
//   font-size: inherit;
//   line-height: inherit;
//   border: 1px solid;
//   border-radius: 4px;
//   color: inherit;
//   background-color: transparent; */
//   width: 200px;
//   height: 35px;
//   /* background: url("https://freepikpsd.com/media/2019/10/down-arrow-icon-png-7-Transparent-Images.png")
//     calc(100% - 5px) center no-repeat; */
//   background-size: 20px;
//   padding: 5px 30px 5px 10px;
//   border-radius: 4px;
//   border: 1px solid var(--color-gray-50);

//   outline: 0 none;
//   -webkit-appearance: none;
//   -moz-appearance: none;
//   appearance: none;
//   &:focus {
//     border-color: var(--color-main);
//   }
// `;

// <li role="option">
//   <button
//     type="button"
//     key={option.value}
//     name="category"
//     value={option.value}
//     onClick={onChange}
//   >
//     {option.content}
//   </button>
// </li>
// import React, { useState, useRef } from 'react';
