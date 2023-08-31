import React, { useState, useEffect } from "react";
import EditModal from "../../components/Modal/EditModal";
import Header from "../../components/Header/Header";
import UserDetails from "../../components/Mypage/Details/Details";
import UserProfile from "../../components/Mypage/UserProfile/UserProfile";
import { useSelector, useDispatch } from "react-redux";
import { userDataActions } from "../../store/userDataSlice";
import { useGetMemberId } from "../../hooks/useGetMemberId";
import { axiosInstance } from "../../api/axiosInstance";
import * as S from "./MyPage.styled";

import { getDetailDatas } from "../../api/getDetailDatas";
import { mapFundingDetails } from "../../utils/mapDetails";
import useScrollLock from "../../hooks/useScrollLock";

const MyPage = () => {
  const userData = useSelector((state) => state.userData);
  const DetailsData = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  //custom hook
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
    //유저데이터 요청
    axiosInstance
      .get(`/members/${userData.memberId}`)
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

    // 첫 로드시 펀딩 데이터 요청
    getDetailDatas(
      userData.memberId,
      dispatch,
      mapFundingDetails,
      DetailsData.currentCartegory
    );
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
