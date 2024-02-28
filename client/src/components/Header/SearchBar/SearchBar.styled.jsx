import styled from "styled-components";
import { HiX, HiSearch } from "react-icons/hi";

export const SeachContainer = styled.div`
  /* width: 15rem; */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 3px rgba(95, 95, 95, 0.244),
    0 0 5px rgba(95, 95, 95, 0.215);
  border-radius: 5px;
  padding: 0.7rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const VerticalLine = styled.div`
  border-left: 1px solid var(--color-main);
  height: 20px;
  margin: 0 0.5rem;
`;

export const CloseBtn = styled(HiX)`
  font-size: 1rem;
  color: rgb(146, 146, 146);
  font-weight: bold;
  cursor: pointer;
`;

export const SearchBtn = styled(HiSearch)`
  font-size: 1.5rem;
  color: var(--color-main);
  font-weight: 800;
  cursor: pointer;
`;
