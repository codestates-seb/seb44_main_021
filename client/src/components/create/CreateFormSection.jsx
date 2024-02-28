// FundingSection.jsx
import React from "react";
import Input from "../common/Input";
import ImgUploader from "../common/imgUploader/ImgUploader";
import styled from "styled-components";
import TipSection from "./funding/TipSection";
import RadioGroup from "../common/RadioGroup";
import { MATERIAL_OPTIONS } from "../../constants/options";
import { blockTextInput } from "../../utils/transformInputValue";

const CreateFormSection = ({ errMsg, onChange, description, ...att }) => {
  //날짜 최소 최대 값 변수
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 100);
  const formattedMaxDate = maxDate.toISOString().split("T")[0];
  // const transformInputValue = (e) => {
  //   e.target.value = e.target.value
  //     .replace(/[^0-9.]/g, "")
  //     .replace(/(\..*)\./g, "$1");
  // };
  const inputComponents = {
    title: (
      <Input {...att} variant="outline" maxLength="40" onChange={onChange} />
    ),
    thumbNailImage: <ImgUploader onChange={onChange} {...att} />,
    content: (
      <TextArea {...att} maxLength="500" boxSize="14rem" onChange={onChange} />
    ),
    materialType: (
      <RadioGroup
        {...att}
        name="categoryId"
        options={MATERIAL_OPTIONS}
        onChange={onChange}
      />
    ),
    totalQuantity: (
      <Input
        {...att}
        variant="outline"
        onInput={blockTextInput}
        onChange={onChange}
      />
    ),
    deadline: (
      <Input
        {...att}
        variant="outline"
        type="date"
        customStyle={false}
        min={minDate}
        max={formattedMaxDate}
        onChange={onChange}
      />
    ), // store

    material: (
      <TextArea {...att} maxLength="100" boxSize="5rem" onChange={onChange} />
    ),
    price: (
      <Input
        {...att}
        variant="outline"
        onInput={blockTextInput}
        onChange={onChange}
      />
    ),
    contentImage: <ImgUploader {...att} onChange={onChange} />,
  };

  return (
    <FormSectionContainer>
      <InputSection>
        <label className="input-label">
          {att.title}
          <span>*</span>
        </label>

        {inputComponents[att.name]}

        <p className="err-msg">{errMsg}</p>
      </InputSection>

      {description && <TipSection>{description}</TipSection>}
    </FormSectionContainer>
  );
};

export default CreateFormSection;

export const FormSectionContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  margin: 3rem 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;
const InputSection = styled.div`
  .err-msg {
    width: fit-content;
    font-size: 0.85rem;
    color: red;
    margin-top: 0.5rem;
  }
  .input-label {
    display: block;
    font-size: 1.1rem;
    font-weight: bold;
    margin: 0.8rem 0;
    & > span {
      font-size: 18px;
      color: red;
      margin-left: 3px;
    }
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: ${(props) => props.boxSize && props.boxSize};
  resize: none;
  background-color: #ffffff9d;
  border: 1px solid var(--color-gray-50);
  border-radius: 5px;
  padding: 0.7rem;
  font-family: Arial, Helvetica, sans-serif;
  &:focus {
    border-color: var(--color-main);
  }
`;
