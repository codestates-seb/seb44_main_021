import styled, { css, keyframes } from "styled-components";
import { ReactComponent as CloseIcon } from "../../../assets/icon/close_icon.svg";

/* edit modal */
export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

const commonModalWrapperStyles = css`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 20rem;
  padding: 30px 50px;
  background: rgb(255, 255, 255);
  box-shadow: 0 8px 20px 0 rgba(40, 40, 40, 0.37);
  border-radius: 10px;
  border: 1px solid rgba(220, 220, 220, 0.18);
`;

export const FirstModalWrapper = styled.div`
  ${commonModalWrapperStyles}
  animation: ${({ isUnmount }) =>
    isUnmount ? closeModalAnimation : openModalAnimation}
  1.5s forwards;
`;

export const SecondModalWrapper = styled.div`
  ${commonModalWrapperStyles}
  animation: ${({ isUnmount }) =>
    isUnmount && closeModalAnimation} 1.5s forwards;
`;

const openModalAnimation = keyframes`
  0% {
    transform: translateY(-600px);
  }
  60% {
    transform: translateY(50px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const closeModalAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  20% {
    transform: translateY(50px);
  }
  100% {
    transform: translateY(-600px);
  }
`;

export const StyledCloseIcon = styled(CloseIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
export const EditButton = styled.button`
  height: 30px;
  width: 100%;
  letter-spacing: 3.5px;
  color: #ffffff;
  background: #6e934d;
  box-shadow: 3px 3px 5px rgba(68, 68, 68, 0.288);
  border-radius: 5px;
  border: none;
  &:active {
    box-shadow: 1px 1px 3px rgba(107, 107, 107, 0.288);
  }

  &:hover {
    background: #4d742b;
    cursor: pointer;
  }
`;

export const ModalLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.5);
`;

/* edit modal content */
export const ModalContent = styled.form`
  display: grid;
  gap: 0.7rem;
  flex-direction: column;
  & > p {
    margin-bottom: 5px;
    font-size: 14px;
    color: rgb(235, 86, 86);
  }
  .Edit__email {
    > label {
      font-weight: 400;
      color: #595959;
      display: inline-block;
    }
    > p {
      padding: 0.7rem;
    }
  }
`;

export const ImgUpload = styled.div`
  position: relative;
  cursor: pointer;
`;

export const UserImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: solid 4px var(--color-main);
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
`;
export const UploadIcon = styled.img`
  width: 30px;
  height: 30px;
  color: rgb(95, 148, 49);
  position: absolute;
  top: 80px;
  left: 75px;
  z-index: 2;
`;
