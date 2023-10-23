import styled from "styled-components";
import { Link } from "react-router-dom";

const List = (props) => {
  return (
    <ListLink to={`/fundingdetail/${props.upcyclingId}`}>
      <Contentsbox>
        <ContentsImg src={props.thumbNailImage} alt="img" />
        <ContentsText>{props.title}</ContentsText>
        <ContentsSub>{props.content}</ContentsSub>
        <ContentsFooter>{`@${props.displayName}`}</ContentsFooter>
      </Contentsbox>
    </ListLink>
  );
};

export default List;

const ListLink = styled(Link)`
  outline: none;
  text-decoration: none;
  color: black;
`;

const Contentsbox = styled.div`
  width: 17.7vw;
  height: 35vh;
  border-radius: 20px;
  /* background-color: #c7ffcc; */
  color: rgb(43, 43, 43);
  word-break: break-all;
`;

const ContentsImg = styled.img`
  width: 100%;
  height: 80%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  object-fit: cover;
`;

const ContentsText = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 20px;
  font-weight: bold;
  margin: 15px 0 10px 0;
`;

const ContentsSub = styled.div`
  font-size: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const ContentsFooter = styled.div`
  font-size: 6px;
  line-height: 1.6;
`;
