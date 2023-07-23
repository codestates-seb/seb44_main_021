import React, { useState, useContext, useEffect } from "react";
import Style from "./MyPage.module.css";
import EditModal from "../../components/Modal/EditModal";
import Header from "../../components/Header/Header";
import { UserDataContext } from "../../contexts/UserDataContext";
import axios from "axios";

const MyPage = () => {
  const { userData, setUserData } = useContext(UserDataContext);

  useEffect(() => {
    axios
      .get(`/members/${userData.memberId}`)
      .then((res) => {
        console.log(res);
        const user = res.data.data;
        setUserData((prevUserData) => ({
          ...prevUserData,
          displayName: user.displayName,
          memberRole: user.memberRole,
          thumbNailImage: user.thumbNailImage,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userData.memberId, userData.displayName]);

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
  const [isUnmount, setIsUnmount] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
    setIsUnmount(false);
  };

  const handleCloseModal = () => {
    setIsUnmount(true);
    setTimeout(() => {
      setIsOpenModal(!isOpenModal);
    }, 1000);
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
      .get(`/orders/member/${userData.memberId}?page=1&size=999`)
      .then((res) => {
        console.log(res);
        setHistoryData((prevData) => {
          const updatedData = [...prevData];
          updatedData[1].history = res.data.data.map((item) => ({
            createdAt: new Date(item.createdAt).toLocaleDateString("ko-KR"),
            content: item.orderSells.map((sell) => sell.content),
            quantity: item.orderSells.map((sell) => sell.quantity),
            price: item.orderSells.map((sell) => sell.price),
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
      .get(`/sells/member/${userData.memberId}?page=1&size=999`)
      .then((res) => {
        console.log(res);
        setHistoryData((prevData) => {
          const updatedData = [...prevData];
          updatedData[3].history = res.data.data.map((item) => ({
            createdAt: new Date(item.createdAt).toLocaleDateString("ko-KR"),
            title: item.content,
            price: item.price,
          }));
          return updatedData;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userData.memberId]);

  return (
    <div className={Style.MyPageContainer}>
      <Header />
      <div className={Style.MyPageWrapper}>
        <Profile onClick={handleOpenModal} userData={userData} />
        <History historyData={historyData} userData={userData} />
      </div>
      {isOpenModal && (
        <EditModal
          onClose={handleCloseModal}
          userData={userData}
          setUserData={setUserData}
          setIsUnmount={setIsUnmount}
          isUnmount={isUnmount}
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
          src={
            userData.thumbNailImage ||
            `${process.env.PUBLIC_URL}/image/profile.jpeg`
          }
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
        {userData.memberRole === "MEMBER_USER" &&
          historyData.slice(0, 2).map((item, index) => (
            <React.Fragment key={item.id}>
              <div className={Style.historyTitle}>
                <img
                  className={Style.historyTitleIcon}
                  src={`${process.env.PUBLIC_URL}/image/logo1.png`}
                  alt="history-title-icon"
                />
                <p>{item.title}</p>
              </div>

              <table>
                <thead>
                  <tr>
                    {item.tableHeader.map((text, index) => (
                      <th key={index}>{text}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {item.history.length > 0 ? (
                    item.history.map((data, dataIndex) => (
                      <tr key={dataIndex}>
                        {Object.keys(data).map((key, keyIndex) => (
                          <td key={keyIndex} className={Style.tableRow}>
                            {data[key]}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <p className={Style.emptyText}>내역이 없습니다.</p>
                  )}
                </tbody>
              </table>
            </React.Fragment>
          ))}

        {userData.memberRole === "MEMBER_UPCYCLER" &&
          historyData.map((item, index) => (
            <React.Fragment key={index}>
              <div className={Style.historyTitle}>
                <img
                  className={Style.historyTitleIcon}
                  src={`${process.env.PUBLIC_URL}/image/logo1.png`}
                  alt="history-title-icon"
                />
                <p>{item.title}</p>
              </div>
              <table>
                <thead>
                  <tr>
                    {item.tableHeader.map((text, index) => (
                      <th key={index}>{text}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {item.history.length > 0 ? (
                    item.history.map((data, dataIndex) => (
                      <tr key={dataIndex}>
                        {Object.keys(data).map((key, keyIndex) => (
                          <td key={keyIndex} className={Style.tableRow}>
                            {data[key]}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={item.tableHeader.length}
                        className={Style.emptyText}
                      >
                        내역이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};
