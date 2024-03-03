import styled from "styled-components";
import { Link } from "react-router-dom";

const List = (props) => {
  return (
    <>
      {props.upcyclingId ? (
        <ListLink to={`/fundingdetail/${props.upcyclingId}`}>
          <Contentsbox>
            <ContentsImg src={props.thumbNailImage} alt="img" />
            <ContentsText>{props.title}</ContentsText>
            <ContentsSub>{props.content}</ContentsSub>
            <ContentsFooter>{`@${props.displayName}`}</ContentsFooter>
          </Contentsbox>
        </ListLink>
      ) : (
        <a href={props.href} target="_blank" rel="noreferrer">
          <Contentsbox>
            <ContentsImg src={process.env.PUBLIC_URL + props.src} alt="test" />
            <ContentsText>{props.title}</ContentsText>
            <ContentsSub>{props.text}</ContentsSub>
            <ContentsFooter>{props.footer}</ContentsFooter>
          </Contentsbox>
        </a>
      )}
    </>
  );
};

export default List;

const ListLink = styled(Link)`
  outline: none;
  text-decoration: none;
  color: black;
`;

const Contentsbox = styled.div`
  width: 100%;
  border-radius: 20px;
  color: rgb(43, 43, 43);
  word-break: break-all;
`;

const ContentsImg = styled.img`
  height: 30vh;
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 100%;
    height: 250px;
  }
`;

const ContentsText = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 15px 0 10px 0;
`;

const ContentsSub = styled.div`
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const ContentsFooter = styled.div`
  font-size: 0.8rem;
  line-height: 1.6;
`;
