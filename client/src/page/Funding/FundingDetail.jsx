import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../api/axiosInstance";
import styled, { css } from "styled-components";
import Modal from "../../components/SubPage/Funding/Modal";

const FundingDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fundingRate, setFundingRate] = useState();
  const [profile, setprofile] = useState("");

  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    axiosInstance({
      url: `/upcyclings/${id}`,
      method: "get",
    })
      .then((response) => {
        setData(response.data.data);
        console.log(response);
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

  useEffect(() => {
    if (data.totalReceivedQuantity === 0) {
      setFundingRate("00");
    } else if (data.totalQuantity && data.totalReceivedQuantity) {
      setFundingRate(
        ((data.totalReceivedQuantity / data.totalQuantity) * 100).toFixed(1)
      );
    }
  }, [data.totalQuantity, data.totalReceivedQuantity]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const navigate = useNavigate();

  const deleteFunding = () => {
    const shouldDelete = window.confirm("정말로 삭제하시겠습니까?");

    if (shouldDelete) {
      handleDelete();
    }
  };

  const handleDelete = () => {
    axios({
      url: `/upcyclings/${id}`,
      method: "delete",
    })
      .then((response) => {
        navigate("/funding");
        alert("삭제되었습니다.");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header />
      <AllWrapper>
        <Wrapper width="45%">
          <Thumimg src={data.thumbNailImage} alt="img" />
          <MaterierBox>
            <MaterierGroup>
              {[
                "IconCloth",
                "IconWood",
                "IconPlastic",
                "IconSteel",
                "IconGlass",
                "IconEtc",
              ].map((obj, idx) => (
                <Materials image={obj} categoryId={data.categoryId} idx={idx} />
              ))}
            </MaterierGroup>
            <Materiarhr />
            <Materiartext>
              "{data.categoryName}" 자재가 있다면 펀딩해주세요!
            </Materiartext>
            <Materiartext>
              이은 펀딩은 단순히 제품을 펀딩하는 것이 아닌 업사이클링 제품을
              위한 펀딩 과정을 지원해요.
            </Materiartext>
          </MaterierBox>
        </Wrapper>
        <Wrapper width="25%">
          <Userbox>
            <Userinf>
              {profile !== null ? (
                <Userprofile src={profile} alt="유저 프로필" />
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
                <Button onClick={deleteFunding}>삭제</Button>
                <LinkEdit to={`/fundingedit/${data.upcyclingId}`}>
                  <Button>수정</Button>
                </LinkEdit>
              </ButtonContainer>
            ) : null}
          </Userbox>
          <Subbox>
            <WrapperTitle>🎁 펀딩</WrapperTitle>
            <ViewCount>조회수 {data.viewCount}</ViewCount>
          </Subbox>
          <Title>{data.title}</Title>
          <IntroduceBox>{data.content}</IntroduceBox>
          <AmountBox>
            <WrapperText>{data.deadline} </WrapperText>
            <div>부로 펀딩이 마감됩니다. </div>
          </AmountBox>
          <Fundingpercent>
            <WrapperText>
              {data.totalReceivedQuantity <= 0 ? "00%" : `${fundingRate}%`}
            </WrapperText>
            <div>달성했습니다.</div>
          </Fundingpercent>
          {localStorage.getItem("token") ? (
            <CreateButton onClick={handleOpenModal}>펀딩하기</CreateButton>
          ) : (
            <Link to="/login">
              <CreateButton>로그인 이후 펀딩 가능합니다</CreateButton>
            </Link>
          )}
        </Wrapper>
      </AllWrapper>
      <Footer />
      {isModalOpen && (
        <Modal
          id={id}
          data={data}
          userData={userData}
          setIsModalOpen={setIsModalOpen}
          fundingRate={fundingRate}
          setFundingRate={setFundingRate}
        />
      )}
    </div>
  );
};

export default FundingDetail;

const AllWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const Wrapper = styled.div`
  width: ${(props) => props.width};
  margin-right: 10px;
`;

const Thumimg = styled.img`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 100%;
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const MaterierBox = styled.div`
  background-color: rgb(249, 250, 251);
  margin-top: 20px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const MaterierGroup = styled.div`
  display: flex;
`;

const Materials = styled.div`
  display: block;
  appearance: none;
  width: 40px;
  height: 40px;
  padding: 0;
  margin: 5px 15px;
  border: 2px solid transparent;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: ${(props) => `url(/image/${props.image}.png)`};
  background-size: "cover";
  &:focus {
    outline: none;
  }
  ${(props) =>
    props.categoryId !== props.idx + 1 &&
    css`
      border-color: #6e934d;
      background-color: #fff;
      border-radius: 5px;
    `};
`;

const Materiarhr = styled.hr`
  border: 0.5px solid rgb(243, 244, 246);
`;

const Materiartext = styled.div`
  margin-top: 5px;
  margin-left: 20px;
  font-size: 12px;
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

const LinkEdit = styled(Link)`
  outline: none;
  text-decoration: none;
  color: black;
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
  &:hover {
    background-color: #6e934d91;
    border-radius: 10px;
    cursor: pointer;
  }
`;

const Subbox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ViewCount = styled.div`
  font-size: 13px;
`;

const Title = styled.div`
  width: 100%;
  height: 50px;
  font-size: 17px;
  resize: none;
  font-family: Arial, Helvetica, sans-serif;
  white-space: pre-line;
  word-break: break-all;
  margin-bottom: 10px;
`;

const WrapperTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: 600;
`;

const WrapperText = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #6e934d;
  margin-right: 5px;
`;

const IntroduceBox = styled.div`
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
  justify-content: right;
  padding-top: 15px;
  margin-bottom: 10px;
  border-top: 0.8px solid rgb(236, 236, 238);
`;

const Fundingpercent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  margin-bottom: 20px;
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

const Footer = styled.button`
  height: 60px;
`;
