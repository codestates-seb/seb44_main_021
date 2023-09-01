import React, { useState, useEffect } from "react";
import EditModal from "../../components/Modal/EditModal";
import Header from "../../components/Header/Header";
import UserDetails from "../../components/Mypage/Details/Details";
import UserProfile from "../../components/Mypage/UserProfile/UserProfile";
import { useSelector, useDispatch } from "react-redux";
import { useGetMemberId } from "../../hooks/useGetMemberId";
import * as S from "./MyPage.styled";
import { getDetailDatas } from "../../api/getDetailDatas";
import useScrollLock from "../../hooks/useScrollLock";
import { getUserData } from "../../api/getUserData";
import { useParams } from "react-router-dom";
import { userDetailsActions } from "../../store/userDetailsSlice";

const MyPage = () => {
  const userData = useSelector((state) => state.userData);
  const detailsData = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const { path } = useParams();
  const { getMemberId } = useGetMemberId();
  const { lockScroll, activeScroll } = useScrollLock();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isUnmount, setIsUnmount] = useState(false);

  const handleOpenModal = () => {
    lockScroll();
    setIsOpenModal(!isOpenModal);
    setIsUnmount(false);
  };

  const handleCloseModal = () => {
    setIsUnmount(true);
    setTimeout(() => {
      activeScroll();
      setIsOpenModal(!isOpenModal);
    }, 1000);
  };

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
      <Header />
      <S.MyPageContainer>
        <S.MyPageWrapper>
          <UserProfile onClick={handleOpenModal} userData={userData} />
          <UserDetails userData={userData} />
        </S.MyPageWrapper>
      </S.MyPageContainer>
      {isOpenModal && (
        <EditModal
          onClose={handleCloseModal}
          setIsUnmount={setIsUnmount}
          isUnmount={isUnmount}
        />
      )}
    </>
  );
};

export default MyPage;
