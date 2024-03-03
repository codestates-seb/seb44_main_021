import styled from "styled-components";

const TextArea = ({ maxLength, boxSize, onChange, errMsg, ...att }) => {
  return (
    <div>
      <CustomTextArea
        maxLength={maxLength}
        $boxSize={boxSize}
        onChange={onChange}
        {...att}
      />
      {errMsg && <p>{errMsg}</p>}
    </div>
  );
};

export default TextArea;

const CustomTextArea = styled.textarea`
  width: 100%;
  height: ${(props) => props.$boxSize && props.$boxSize};
  resize: none;
  background-color: #ffffff9d;
  border: 1px solid var(--color-gray-50);
  border-radius: 5px;
  padding: 0.7rem;
  &:focus {
    border-color: var(--color-main);
  }
`;
