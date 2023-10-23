import styled, { keyframes } from "styled-components";

export const LodingSpiner = () => {
  return (
    <>
      <LoadingSpinner />
    </>
  );
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  width: 11px;
  height: 11px;
  border: 1.5px solid rgb(198, 198, 198);
  border-top: 1.5px solid rgb(255, 255, 255);
  border-radius: 50%;

  animation: ${spin} 1s linear infinite; // 키프레임 애니메이션 적용
`;
