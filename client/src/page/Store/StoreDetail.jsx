import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../api/axiosInstance";
import styled from "styled-components";
import Modal from "../../components/SubPage/Store/Modal";
import { getUserData } from "../../api/getUserData";
import { userDataActions } from "../../store/slice/userDataSlice";

const StoreDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [profile, setprofile] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    axiosInstance({
      url: `/sells/${id}`,
      method: "get",
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`/members/${data.memberId}`)
      .then((res) => {
        setprofile(res.data.data.thumbNailImage);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data.memberId]);

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleOpenModal = () => {
    if (quantity) {
      setIsModalOpen(true);
      axiosInstance({
        url: `/orders`,
        method: "post",
        data: {
          memberId: userData.memberId,
          orderSells: [
            {
              sellId: data.sellId,
              quantity: quantity,
            },
          ],
        },
      })
        .then((response) => {
          if (userData.memberId) {
            getUserData(userData.memberId).then((res) => {
              const user = res.data.data;
              dispatch(
                userDataActions.setUserData({
                  displayName: user.displayName,
                })
              );
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const navigate = useNavigate();

  const deleteStore = () => {
    const shouldDelete = window.confirm("정말로 삭제하시겠습니까?");

    if (shouldDelete) {
      handleDelete();
    }
  };

  const handleDelete = () => {
    axiosInstance({
      url: `/sells/${id}`,
      method: "delete",
    })
      .then((response) => {
        navigate("/store");
      })
      .catch((err) => console.log(err));
    alert("삭제되었습니다.");
  };

  const formatPriceWithCommas = (price) => {
    if (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "수량을 선택해주세요!";
  };

  return (
    <StoreDetailContainer>
      <RepInfoWrapper>
        <div className="StoreD__left_wrap">
          <ImgContainer>
            <Thumimg src={data.thumbNailImage} alt="img" />
          </ImgContainer>
          <MaterierBox>
            <Materiartext>
              판매자가 작성한 제품에 사용된 업사이클링 품목입니다.
              <br />
              <br />
              이은 스토어는 단순히 수익성 제품을 판매하는 것이 아닌 업사이클링
              제품을 판매하는 과정을 지원해요.
            </Materiartext>
            <Materialcontext>{data.material}</Materialcontext>
          </MaterierBox>
        </div>
        <div className="StoreD__right_wrap">
          <Userbox>
            <Userinf>
              {profile !== null ? (
                <Userprofile src={profile} alt="펀딩 이미지 미리보기" />
              ) : (
                <Userprofile
                  src={`${process.env.PUBLIC_URL}/image/profile.jpeg`}
                  alt="기본 프로필"
                />
              )}
              <Upcycler>{data.displayName}</Upcycler>
            </Userinf>
            {userData.memberId === data.memberId ? (
              <ButtonContainer>
                <Button onClick={deleteStore}>삭제</Button>
                <LinkEdit to={`/storeedit/${data.sellId}`}>
                  <Button>수정</Button>
                </LinkEdit>
              </ButtonContainer>
            ) : null}
          </Userbox>
          <Subbox>
            <SubTitle>
              🛒 스토어 {">"} {data.sellCategoryName}
            </SubTitle>
            <ViewCount>조회수 {data.viewCount}</ViewCount>
          </Subbox>
          <ItemName>
            <h3>{data.title}</h3>
          </ItemName>
          <ItemInfo>{data.content}</ItemInfo>
          {localStorage.getItem("token") &&
            userData.memberId !== data.memberId && (
              <>
                <AmountBox>
                  <Text>상품 금액</Text>
                  <Text>{formatPriceWithCommas(data.price)}원</Text>
                </AmountBox>
                <Quantity>
                  <Text>수량</Text>
                  <div>
                    <Quantitybox
                      value={quantity}
                      label="quantity"
                      onChange={handleChange}
                    >
                      <Option>선택해주세요.</Option>
                      <Option value={1}>1개</Option>
                      <Option value={2}>2개</Option>
                      <Option value={3}>3개</Option>
                      <Option value={4}>4개</Option>
                      <Option value={5}>5개</Option>
                    </Quantitybox>
                  </div>
                </Quantity>
                <Quantity>
                  <SubTitle>총 결제 금액 </SubTitle>
                  <div>
                    {quantity ? (
                      <TotalAmount>
                        {formatPriceWithCommas(data.price * quantity)}원
                      </TotalAmount>
                    ) : (
                      <TotalAmount>
                        {formatPriceWithCommas(data.price * quantity)}
                      </TotalAmount>
                    )}
                  </div>
                </Quantity>

                <CreateButton onClick={handleOpenModal}>구매하기</CreateButton>
              </>
            )}

          {!localStorage.getItem("token") && (
            <Link to="/login">
              <CreateButton>로그인 이후 구매 가능합니다</CreateButton>
            </Link>
          )}
        </div>
      </RepInfoWrapper>
      {isModalOpen && (
        <Modal
          data={data}
          userData={userData}
          quantity={quantity}
          setQuantity={setQuantity}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <InfoWrapper>
        <Info>
          <InfoTitle>제품 상세 정보</InfoTitle>
          <img src={data.contentImage} alt="img" />
        </Info>
        <Footer>IEUN CO.</Footer>
      </InfoWrapper>
    </StoreDetailContainer>
  );
};

export default StoreDetail;
const StoreDetailContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 1000px;
  margin: auto;
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;
const RepInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 30px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    /* gap: 2rem; */
    margin-top: 0px;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 100%;
`;

const Thumimg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const MaterierBox = styled.div`
  background-color: rgb(249, 250, 251);
  margin-top: 20px;
  padding: 10px, 0;
  border-radius: 5px;
`;

const Materiartext = styled.p`
  padding: 0.5rem;
  font-size: 12px;
`;

const Materialcontext = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: 15px;
`;

const Userbox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 0.8px solid rgb(236, 236, 238);
`;

const Userinf = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Userprofile = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const Upcycler = styled.div`
  margin-left: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const Button = styled.button`
  background-color: #6e934d;
  border: none;
  border-radius: 10px;
  height: 30px;
  width: 50px;
  text-align: center;
  cursor: pointer;
  color: #fff;
  margin-left: 10px;
`;

const LinkEdit = styled(Link)`
  outline: none;
  text-decoration: none;
  color: black;
`;

const Subbox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SubTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: 600;
`;

const ViewCount = styled.div`
  font-size: 13px;
`;

const ItemName = styled.div`
  width: 100%;
  height: 50px;
  font-size: 17px;
  resize: none;
  font-family: Arial, Helvetica, sans-serif;
  white-space: pre-line;
  word-break: break-all;
  margin-bottom: 10px;
`;

const ItemInfo = styled.div`
  width: 100%;
  height: 300px;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 25px;
  font-family: Arial, Helvetica, sans-serif;
  resize: none;
  white-space: pre-line;
  word-break: break-all;
`;

const AmountBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 15px;
  margin-bottom: 10px;
  border-top: 0.8px solid rgb(236, 236, 238);
`;

const Text = styled.div`
  font-size: 14px;
  margin-right: 5px;
`;

const Quantity = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Quantitybox = styled.select`
  width: 90px;
  height: 20px;
  &:focus {
    outline: none;
  }
`;

const Option = styled.option`
  font-size: 14px;
  margin-right: 5px;
`;

const TotalAmount = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 800;
  color: #6e934d;
`;

const CreateButton = styled.button`
  width: 100%;
  height: 50px;
  font-size: 17px;
  font-weight: 400;
  border: none;
  background-color: #6e934d;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #6e934d91;
    border-radius: 10px;
    cursor: pointer;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 50px;
`;

const InfoTitle = styled.div`
  color: #6e934d;
  margin: 10px 0 50px 0;
  font-size: 22px;
  font-weight: bold;
  border-bottom: 1px solid rgb(243, 244, 246);
  padding-bottom: 20px;
`;

const Footer = styled.div`
  width: 100vw;
  margin-top: 20px;
  background-color: #6e934d;
  text-align: center;
  padding: 1rem;
  color: #fff;
  font-size: 20px;
`;
