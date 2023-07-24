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
          <div className={styles.title}>
            <h1>Our team</h1>
            <h1>Re:21</h1>
          </div>

          <div className={styles.teamInfowrapper}>
            <div className={styles.teamInfo}>
              <img
                src={`${process.env.PUBLIC_URL}/image/성철.png`}
                alt="team-img"
              />
              <p>FE 신성철</p>
              <div class={styles.arrowBox}>
                <p style={{ marginBottom: "10px" }}>Work Log</p>
                <ul>
                  <li>Main Page</li>
                  <li>Funding Detail Page</li>
                  <li>Store Detail Page</li>
                  <li>Funding List Page</li>
                  <li>Store List Page</li>
                </ul>
              </div>
            </div>
            <div className={styles.teamInfo}>
              <img
                src={`${process.env.PUBLIC_URL}/image/시현.jpg`}
                alt="team-img"
              />
              <p>FE 곽시현</p>
              <div class={styles.arrowBox}>
                <p style={{ marginBottom: "10px" }}>Work Log</p>
                <ul>
                  <li>Funding Create Page</li>
                  <li>Store Create Page</li>
                  <li>Funding Edit Page</li>
                  <li>Store Edit Page</li>
                </ul>
              </div>
            </div>
            <div className={styles.teamInfo}>
              <img
                src={`${process.env.PUBLIC_URL}/image/예진.jpg`}
                alt="team-img"
              />
              <p>FE 나예진</p>
              <div class={styles.arrowBox}>
                <p style={{ marginBottom: "10px" }}>Work Log</p>
                <ul>
                  <li>SignUp page</li>
                  <li>LogIn Page</li>
                  <li>My Page</li>
                </ul>
              </div>
            </div>

            <div className={styles.teamInfo}>
              <img
                src={`${process.env.PUBLIC_URL}/image/병주.jpg`}
                alt="team-img"
              />
              <p>BE 강병주</p>
              <div class={styles.arrowBox}>
                <p style={{ marginBottom: "10px" }}>Work Log</p>
                <ul>
                  <li>상품(Sell)</li>
                  <li>order(주문)</li>
                  <li>OAuth2(구글)</li>
                </ul>
              </div>
            </div>
            <div className={styles.teamInfo}>
              <img
                src={`${process.env.PUBLIC_URL}/image/재성.jpg`}
                alt="team-img"
              />
              <p>BE 박재성</p>
              <div class={styles.arrowBox}>
                <p style={{ marginBottom: "10px" }}>Work Log</p>
                <ul>
                  <li>배포</li>
                  <li>
                    깃허브 액션
                    <br />
                    (자동 배포)
                  </li>
                  <li>이미지</li>
                  <li>회원가입(메일)</li>
                </ul>
              </div>
            </div>
            <div className={styles.teamInfo}>
              <img
                src={`${process.env.PUBLIC_URL}/image/승현.jpg`}
                alt="team-img"
              />
              <p>BE 윤승현</p>
              <div class={styles.arrowBox}>
                <p style={{ marginBottom: "10px", fontSize: "16px" }}>
                  Work Log
                </p>
                <ul>
                  <li>업사이클링</li>
                  <li>펀딩</li>
                  <li>검색기능</li>
                  <li>
                    로그인
                    <br />
                    (access token)
                    <br />
                    local storage
                  </li>
                  <li>로그아웃(Redis)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* <div className={styles.companyInfo}>
          <h1>Company Info</h1>
          <div className={styles.infoBox}>dddd</div>
        </div> */}
      </div>
      <div id={styles.footer}>IEUN CO.</div>
    </div>
  );
};

export default AboutPage;
