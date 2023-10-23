import styled from "styled-components";
import { Link } from "react-router-dom";

const List = (props) => {
  return (
    <ListFrame>
      <LinkDetail to={`/fundingdetail/${props.upcyclingId}`}>
        <ThumbNailImage src={props.thumbNailImage} alt="섬네일" />
        <ListText>
          <ListTitle>{props.title}</ListTitle>
          <Materiar>
            <Materiaricon
              src={`${process.env.PUBLIC_URL}/image/circle.png`}
              alt="원모양 아이콘"
            />
            {props.categoryName}
          </Materiar>
        </ListText>
      </LinkDetail>
    </ListFrame>
  );
};

export default List;

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

const Materiar = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3px;
  background-color: #6e934d;
  width: max-content;
  padding: 5px;
  padding-right: 10px;
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  color: #fff;
  height: 10px;
  font-size: 13px;
`;

const Materiaricon = styled.img`
  width: 11px;
  height: 11px;
  margin-right: 10px;
`;
