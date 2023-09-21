import styled from "styled-components";

// MyPage

export const MyPageContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  color: #3a3a3a;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const MyPageWrapper = styled.div`
  width: 70%;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;
