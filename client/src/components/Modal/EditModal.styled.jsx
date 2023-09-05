import styled, { keyframes } from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

/* edit modal */
export const ModalContainer = styled.div`
  position: fixed; /* 고정 위치로 변경 */
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

export const FirstModalWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 50px;
  background: rgb(255, 255, 255);
  box-shadow: 0 8px 20px 0 rgba(40, 40, 40, 0.37);
  border-radius: 10px;
  border: 1px solid rgba(220, 220, 220, 0.18);
  animation: ${({ isUnmount }) =>
      isUnmount ? closeModalAnimation : openModalAnimation}
    1.5s forwards;
`;
export const SecondModalWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 50px;
  background: rgb(255, 255, 255);
  box-shadow: 0 8px 20px 0 rgba(40, 40, 40, 0.37);
  border-radius: 10px;
  border: 1px solid rgba(220, 220, 220, 0.18);
  animation: ${({ isUnmount }) => isUnmount && closeModalAnimation} 1.5s
    forwards;
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
  color: #6b6b6b;
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
  margin: 20px;
  &:active {
    box-shadow: 1px 1px 3px rgba(107, 107, 107, 0.288);
  }

  &:hover {
    background: #4d742b;
    cursor: pointer;
  }
`;

export const ModalLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.5);
`;

/* edit modal content */
export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: left; */

  label {
    margin-top: 15px;
    margin-bottom: 7px;
  }
  input {
    width: 240px;
    height: 30px;
    padding: 0 10px;
    /* margin-bottom: 20px; */
    border: solid 1px #c6c6c6;
    border-radius: 5px;
    &:focus {
      outline: none !important;
      border-color: #6e934d;
    }
  }
`;

export const ErrMsg = styled.p`
  margin-top: 5px;
  font-size: 14px;
  color: rgb(221, 106, 106);
`;

export const ImgUpload = styled.div`
  position: relative;
  cursor: pointer;
`;

export const UserImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: solid 4px #6e934d;
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
