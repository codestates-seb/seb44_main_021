import styled from "styled-components";
import { Link } from "react-router-dom";

const Banner = ({ order, link, img }) => {
  return (
    <Hor>
      <Link to={link}>
        {order === "first" ? (
          <>
            <FirstBanner>
              <img src={process.env.PUBLIC_URL + img} alt="banner" />
              <div className="paragraph">
                <p className="sub-content">숨어있는 것들로 세상을 이롭게</p>
                <p>··</p>
                <p>利隱</p>
              </div>
            </FirstBanner>
          </>
        ) : (
          <OtherBanner>
            <img src={process.env.PUBLIC_URL + img} alt="banner" />
            {order === "second" ? (
              <div className="caption">
                <strong>
                  UPCYCLING IS ‘FUN’DING:
                  <br />
                  IEUN
                </strong>
                <p>
                  업사이클링은 더이상 환경보호만의 역할을 하는 것이 아니에요.
                  <br />
                  <br />
                  이은에서 제공하는 다양한 업사이클링 품목들을 보며
                  <br />
                  당신이 마음에 드는 제품에 펀딩 해봐요.
                  <br />
                  <br />
                  지금까지 경험해보지 못했던, FUN한 경험이 될 거에요.
                </p>
              </div>
            ) : (
              <div className="caption">
                <strong>
                  UPCYCLING ITEM:
                  <br />
                  IEUN
                </strong>
                <p>
                  “이런 걸로도 업사이클링이 돼?”
                  <br />
                  <br />
                  이은에서 판매 중인 다양한 업사이클링 제품을 만나보세요.
                  <br />
                  <br />
                  집에 숨어있던 다양한 재활용품으로 만든
                  <br />
                  업사이클링 제품들을 마주한다면,
                  <br />
                  당신에게 신선한 충격이 될 수 있을 거에요.
                </p>
              </div>
            )}
          </OtherBanner>
        )}
      </Link>
    </Hor>
  );
};

export default Banner;

const Hor = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  padding: 0 5rem;
  padding-top: 7rem;
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const OtherBanner = styled.div`
  width: 100vw;
  height: calc(100vh - 7rem);
  display: flex;

  .caption {
    padding-left: 1rem;
    > strong {
      font-size: 2rem;
      color: #545454;
      letter-spacing: 0.3rem;
      font-weight: 800;
    }
    p {
      margin-top: 3rem;
      font-size: 1.1rem;
      letter-spacing: -1.5px;
      line-height: 2rem;
      font-weight: 100;
    }
  }
  img {
    width: 65%;
    padding-bottom: 0;
    object-fit: cover;
  }
  @media (max-width: 768px) {
    position: relative;
    flex-direction: column;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 500px;
    }

    .caption {
      left: 10px;
      top: 50%;
      position: absolute;
      padding-left: 0;
      > strong {
        color: #ffffffc2;
      }
      p {
        display: none;
      }
    }
  }
`;

const FirstBanner = styled.div`
  height: calc(100vh - 7rem);
  position: relative;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & > .paragraph {
    font-weight: 100;
    display: flex;
    position: absolute;
    color: #fff;
    top: 6rem;
    right: 7rem;
    > p {
      writing-mode: vertical-rl;
      font-size: 1.2rem;
      &:nth-child(2) {
        position: relative;
        writing-mode: horizontal-tb;
        top: -35px;
        font-size: 4rem;
        margin: 0 1rem;
      }
      &:nth-child(3) {
        writing-mode: vertical-rl;
        font-size: 2rem;
        letter-spacing: 1.8rem;
        font-weight: 300;
      }
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    > img {
      height: 500px;
    }
    > .paragraph {
      top: 20px;
      right: 10px;
      > p {
        font-size: 0.8rem;
        &:nth-child(2) {
          margin: 0 0.3rem;
          top: -15px;
          font-size: 2rem;
        }
        &:nth-child(3) {
          font-size: 1.6rem;
          letter-spacing: 1.2rem;
          font-weight: 300;
        }
      }
    }
  }
`;
