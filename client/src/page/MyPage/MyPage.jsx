import React, { useEffect } from "react";
import EditModal from "../../components/Mypage/Modal/EditModal";
import UserDetails from "../../components/Mypage/Details/Details";
import UserProfile from "../../components/Mypage/UserProfile/UserProfile";
import { useSelector, useDispatch } from "react-redux";
import { useGetMemberId } from "../../hooks/useGetMemberId";
import { getDetailDatas } from "../../api/getDetailDatas";
import { getUserData } from "../../api/getUserData";
import { useParams } from "react-router-dom";
import { userDetailsActions } from "../../store/slice/userDetailsSlice";
import styled from "styled-components";
import useModal from "../../hooks/useModal";

const MyPage = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userData);
  const detailsData = useSelector((state) => state.userDetails);
  // const isOpenModal = useSelector((state) => state.modal.isOpen);

  const { isOpenModal, isUnmount, openModal, closeModal } = useModal();
  const { path } = useParams();
  const { getMemberId } = useGetMemberId();

  useEffect(() => {
    getMemberId();
    dispatch(userDetailsActions.setTitle(detailsData.details[path]?.title));
    dispatch(userDetailsActions.setCategory(path));
    getDetailDatas(
      userData.memberId,
      dispatch,
      detailsData.details[path]?.mapFunction,
      detailsData.details[path]?.category
    );
    getUserData(userData.memberId, dispatch);
  }, [userData.memberId]);

  return (
    <>
      <MyPageContainer>
        <UserProfile userData={userData} openModal={openModal} />
        <UserDetails userData={userData} />
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
