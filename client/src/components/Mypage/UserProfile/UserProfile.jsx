import { useSelector } from "react-redux";
import DetailsCategory from "../Category/DetailsCategory";
import * as S from "./UserProfile.styled";

const UserProfile = ({ openModal }) => {
  const userData = useSelector((state) => state.userData);

  return (
    <S.ProfileContainer>
      <S.UserInfoContainer>
        <S.UserImg
          src={
            userData.thumbNailImage ||
            `${process.env.PUBLIC_URL}/image/profile.jpeg`
          }
          alt="profile-img"
        />
        <S.UserInfo>
          <S.UserName>{userData.displayName} 님</S.UserName>
          <S.UserEmail>{userData.email}</S.UserEmail>
          <S.EditButton onClick={openModal}>Edit Profile</S.EditButton>
        </S.UserInfo>
      </S.UserInfoContainer>
      <DetailsCategory userData={userData} />
    </S.ProfileContainer>
  );
};

export default UserProfile;
