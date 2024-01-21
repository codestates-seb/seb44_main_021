import styled from "styled-components";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

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
  @media (max-width: 425px) {
    /* max-width: 350px; */
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
  /* transition: all 0.2s ease-in-out; */
  cursor: pointer;
  &:hover {
    box-shadow: var(--shadow-btn-hover);
  }
  &:active {
    box-shadow: var(--shadow-btn-active);
  }
`;

export const CheckIcon = styled(CheckCircleOutlineIcon)`
  font-size: 20px;
  color: var(--color-main);
  margin: 0 0.5rem;
`;
