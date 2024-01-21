import React, { useEffect } from "react";
import EditModal from "../../components/Mypage/Modal/EditModal";
import UserDetails from "../../components/Mypage/Details/Details";
import UserProfile from "../../components/Mypage/UserProfile/UserProfile";
import { useSelector, useDispatch } from "react-redux";
import { getDetailDatas } from "../../api/getDetailDatas";
import { getUserData } from "../../api/getUserData";
import { useParams } from "react-router-dom";
import { userDataActions } from "../../store/slice/userDataSlice";
import styled from "styled-components";
import useModal from "../../hooks/useModal";
import useGetUserDetails from "../../hooks/useGetUserDetails";
import DetailsCategory from "../../components/Mypage/Category/DetailsCategory";
import { userDetailsActions } from "../../store/slice/userDetailsSlice";

const MyPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  const { isOpenModal, isUnmount, openModal, closeModal } = useModal();
  const { path } = useParams();
  const { details, getUserDetails } = useGetUserDetails();

  useEffect(() => {
    if (userData.memberId) {
      dispatch(userDetailsActions.setTitle("나의 펀딩 내역"));
      dispatch(userDetailsActions.setCategory("funding"));
      getDetailDatas(userData.memberId, path).then((res) => {
        getUserDetails(path, res.data.data);
      });

      getUserData(userData.memberId)
        .then((res) => {
          const user = res.data.data;
          dispatch(
            userDataActions.setUserData({
              email: user.email,
              displayName: user.displayName,
              memberRole: user.memberRole,
              thumbNailImage: user.thumbNailImage,
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userData.memberId]);

  return (
    <>
      <MyPageContainer>
        <div>
          <UserProfile openModal={openModal} />
          <DetailsCategory
            userData={userData}
            details={details}
            getUserDetails={getUserDetails}
          />
        </div>
        <UserDetails userData={userData} details={details} />
      </MyPageContainer>
      {isOpenModal && (
        <EditModal closeModal={closeModal} isUnmount={isUnmount} />
      )}
    </>
  );
};

export default MyPage;

const MyPageContainer = styled.main`
  display: flex;
  max-width: 1000px;
  margin: auto;
  /* display: grid;
  grid-template-columns: 25% 75%; */

  padding: 2rem 0;
  color: #3a3a3a;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;
