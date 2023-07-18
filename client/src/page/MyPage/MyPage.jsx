import { useState, useContext, useEffect } from "react";
import Style from "./MyPage.module.css";
import EditModal from "../../components/Modal/EditModal";
import Header from "../../components/Header/Header";
import { UserDataContext } from "../../contexts/UserDataContext";
import axios from "axios";

const MyPage = () => {
  const { userData } = useContext(UserDataContext);

  const [historyData, setHistoryData] = useState([
    {
      title: "나의 펀딩 내역",
      tableHeader: ["날짜", "펀딩명", "수량"],
      history: [],
    },
    {
      title: "나의 주문 내역",
      tableHeader: ["날짜", "제품명", "수량", "금액"],
      history: [],
    },
    {
      title: "나의 펀딩 등록 내역",
      tableHeader: ["날짜", "펀딩명", "펀딩기한"],
      history: [],
    },
    {
      title: "나의 제품 등록 내역",
      tableHeader: ["날짜", "제품명", "금액"],
      history: [],
    },
  ]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [profileImage, setProfileImage] = useState(
    `${process.env.PUBLIC_URL}/image/profile.jpeg`
  );

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleCloseModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  useEffect(() => {
    console.log(userData.memberId);
    axios
      .get(`/funding/member/${userData.memberId}?page=1&size=999`)
      .then((res) => {
        setHistoryData((prevData) => {
          const updatedData = [...prevData];
          updatedData[0].history = res.data.data.map((item) => ({
            fundingDate: new Date(item.fundingDate).toLocaleDateString("ko-KR"),
            title: item.title,
            quantity: item.quantity,
          }));
          return updatedData;
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`/upcyclings/member/${userData.memberId}?page=1&size=999`)
      .then((res) => {
        // console.log(res.data.data);
        setHistoryData((prevData) => {
          const updatedData = [...prevData];
          updatedData[2].history = res.data.data.map((item) => ({
            createdAt: new Date(item.createdAt).toLocaleDateString("ko-KR"),
            title: item.title,
            deadline: new Date(item.deadline).toLocaleDateString("ko-KR"),
          }));
          return updatedData;
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`/orders/member/${userData.memberId}?page=1&size=999`)
      .then((res) => {
        console.log(res.data.data);
        // setHistoryData((prevData) => {
        //   const updatedData = [...prevData];
        //   updatedData[1].history = res.data.data.map((item) => ({
        //     createdAt: new Date(item.createdAt).toLocaleDateString("ko-KR"),
        //     title: item.title,
        //     deadline: new Date(item.deadline).toLocaleDateString("ko-KR"),
        //   }));
        //   return updatedData;
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userData.memberId]);

  console.log(historyData);

  return (
    <div className={Style.MyPageContainer}>
      <Header />
      <div className={Style.MyPageWrapper}>
        <Profile
          onClick={handleOpenModal}
          userData={userData}
          // profileImage={profileImage}
        />
        <History historyData={historyData} userData={userData} />
      </div>
      {isOpenModal && (
        <EditModal
          onClose={handleCloseModal}
          userData={userData}
          setProfileImage={setProfileImage}
        />
      )}
    </div>
  );
};

export default MyPage;

const Profile = ({ onClick, userData }) => {
  return (
    <div className={Style.profileContainer}>
      <div className={Style.userInfo}>
        <img
          className={Style.userImg}
          src={userData.thumbNailImage}
          alt="profile-img"
        />
        <p className={Style.userName}>{userData.displayName} 님</p>
        <p className={Style.userEmail}>{userData.email}</p>
        <button className={Style.editButton} onClick={onClick}>
          Edit Profile
        </button>
      </div>
    </div>
  );
};

const History = ({ historyData, userData }) => {
  return (
    <div className={Style.historyContainer}>
      <div className={Style.historyWrapper}>
        {/* {userData.memberRole === "MEMBER_USER" &&
          historyData.slice(0, 2).map((item, index) => ( */}
        {userData.memberRole === "MEMBER_USER" &&
          historyData.slice(0, 2).map((item, index) => (
            <>
              <div key={index} className={Style.historyTitle}>
                <img
                  className={Style.historyTitleIcon}
                  src={`${process.env.PUBLIC_URL}/image/logo1.png`}
                  alt="history-title-icon"
                />
                <p>{item.title}</p>
              </div>

              <table>
                <thead>
                  <tr key={index}>
                    {item.tableHeader.map((text, index) => (
                      <th key={index}>{text}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {index === index && item.history.length > 0 ? (
                    item.history.map((data, dataIndex) => (
                      <tr key={dataIndex}>
                        {Object.keys(data).map((key, keyIndex) => (
                          <td key={keyIndex}>{data[key]}</td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <p className={Style.emptyText}>내역이 없습니다.</p>
                  )}
                </tbody>
              </table>
            </>
          ))}

        {userData.memberRole === "MEMBER_UPCYCLER" &&
          historyData.map((item, index) => (
            <>
              <div key={index} className={Style.historyTitle}>
                <img
                  className={Style.historyTitleIcon}
                  src={`${process.env.PUBLIC_URL}/image/logo1.png`}
                  alt="history-title-icon"
                />
                <p>{item.title}</p>
              </div>
              <table key={index}>
                <thead>
                  <tr>
                    {item.tableHeader.map((text, index) => (
                      <th key={index}>{text}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {index === index && item.history.length > 0 ? (
                    item.history.map((data, dataIndex) => (
                      <tr key={dataIndex}>
                        {Object.keys(data).map((key, keyIndex) => (
                          <td key={keyIndex}>{data[key]}</td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <p className={Style.emptyText}>내역이 없습니다.</p>
                  )}
                </tbody>
              </table>
            </>
          ))}
      </div>
    </div>
  );
};
