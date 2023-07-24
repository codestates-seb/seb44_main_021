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
                  <li>Sell CRUD</li>
                  <li>Order</li>
                  <li>OrderSell</li>
                  <li>검색기능</li>
                  <li>
                    기술 문서 작성
                    <br />
                    (notion, google sheet)
                    <br />및 배너 디자인
                  </li>
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
                  <li>Member CRUD</li>
                  <li>AWS S3 버킷 이미지 연동</li>
                  <li>JWT</li>
                  <li>카테고리</li>
                  <li>클라이언트, 서버 배포 및 관리</li>
                  <li>인증번호 이메일</li>
                  <li>GitHub Actions</li>
                  <li>정렬, 필터 기능</li>
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
                  <li>Upcycling CRUD</li>
                  <li>Funding CRUD</li>
                  <li>검색기능</li>
                  <li>Order</li>
                  <li>검색기능</li>
                  <li>Redis 로그아웃</li>
                  <li>인증번호 이메일</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id={styles.footer}>IEUN CO.</div>
    </div>
  );
};

export default AboutPage;
