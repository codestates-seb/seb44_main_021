import React from "react";
import styles from "./AboutPage.module.css";
import { teamInfo } from "../../constants/about";
import { styled } from "styled-components";

const AboutPage = () => {
  return (
    <AboutContainer>
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
      <div className={styles.title}>
        <h1>Our team</h1>
        <h1>Re:21</h1>
      </div>
      <TeamInfoContainer>
        <ul>
          {teamInfo.map((member, index) => (
            <li key={index} className="About__info-box">
              <div>
                <img src={member.imgSrc} alt={member.alt} />
                <p>{member.name}</p>
              </div>

              <div className="worklog">
                <h2>Work Log</h2>

                {member.workLog.map((log, logIndex) => (
                  <p key={logIndex}>{log}</p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </TeamInfoContainer>
      {/* <div id={styles.footer}>IEUN CO.</div> */}
    </AboutContainer>
  );
};

export default AboutPage;

const AboutContainer = styled.main`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const OverviewContainer = styled.section`
  position: relative;
  .About__overview-img {
    width: 100%;
    height: calc(100vh - 80px);
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
const TeamInfoContainer = styled.section`
  height: 200px;
  width: 100%;
  ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 30px;
  }
  .About__info-box {
    padding: 1rem;
    margin-top: 10rem;
    position: relative;
    align-items: center;
    justify-content: center;
    display: flex;
    width: 100px;
    height: 120px;
    background-color: #ffffff;
    border-radius: 0px;
    border: 1px solid rgb(30, 30, 35);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
    overflow: hidden;
    transition: 300ms ease;

    div > img {
      width: 90px;
      height: 90px;
      border-radius: 20px;
    }

    &:hover {
      padding-right: 200px;
      height: 200px;
    }

    .worklog {
      position: absolute;
      top: 0;
      color: red;
      width: 180px;
      left: 150px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      /* overflow: hidden; */
      opacity: 1;
      transition: left 250ms ease, opacity 400ms ease;
      cursor: default;
    }
  }
`;
