import styled from "styled-components";

export const FormContainer = styled.div`
  display: grid;
  grid-gap: 3rem;
  h1 {
    color: var(--color-main);
    text-align: center;
  }
  p {
    margin-bottom: 0.5rem;
  }
`;
export const UserRoleBtn = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  color: #454545;
  padding: 7px;
  background: #fff;
  box-shadow: 3px 3px 6px rgba(95, 95, 95, 0.37);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:active {
    box-shadow: 1px 1px 3px rgba(107, 107, 107, 0.288);
  }
`;
