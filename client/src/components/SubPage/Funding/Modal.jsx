import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const Modal = ({ id, data, userData }) => {
  const [quantity, setQuantity] = useState(0);
  const [funding, setFunding] = useState(false);

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFunding(false);
    setQuantity(0);
  };

  const clickFunding = () => {
    if (quantity !== 0) {
      axios({
        url: `/funding`,
        method: "post",
        data: {
          memberId: userData.memberId,
          upcyclingId: id,
          quantity: quantity,
        },
      })
        .then((response) => {})
        .catch((err) => console.log(err));
      setFunding(true);
      const nowtotalReceivedQuantity =
        parseInt(data.totalReceivedQuantity) + parseInt(quantity);
      setFundingRate(
        ((nowtotalReceivedQuantity / data.totalQuantity) * 100).toFixed(1)
      );
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseModalBtn onClick={handleCloseModal}>
          <CloseIcon />
        </CloseModalBtn>
        <ModalBody>
          {funding ? (
            <Modalbox>
              <Modaltitle marginTop="35px">
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
              <Warning>택배는 위의 주소로 착불로 보내주시면 됩니다!</Warning>
              <Modaltitle marginTop="30px">펀딩해주셔서 감사합니다!</Modaltitle>
              <Link to="/funding">
                <FundingButton
                  marginTop="10px"
                  marginBottom="20px"
                  width="200px"
                >
                  다른 펀딩 더 보러가기
                </FundingButton>
              </Link>
            </Modalbox>
          ) : (
            <>
              <Modalbox>
                <Modaltitle marginTop="35px">
                  {userData.displayName}님, 펀딩 하시겠습니까?
                </Modaltitle>
                <Modaltext bold>펀딩명</Modaltext>
                <Modaltext>{data.title}</Modaltext>
                <Modaltext bold>펀딩 자재</Modaltext>
                <Modaltext>{data.categoryName}</Modaltext>
                <Modaltext bold>보내실 수량</Modaltext>
                <Modalselect
                  value={quantity}
                  label="quantity"
                  onChange={handleChange}
                >
                  <option value={0}>수량을 선택해주세요.</option>
                  <option value={1}>1개</option>
                  <option value={2}>2개</option>
                  <option value={3}>3개</option>
                  <option value={4}>4개</option>
                  <option value={5}>5개</option>
                </Modalselect>
              </Modalbox>
              <Warning margin>* 반드시 수량을 선택해 주세요!</Warning>
              <FundingButton
                marginTop="40px"
                marginBottom="0"
                width="100%"
                onClick={clickFunding}
              >
                펀딩하기
              </FundingButton>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

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
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px 30px 20px 30px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const CloseModalBtn = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  float: right;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Modalbox = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Modaltitle = styled.div`
  font-size: 18px;
  margin-top: ${(props) => props.marginTop};
  color: #6e934d;
`;

const Modaltext = styled.div`
  margin-top: 10px;
  width: 90%;
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

const Warning = styled.div`
  font-size: 12px;
  color: red;
  margin-top: 2px;
  margin-left: ${(props) => (props.margin ? "20px" : "0px")};
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
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  width: ${(props) => props.width};
  &:hover {
    background: #6e934d91;
    border-radius: 10px;
    cursor: pointer;
  }
`;
