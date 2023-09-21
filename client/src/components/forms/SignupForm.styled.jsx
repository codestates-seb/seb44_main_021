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
  background: #6e934d;
  box-shadow: 3px 3px 6px 0 rgba(95, 95, 95, 0.37);
  border-radius: 5px;
  border: none;
  margin-left: 0.5rem;
  margin-top: 1rem;
  cursor: pointer;
  &:active {
    box-shadow: 1px 1px 3px rgba(107, 107, 107, 0.288);
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
