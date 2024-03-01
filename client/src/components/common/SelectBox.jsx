import React from "react";
import Select from "react-select";

const SelectBox = ({ options, onChange, name }) => {
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
      name={name}
      onChange={(selectedOption, { action, name }) => {
        if (action === "select-option") {
          onChange({ target: { name: name, value: selectedOption.value } });
        }
      }}
    />
  );
};
export default SelectBox;
