import styled from "styled-components";

export const FormContainer = styled.div`
  display: grid;
  grid-gap: 3rem;
  width: 100%;
  h1 {
    color: var(--color-main);
    text-align: center;
  }
  p {
    margin-bottom: 0.5rem;
    color: #fff;
  }
  @media (max-width: 768px) {
    max-width: 350px;
  }
`;
export const UserRoleBtn = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  color: #454545;
  padding: 7px;
  background: #fff;
  box-shadow: var(--shadow-btn);
  border: solid 1px var(--color-gray-50);
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    box-shadow: var(--shadow-btn-hover);
  }
  &:active {
    box-shadow: var(--shadow-btn-active);
  }
`;
