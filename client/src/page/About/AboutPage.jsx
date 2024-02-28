import React from "react";
import { styled } from "styled-components";

const AboutPage = () => {
  return (
    <>
      <OverviewContainer>
        <img
          className="About__overview-img"
          src={`${process.env.PUBLIC_URL}/image/sign-bg.webp`}
          alt="about-overview"
        />
        <span>
          <img
            src={`${process.env.PUBLIC_URL}/image/logo2.png`}
            alt="about_img"
          />
          은 숨어있는 것들로 세상을 이롭게 한다는 브랜드 철학을 바탕으로 <br />
          지구에 좀 더 친화적인 환경을 제공하기 위해,
          <br /> 사용하지 않는 물건 펀딩, 업사이클링 제품 판매 등<br />
          <em>최고의(First) 차별화된(Unique) 세상에 없던(New) F.U.N 경험</em>
          <br />
          을 선사하고자 노력합니다. <br /> 지구를 지키는 첫번째 과정
          <img
            src={`${process.env.PUBLIC_URL}/image/logo2.png`}
            alt="about_img"
          />
          과 함께 해보세요.
        </span>
      </OverviewContainer>
    </>
  );
};

export default AboutPage;

const OverviewContainer = styled.main`
  position: relative;
  z-index: 999;
  .About__overview-img {
    width: 100vw;
    height: calc(100vh - 80px);
    object-fit: cover;
  }
  & > span {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffffce;
    color: #4b4b4b;
    font-size: 1rem;
    padding: 40px 0;
    text-align: center;
    letter-spacing: -1.5px;
    line-height: 40px;
    & > img {
      width: 50px;
      height: 50px;
      border-radius: 10px;
      vertical-align: middle;
    }
    & > em {
      font-weight: 500;
    }
  }
`;
