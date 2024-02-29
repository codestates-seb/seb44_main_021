import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as CloseIcon } from "../../../assets/icon/close_icon.svg";

import { Link } from "react-router-dom";
import SelectBox from "../../common/SelectBox";
import useInputs from "../../../hooks/useInputs";
import { fundingPost } from "../../../api/postApi";

const Modal = ({
  id,
  data,
  userData,
  setIsModalOpen,
  fundingRate,
  setFundingRate,
}) => {
  const [funding, setFunding] = useState(false);
  const [fundingData, onChange] = useInputs({
    quantity: 0,
  });
  console.log(fundingData);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFunding(false);
  };

  const clickFunding = () => {
    if (fundingData.quantity !== 0) {
      fundingPost({
        memberId: userData.memberId,
        upcyclingId: id,
        quantity: fundingData.quantity,
      }).then(() => {
        setFunding(true);
      });

      const nowtotalReceivedQuantity =
        parseInt(data.totalReceivedQuantity) + parseInt(fundingData.quantity);
      setFundingRate(
        ((nowtotalReceivedQuantity / data.totalQuantity) * 100).toFixed(1)
      );
    }
  };
  const QUANTITY_OPTIONS = [
    {
      value: "1",
      label: "1개",
    },
    {
      value: "2",
      label: "2개",
    },
    {
      value: "3",
      label: "3개",
    },
    {
      value: "4",
      label: "4개",
    },
    {
      value: "5",
      label: "5개",
    },
  ];

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseModalBtn onClick={handleCloseModal}>
          <CloseIcon />
        </CloseModalBtn>
        {funding ? (
          <Modalbox>
            <Modaltitle>
              {userData.displayName}님의 펀딩으로 <br />
              펀딩율이 아래와 같이 상승했습니다.
            </Modaltitle>
            <Ratebox>
              <Rate>
                {(
                  (data.totalReceivedQuantity / data.totalQuantity) *
                  100
                ).toFixed(1)}
                % -{">"}
              </Rate>
              <NowRate>{fundingRate}%</NowRate>
            </Ratebox>
            <Modaltext>주소 : 서울특별시 강남구 58 - 2</Modaltext>
            <p className="required_msg">
              택배는 위의 주소로 착불로 보내주시면 됩니다!
            </p>
            <Modaltitle>펀딩해주셔서 감사합니다!</Modaltitle>
            <Link to="/funding">
              <FundingButton marginTop="10px" marginBottom="20px" width="200px">
                다른 펀딩 더 보러가기
              </FundingButton>
            </Link>
          </Modalbox>
        ) : (
          <>
            <Modalbox>
              <Modaltitle>
                {userData.displayName}님, 펀딩 하시겠습니까?
              </Modaltitle>
              <TextFrame>
                <ContentLabel>펀딩명</ContentLabel>
                <Modaltext>{data.title}</Modaltext>
                <ContentLabel>펀딩 자재</ContentLabel>
                <Modaltext>{data.categoryName}</Modaltext>
                <ContentLabel>
                  보내실 수량
                  <span className="required_msg">
                    * 반드시 수량을 선택해 주세요!
                  </span>
                </ContentLabel>
                <SelectBox
                  options={QUANTITY_OPTIONS}
                  onChange={onChange}
                  name="quantity"
                />
              </TextFrame>

              <FundingButton
                marginTop="40px"
                marginBottom="0"
                width="100%"
                onClick={clickFunding}
              >
                펀딩하기
              </FundingButton>
            </Modalbox>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
const TextFrame = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #fff;
  padding: 3rem 2rem;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const CloseModalBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  float: right;
`;

const Modalbox = styled.div`
  /* width: 70%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  .required_msg {
    font-size: 12px;
    color: red;
  }
`;
const ContentLabel = styled.p`
  font-weight: bold;
  & > span {
    margin-left: 5px;
  }
`;
const Modaltitle = styled.p`
  font-size: 1rem;
  color: #6e934d;
`;

const Modaltext = styled.p`
  /* margin-top: 10px; */
  display: flex;
  align-items: center;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
`;

const Modalselect = styled.div`
  width: 90%;
  height: 30px;
  margin-top: 10px;
  &:focus {
    outline: none;
  }
`;

const Ratebox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Rate = styled.div`
  font-size: 24px;
`;

const NowRate = styled.div`
  font-size: 33px;
  margin-left: 10px;
  color: #6e934d;
`;
const FundingButton = styled.button`
  background-color: #6e934d;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: #fff;
  height: 40px;
  font-size: 15px;
  text-align: center;
  width: ${(props) => props.width};
  &:hover {
    background: #6e934d91;
    border-radius: 10px;
    cursor: pointer;
  }
`;
