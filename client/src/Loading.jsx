import styled from "styled-components";

export const Loading = () => {
  return (
    <LoadingContainer>
      <span></span>
      <span></span>
      <span></span>
    </LoadingContainer>
  );
};

export default Loading;

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #00000095;
  /* margin-top: 100px; */
  display: flex;
  justify-content: center;
  align-items: center;

  & > span {
    display: inline-block;
    width: 15px;
    height: 15px;
    /* background-color: gray; */
    border-radius: 50%;
    animation: loading 1s linear infinite;
    background-color: var(--color-main);
  }

  & > span:nth-child(1) {
    animation-delay: 0s;
  }

  & > span:nth-child(2) {
    animation-delay: 0.2s;
    margin: 0px 10px;
  }

  & > span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes loading {
    0%,
    100% {
      opacity: 0;
      transform: scale(0.5);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }
`;
