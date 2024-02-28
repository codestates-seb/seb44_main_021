import styled from "styled-components";

export const FormContainer = styled.div`
  display: grid;
  grid-gap: 3rem;
  & > h1 {
    font-size: 1.3rem;
    color: var(--color-main);
    text-align: center;
    font-weight: 600;
  }
  p {
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    color: #fff;
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
  & > svg {
    margin: 0 0.5rem;
  }
  cursor: pointer;
  &:hover {
    box-shadow: var(--shadow-btn-hover);
  }
  &:active {
    box-shadow: var(--shadow-btn-active);
  }
`;
