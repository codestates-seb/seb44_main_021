import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loading from "../../Loading";
import ProfileDropdown from "../../components/Header/dropdown/ProfileDropdown";
import List from "../../components/Main/List";
import Banner from "../../components/Main/Banner";
import Footer from "../../components/Main/Footer";
import styled from "styled-components";
import SideBarModal from "../../components/Header/SideBarModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const MainPage = () => {
  const [nowloding, setNowloding] = useState(false);
  const [data, setData] = useState([]);
  const horwrapRef = useRef(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    if (accessToken) {
      localStorage.setItem("token", accessToken);
    }

    axiosInstance({
      url: "/upcyclings/descending?page=1&size=4",
      method: "get",
    })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => console.log(err));

    setNowloding(true);
  }, []);

  useEffect(() => {
    if (horwrapRef.current) {
      const horwrapWidth = horwrapRef.current.offsetWidth;

      gsap.to(horwrapRef.current, {
        xPercent: -100,
        duration: 3,
        scrollTrigger: {
          trigger: horwrapRef.current,
          // start: "top center",
          end: `+=${horwrapWidth}`,
          scrub: window.innerWidth > 768 ? 0.5 : 0,
          pin: window.innerWidth > 768 ? horwrapRef.current : false,
        },
      });
    }
    setNowloding(true);
  }, [nowloding, horwrapRef.current]);

  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return (
    <>
      {nowloding ? (
        <div>
          <Header>
            <SideBarModal />
            <Logo>
              <LogoImg
                src={process.env.PUBLIC_URL + "/image/logo3.png"}
                alt="로고"
              />
              <LogoImg
                src={process.env.PUBLIC_URL + "/image/logo2.png"}
                alt="로고"
              />
            </Logo>
            <ProfileDropdown />
          </Header>

          <Main>
            {/* 반응형 배너 캐러셀 적용 */}
            {window.innerWidth <= 768 ? (
              <CustomSwiper
                pagination={true}
                modules={[Pagination]}
                autoHeight={true}
              >
                <SwiperSlide>
                  <Banner
                    link="/about"
                    img="/image/banner1.jpeg"
                    order="first"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Banner link="/funding" img="/image/banner5.png" />
                </SwiperSlide>
                <SwiperSlide>
                  <Banner link="/store" img="/image/banner3.jpg" />
                </SwiperSlide>
              </CustomSwiper>
            ) : (
              <Horwrap className="horwrap" ref={horwrapRef}>
                <Banner link="/about" img="/image/banner1.webp" order="first" />
                <Banner link="/funding" img="/image/banner2.webp" />
                <Banner link="/store" img="/image/banner3.webp" />
              </Horwrap>
            )}
            <ContentsFrame>
              <H1>Magazine</H1>
              <Contentslist>
                <List
                  href="https://eco-fresh.co.kr/article/%EC%97%90%EC%BD%94-%EB%A7%A4%EA%B1%B0%EC%A7%84/1008/168259/"
                  src="/image/test13.png"
                  title="이은이 알려주는 친환경 잡지"
                  text="제로 웨이스트, 리업사이클 등 8개의 키워드 제품을 판매하는 eco fresh를 소개할게요!"
                  footer="@ecomagazine"
                />
                <List
                  href="https://www.eyesmag.com/search?s=%EC%97%85%EC%82%AC%EC%9D%B4%ED%81%B4%EB%A7%81"
                  src="/image/test14.png"
                  title="친환경을 주목하는 아이즈매거진"
                  text="클린뷰티부터 스투시까지, 이은이 소개하는 업사이클링의 최신 트렌트를 읽어보세요 🙂"
                  footer="@eyesmagazine"
                />
                <List
                  href="https://www.beautifulstore.org/upcycling"
                  src="/image/test15.jpg"
                  title="'에코라이프스타일'의 확산"
                  text="아름다운 가게에서 소개하는 '에코파티메아리'를 확인해보세요😎"
                  footer="@beautifulstore"
                />
                <List
                  href="https://metropolismag.com/sustainability/"
                  src="/image/test16.jpg"
                  title="지속가능한 업사이클링 인테리어"
                  text="전세계가 열광하는 지속가능한 인테리어의 세계로 여러분을 초대합니다 📢"
                  footer="@metropolis"
                />
              </Contentslist>
              <H1>Funding</H1>
              {data.length > 3 ? (
                <Contentslist>
                  {data.slice(0, 4).map((item, index) => (
                    <div key={index}>
                      <List {...item} />
                    </div>
                  ))}
                </Contentslist>
              ) : null}
            </ContentsFrame>
          </Main>
          <Footer />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default MainPage;

//styled-components

const CustomSwiper = styled(Swiper)`
  .swiper-slide {
    margin-top: 7rem;
  }
  .swiper-pagination-bullet-active {
    background: var(--color-main);
  }
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 70px;
  z-index: 90;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: transparent;
  padding: 0 30px;
  padding-top: 30px;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 20px;
`;

const Main = styled.div`
  background-color: #f5f5f5;
  margin-bottom: 100vh;
  overflow: hidden;
`;

const Horwrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200vw;

  background-color: #f5f5f5;
  height: 100%;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const ContentsFrame = styled.div`
  padding: 5rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Contentslist = styled.div`
  display: grid;
  width: 100%;
  gap: 3rem;
  /* grid-template-columns: repeat(4, minmax(0, 1fr)); */
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  @media (max-width: 425px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const H1 = styled.h1`
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: 700;
  color: #639443;
`;
