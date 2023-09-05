import styled from "styled-components";

export const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  color: #454545;
`;

export const FormWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 40rem;
  background: url("/image/sign-bg.png") center top;
  background-size: cover;
  box-shadow: 0 8px 32px 0 rgba(119, 119, 119, 0.37);
  border-radius: 20px;

  @media (max-width: 820px) {
    min-width: 100vw;
    min-height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0;
  }
`;

export const NoticeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.6rem;
  color: #fff;
`;

export const FormBox = styled.div`
  background: #fff;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 4rem 2rem;

  @media (max-width: 820px) {
    border-radius: 0;
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 32px 0 rgba(95, 95, 95, 0.37);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(4px);
  }
`;

export const Logo = styled.img`
  width: 6rem;
  height: 6rem;
`;
