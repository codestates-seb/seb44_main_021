import styled from "styled-components";

export const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: url("/image/sign-bg.webp") center;
  background-size: cover;
`;

export const FormLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.85rem;
  color: #fff;
`;

export const Form = styled.div`
  width: 30rem;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(95, 95, 95, 0.37);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    border-radius: 0;
    width: 100%;
  }
`;

export const Logo = styled.img`
  width: 6rem;
  height: 6rem;
`;
