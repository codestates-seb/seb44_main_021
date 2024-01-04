import styled from "styled-components";
import { HiOutlineMenu } from "react-icons/hi";
export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  border-bottom: 1px solid rgb(242, 244, 246);
  background-color: white;
  z-index: 999;
`;
export const HeaderWrapper = styled.div`
  width: 62rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const LeftArea = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  & > ul {
    display: grid;
    grid-template-columns: 3.7rem 3.7rem;

    @media (max-width: 768px) {
      display: none;
    }

    & li {
      list-style: none;
      font-size: 1.2rem;
      font-weight: bold;
      text-align: right;
      color: #6e934d;
    }
  }
`;

export const RightArea = styled.section`
  display: flex;
  align-items: center;
`;

export const MenuBtn = styled(HiOutlineMenu)`
  display: none;

  @media (max-width: 768px) {
    display: block;
    font-size: 1.5rem;
    margin: 1rem;
  }
`;
