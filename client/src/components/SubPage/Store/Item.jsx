import styled from "styled-components";
import { Link } from "react-router-dom";

const Item = (props) => {
  const formatPriceWithCommas = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <ListFrame>
      <LinkDetail to={`/storedetail/${props.sellId}`}>
        <ThumbNailImage src={props.thumbNailImage} alt="로고" />
        <ListText>
          <ListTitle>{props.title}</ListTitle>
          <Pricebox>
            <Price>{formatPriceWithCommas(props.price)}</Price>
            <PriceText>원</PriceText>
          </Pricebox>
        </ListText>
      </LinkDetail>
    </ListFrame>
  );
};

export default Item;

const ListFrame = styled.div`
  width: 250px;
  height: 300px;
  margin-top: 30px;
  justify-self: end;
  word-break: break-all;
`;

const LinkDetail = styled(Link)`
  outline: none;
  text-decoration: none;
  color: black;
`;

const ThumbNailImage = styled.img`
  width: "250px";
  height: "60%";
  border-radius: "20px";
  object-fit: "cover";
`;

const ListText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 15%;
  margin-top: 10px;
`;

const ListTitle = styled.div`
  display: block;
  font-size: 1em;
  font-weight: bold;
  width: 250px;
  white-space: pre-line;
  word-break: break-all;
`;

const Pricebox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

const Price = styled.div`
  font-size: 1.2em;
  color: #6e934d;
`;

const PriceText = styled.div`
  font-size: 0.8em;
  margin-left: 2px;
`;
