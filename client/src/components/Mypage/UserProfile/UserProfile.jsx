import DetailsCategory from "../Category/DetailsCategory";
import * as S from "./UserProfile.styled";

const UserProfile = ({ onClick, userData }) => {
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
          <S.EditButton onClick={onClick}>Edit Profile</S.EditButton>
        </S.UserInfo>
      </S.UserInfoContainer>
      <DetailsCategory userData={userData} />
    </S.ProfileContainer>
  );
};

export default UserProfile;
