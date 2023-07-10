import { useState } from "react";
import Style from "./MyPage.module.css";
import EditModal from "../../components/Modal/EditModal";
import Header from "../../components/Header/Header";
const MyPage = () => {
  const historyTitle = [
    "나의 펀딩 내역",
    "나의 주문 내역",
    "나의 펀딩 등록 내역",
    "나의 제품 등록 내역",
  ];
  const historyData = {
    funding: ["날짜", "펀딩명", "수량"],
    order: ["날짜", "제품명", "수량", "금액"],
    Fregistration: ["날짜", "펀딩명", "펀딩기한", "펀딩률"],
    Oregistration: ["날짜", "제품명", "금액"],
  };
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleCloseModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <div className={Style.MyPageContainer}>
      <Header />
      <div className={Style.MyPageWrapper}>
        <Profile onClick={handleOpenModal} />
        <History historyTitle={historyTitle} historyData={historyData} />
      </div>
      {isOpenModal && <EditModal onClose={handleCloseModal} />}
    </div>
  );
};

export default MyPage;

const Profile = ({ onClick }) => {
  return (
    <div className={Style.profileContainer}>
      <div className={Style.userInfo}>
        <img
          className={Style.userImg}
          src={`${process.env.PUBLIC_URL}/image/profile.jpeg`}
          alt="profile-img"
        />
        <p className={Style.userName}>나예진 님</p>
        <p className={Style.userEmail}>yejin123@gmail.com</p>
        <button className={Style.editButton} onClick={onClick}>
          Edit Profile
        </button>
      </div>
    </div>
  );
};

const History = ({ historyTitle, historyData }) => {
  return (
    <div className={Style.historyContainer}>
      <div className={Style.historyWrapper}>
        {Object.entries(historyData).map(([key, texts], index) => (
          <>
            <div className={Style.historyTitle}>
              <img
                className={Style.historyTitleIcon}
                src={`${process.env.PUBLIC_URL}/image/logo1.png`}
                alt="history-title-icon"
              />
              <p>{historyTitle[index]}</p>
            </div>
            <table>
              <thead>
                <tr key={key}>
                  {texts.map((text, index) => (
                    <th key={index}>{text}</th>
                  ))}
                </tr>
              </thead>
            </table>
            <p className={Style.emptyText}> 내역이 없습니다.</p>
          </>
        ))}
      </div>
    </div>
  );
};
