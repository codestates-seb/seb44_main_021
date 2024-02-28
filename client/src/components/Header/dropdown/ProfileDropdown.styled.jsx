import styled, { keyframes } from "styled-components";

export const DropdownContainer = styled.div`
  display: flex;
  align-items: center;
  & > svg {
    cursor: pointer;
  }
`;
const dropdownAnimation = keyframes`
  0% {
    opacity:0;
    transform: translateY(-100%);
  }
  100% {
    opacity:1;
    transform: translateY(0);
  }
`;
export const DropdownWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 80px;
  overflow: hidden;
  z-index: 1;

  > ul {
    background-color: white;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.244),
      0px 0px 1px rgba(0, 0, 0, 0.244);
    margin: 2px 5px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* transition: 0.3s ease-in-out; */
    animation: ${dropdownAnimation} 0.4s ease;

    > li {
      padding: 0.75rem 1rem;
      color: var(--color-main);
      font-weight: bold;
      cursor: pointer;
      /* transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out; */
    }
  }
`;
