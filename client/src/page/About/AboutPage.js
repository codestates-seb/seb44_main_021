import React from "react";
import Header from "../../components/Header/Header";
import styles from "./AboutPage.module.css";

const AboutPage = () => {
  return (
    <div className={styles.aboutContainer}>
      <Header />
      <div className={styles.aboutWrapper}>
        <div className={styles.about}>
          <img
            src={`${process.env.PUBLIC_URL}/image/about-img.png`}
            alt="about_img"
          />
          <p>
            <b style={{ fontSize: 25, color: "#6e934d" }}>이은</b>은 숨어있는
            것들로 세상을 이롭게 한다는 브랜드 철학을 바탕으로 지구에 좀 더
            친화적인 환경을 제공하기 위해,
            <br /> 안쓰는 물건 펀딩,업사이클링 제품 판매 등
            <b> 최고의(First) 차별화된(Unique) 세상에 없던(new) F.U.N 경험</b>
            을 선사하고자 항상 노력합니다. <br /> 지구를 지키는 첫번째 과정
            <b style={{ fontSize: 25, color: "#6e934d" }}> 이은</b>과 함께
            해보세요.
          </p>
        </div>

        <div className={styles.teamInfoContainer}>
          <h1>Our team</h1>
          <div className={styles.teamInfowrapper}>
            <div className={styles.teamInfo}>
              <img src={`${process.env.PUBLIC_URL}/image/성철.png`} />
            </div>
            <div className={styles.teamInfo}>
              <img src={`${process.env.PUBLIC_URL}/image/시현.jpg`} />
            </div>
            <div className={styles.teamInfo}>
              <img src={`${process.env.PUBLIC_URL}/image/예진.jpg`} />
            </div>

            <div className={styles.teamInfo}></div>
            <div className={styles.teamInfo}></div>
            <div className={styles.teamInfo}></div>
          </div>
        </div>

        <div className={styles.companyInfo}>
          <h1>Company Info</h1>
          <div className={styles.infoBox}>dddd</div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
