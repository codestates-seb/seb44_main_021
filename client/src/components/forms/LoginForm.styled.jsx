import styled from "styled-components";

export const LoginFormContainer = styled.form`
  display: grid;
  grid-gap: 1.8rem;

  p {
    margin-bottom: 0.5rem;
  }
`;
export const SignupButton = styled.button`
  padding: 10px;
  width: 100%;
  letter-spacing: 3.5px;
  color: #6e934d;
  background: #ffffff;
  box-shadow: 3px 3px 6px rgba(95, 95, 95, 0.37);
  border-radius: 5px;
  border: solid 1px #6e934d;
  text-transform: uppercase;
  cursor: pointer;
  &:active {
    box-shadow: 1px 1px 3px rgba(107, 107, 107, 0.288);
  }
`;
