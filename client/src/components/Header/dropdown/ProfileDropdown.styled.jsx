import styled from "styled-components";

import { MdAccountCircle } from "react-icons/md";

export const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  @media (max-width: 768px) {
    margin: 1rem;
  }
`;

export const DropdownWrapper = styled.div`
  position: absolute;
  /* left: 0; */
  top: 100%;
  border: 0.3px solid #6e934d;
  background-color: white;
  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const MenuItem = styled.li`
  list-style: none;

  padding: 0.75rem 1rem;
  color: #6e934d;
  font-weight: bold;
  cursor: pointer;
`;

export const AccountBtn = styled(MdAccountCircle)`
  font-size: 2.1rem;
  color: #6e934d;
  font-weight: 800;
  cursor: pointer;
`;
