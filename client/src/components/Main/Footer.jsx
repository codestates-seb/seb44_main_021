import styled from "styled-components";

const Footer = () => {
  return (
    <FooterStyle>
      <Image src={process.env.PUBLIC_URL + "/image/test8.jpg"} alt="test" />
    </FooterStyle>
  );
};

export default Footer;

const FooterStyle = styled.div`
  position: fixed;
  top: 0px;
  left: 0;
  z-index: -1;
  background-color: #4d4d4d;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;
