import styled from "styled-components";
export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  border-bottom: 1px solid var(--color-gray-30);
  background-color: #fff;
  z-index: 999;
  width: 100%;
`;
export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 80px;
  @media (max-width: 768px) {
    /* width: 100%; */
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
      font-size: 1.2rem;
      font-weight: bold;
      text-align: right;
      color: var(--color-main);
      cursor: pointer;
    }
  }
`;

export const RightArea = styled.section`
  display: flex;
  align-items: center;
`;