import styled from "styled-components";
// UserProfile
export const ProfileContainer = styled.div`
  flex: 1;
  /* height: 100%; */
  @media (max-width: 768px) {
    margin-right: 0;
  }
`;
export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  border-radius: 10px;
  background: var(--color-main);
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

export const UserImg = styled.img`
  box-sizing: border-box;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  border: solid 4px #f8f8f8;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  @media (max-width: 768px) {
    /* padding: 40px; */
    margin-left: 20px;
  }
`;

export const UserName = styled.p`
  font-size: 25px;
  font-weight: 800;
  margin-top: 20px;
  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

export const UserEmail = styled.p`
  font-size: 14px;
`;

export const EditButton = styled.button`
  height: 30px;
  width: 130px;
  letter-spacing: 3.5px;
  color: #ffffff;
  background: #98ae83;
  box-shadow: 3px 3px 5px rgba(68, 68, 68, 0.288);
  border-radius: 5px;
  border: none;
  margin-top: 5px;
  cursor: pointer;
  &:active {
    box-shadow: 1px 1px 3px rgba(107, 107, 107, 0.288);
  }
`;
