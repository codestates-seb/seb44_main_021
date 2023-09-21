import styled from "styled-components";

export const DropdownContainer = styled.div`
  width: 4%;
  display: flex;
  justify-content: right;
  align-items: center;
`;

export const DropdownWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 100%;
  border: 0.3px solid #6e934d;
  background-color: white;
`;

export const MenuItem = styled.li`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 1rem;
  font-size: 15px;
  color: #6e934d;
  font-weight: bold;
  cursor: pointer;
`;
