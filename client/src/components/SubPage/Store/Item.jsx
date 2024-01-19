import styled from "styled-components";
import { Link } from "react-router-dom";

const Item = (props) => {
  const formatPriceWithCommas = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <figure>
      <Link to={`/storedetail/${props.sellId}`}>
        <ThumbNailImage src={props.thumbNailImage} alt="로고" />
        <ListText>
          <ListTitle>{props.title}</ListTitle>
          <Pricebox>
            <Price>{formatPriceWithCommas(props.price)}</Price>
            <PriceText>원</PriceText>
          </Pricebox>
        </ListText>
      </Link>
    </figure>
  );
};

export default Item;

const ListFrame = styled.div`
  /* width: 250px;
  height: 300px;
  margin-top: 30px;
  justify-self: end;
  word-break: break-all; */
`;

const ThumbNailImage = styled.img`
  width: 100%;
  height: 150px;
  border-radius: 20px;
  object-fit: cover;
`;

const ListText = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const ListTitle = styled.div`
  display: block;
  font-size: 0.95rem;
  font-weight: bold;
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
