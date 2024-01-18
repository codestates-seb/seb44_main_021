import styled from "styled-components";

export const SignupFormContainer = styled.form`
  display: grid;
  grid-gap: 1.5rem;
`;

// 이메일인증 버튼
export const EmailAuthBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  background: var(--color-main);
  box-shadow: var(--shadow-btn);
  border-radius: 5px;
  border: none;
  margin-left: 0.5rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: var(--shadow-btn-hover);
  }

  &:active {
    box-shadow: var(--shadow-btn-active);
  }
`;

export const ErrMsg = styled.p`
  margin-top: 0.5rem;
  /* margin-bottom: 0.8rem; */
  color: rgb(224, 48, 48);
`;

export const EmailAuthField = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
`;
