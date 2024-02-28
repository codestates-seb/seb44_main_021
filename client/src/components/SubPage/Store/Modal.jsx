import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const Modal = ({ data, userData, quantity, setQuantity, setIsModalOpen }) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setQuantity(0);
  };
  console.log(userData);

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={handleCloseModal}>
          <CloseIcon />
        </CloseButton>
        <Modaltitle>
          {userData.displayName}님, 구매해 주셔서 감사합니다!!
        </Modaltitle>
        <TextFrame>
          <ContentLabel>제품명</ContentLabel>
          <p>{data.title}</p>
          <ContentLabel>수량</ContentLabel>
          <p>{quantity}개</p>
          <Amount>총 금액 : {data.price * quantity}원</Amount>
        </TextFrame>
        <ButtonFrame>
          <Link to="/mypage/orders">
            <FundingButton marginRight="20px">구매 내역 보러가기</FundingButton>
          </Link>
          <Link to="/store">
            <FundingButton marginLeft="20px">다른 상품 보러가기</FundingButton>
          </Link>
        </ButtonFrame>
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
  position: relative;
  background-color: #fff;
  padding: 3rem 2rem;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const CloseButton = styled.button`
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

const Modaltitle = styled.div`
  font-size: 1rem;
  color: #6e934d;
`;
const TextFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
const ContentLabel = styled.p`
  font-weight: bold;
`;

const Amount = styled.div`
  font-size: 23px;
  margin-top: 15px;
  color: #6e934d;
  font-weight: bold;
`;

const ButtonFrame = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

const FundingButton = styled.button`
  background-color: #6e934d;
  border: none;
  border-radius: 10px;
  color: #fff;
  padding: 0.8rem;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #6e934d91;
    border-radius: 10px;
  }
`;
