import styled from "styled-components";
import { Link } from "react-router-dom";

const Banner = ({ link, img }) => {
  return (
    <Hor>
      <LinkPage to={link}>
        <span>
          <Image src={process.env.PUBLIC_URL + img} alt="banner" />
        </span>
      </LinkPage>
    </Hor>
  );
};

export default Banner;

const Hor = styled.div`
  min-width: 100vw;
  min-height: 100%;
  margin-top: 70px;

  /* border-radius: 20px; */
`;

const LinkPage = styled(Link)`
  /* width: 90vw;
  height: 100%; */
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  padding: 5rem;
  padding-bottom: 0;
  object-fit: cover;
`;
