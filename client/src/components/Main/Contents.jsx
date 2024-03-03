import styled from "styled-components";

const Contents = ({ href, src, title, text, footer }) => {
  return (
    <A href={href} target="_blank" rel="noreferrer">
      <ContentsBox>
        <ContentsImg src={process.env.PUBLIC_URL + src} alt="test" />
        <ContentsText>{title}</ContentsText>
        <ContentsSub>{text}</ContentsSub>
        <ContentsFooter>{footer}</ContentsFooter>
      </ContentsBox>
    </A>
  );
};

export default Contents;

const A = styled.a`
  outline: none;
  text-decoration: none;
  color: black;
  font-size: 17px;
  font-weight: 600;
`;

const ContentsBox = styled.div`
  border-radius: 20px;
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

const ContentsText = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 20px;
  font-weight: bold;
  margin: 15px 0 10px 0;
`;

const ContentsSub = styled.p`
  font-size: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const ContentsFooter = styled.p`
  font-size: 6px;
  line-height: 1.6;
`;
