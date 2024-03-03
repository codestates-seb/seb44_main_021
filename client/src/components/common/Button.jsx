import styled from "styled-components";

const Button = ({ formFields = {}, children, onClick }) => {
  const isDisabled = Object.values(formFields).some((field) => !field);
  const buttonType = Object.keys(formFields).length === 0 ? "button" : "submit";
  return (
    <SubmitButton type={buttonType} disabled={isDisabled} onClick={onClick}>
      {children}
    </SubmitButton>
  );
};

export default Button;

const SubmitButton = styled.button`
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  white-space: nowrap;
  align-items: center;
  padding: 0.7rem;
  color: #ffffff;
  background: ${({ disabled }) => (disabled ? "#afafaf" : "var(--color-main)")};
  border-radius: 5px;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  box-shadow: ${({ disabled }) =>
    disabled ? "none" : "5px 5px 10px rgba(0, 0, 0, 0.1)"};

  &:hover {
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : " 2px 2px 3px rgba(0, 0, 0, 0.1)"};
  }
  &:active {
    box-shadow: ${({ disabled }) =>
      disabled ? "none" : "inset 2px 2px 3px rgba(0, 0, 0, 0.1)"};
  }
`;
