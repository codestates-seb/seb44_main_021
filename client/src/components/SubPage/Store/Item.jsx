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

const ThumbNailImage = styled.img`
  width: 100%;
  height: 150px;
  border-radius: 20px;
  object-fit: cover;
`;

const ListText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 10px;
`;

const ListTitle = styled.div`
  display: block;
  font-size: 0.95rem;
  font-weight: 400;
  height: 36.6px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  word-break: break-all;
  white-space: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
