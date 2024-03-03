import styled from "styled-components";

const Footer = () => {
  return (
    <FooterStyle>
      <Image
        src={process.env.PUBLIC_URL + "/image/footer.webp"}
        alt="footer-image"
      />
      <div className="paragraph">
        <p className="sub-content">숨어있는것들로세상을이롭게</p>
        <p>··</p>
        <p>利隱</p>
      </div>
      <div className="about_us">
        <p>About Us</p>
        <p>
          23.06.28 ~ 24.07.24
          <br />
          FE : 신성철, 곽시현, 나예진
          <br />
          BE : 강병주, 박재성, 윤승현
        </p>
      </div>
    </FooterStyle>
  );
};

export default Footer;

const FooterStyle = styled.div`
  position: fixed;
  top: 0px;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c3c3c3;
  > .paragraph {
    font-weight: 100;
    display: flex;
    position: absolute;
    p:nth-child(1) {
      writing-mode: vertical-rl;
      font-size: 1.2rem;
    }
    p:nth-child(2) {
      position: relative;
      top: -30px;
      font-size: 4rem;
      margin: 0 1rem;
    }
    p:nth-child(3) {
      writing-mode: vertical-rl;
      font-size: 2.5rem;
      letter-spacing: 1.8rem;
      font-weight: 300;
    }
  }

  .about_us {
    position: absolute;
    bottom: 20px;
    right: 30px;

    font-weight: 100;
    > p {
      font-size: 0.8rem;
      &:nth-child(2) {
        line-height: 1.5rem;
      }
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
