import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const Modal = ({ data, userData, quantity, setQuantity, setIsModalOpen }) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setQuantity(0);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={handleCloseModal}>
          <CloseIcon />
        </CloseButton>
        <Modaltitle>
          {userData.displayName}님, 구매해 주셔서 감사합니다!!
        </Modaltitle>
        <Modaltext bold marginTop="25px">
          제품명
        </Modaltext>
        <Modaltext marginTop="10px">{data.title}</Modaltext>
        <Modaltext bold marginTop="25px">
          수량
        </Modaltext>
        <Modaltext marginTop="10px">{quantity}개</Modaltext>
        <Amount>총 금액 : {data.price * quantity}원</Amount>
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
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  float: right;
  margin-left: 380px;
`;

const Modaltitle = styled.div`
  font-size: 18px;
  margin-top: 35px;
  color: #6e934d;
`;

const Modaltext = styled.div`
  margin-top: ${(props) => props.marginTop};
  margin-left: 50px;
  width: 90%;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};
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
`;

const FundingButton = styled.button`
  background-color: #6e934d;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: #fff;
  margin-top: 30px;
  margin-right: ${(props) => props.marginRight};
  margin-left: ${(props) => props.marginLeft};
  width: 100%;
  height: 40px;
  font-size: 15px;
  text-align: center;
  &:hover {
    background: #6e934d91;
    border-radius: 10px;
    cursor: pointer;
  }
`;
