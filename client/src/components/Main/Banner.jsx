import styled from "styled-components";
import { Link } from "react-router-dom";

const Banner = ({ link, img }) => {
  return (
    <Hor>
      <LinkPage to={link}>
        <Image src={process.env.PUBLIC_URL + img} alt="banner" />
      </LinkPage>
    </Hor>
  );
};

export default Banner;

const Hor = styled.div`
  width: 90vw;
  height: 100%;
  border-radius: 20px;
`;

const LinkPage = styled(Link)`
  width: 90vw;
  height: 100%;
  border-radius: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;
