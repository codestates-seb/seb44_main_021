import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loading from "../../loading";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ProfileDropdown from "../../components/Header/dropdown/ProfileDropdown";
import List from "../../components/Main/List";
import SideLink from "../../components/Main/SideLink";
import Banner from "./../../components/Main/Banner";
import Footer from "../../components/Main/Footer";
import styled, { keyframes } from "styled-components";

const MainPage = () => {
  const [nowloding, setNowloding] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const horwrapRef = useRef(null);

  const [isUnmount, setIsUnmount] = useState(false);

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
        // x: -horwrapWidth,
        xPercent: -100,
        duration: 3,
        scrollTrigger: {
          trigger: horwrapRef.current,
          // start: "top center",
          end: `+=${horwrapWidth}`,
          scrub: 0.5,
          pin: horwrapRef.current,
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

  const openModal = () => {
    setIsUnmount(false);
    setOpen(true);
  };

  const closeModal = () => {
    setIsUnmount(true);

    setTimeout(() => {
      setOpen(false); // animeTimeMs의 시간후 모달 닫음
    }, 900);
  };

  return (
    <>
      {nowloding ? (
        <div>
          {open ? (
            <ModalOverlay>
              <ModalContent isUnmount={isUnmount}>
                <ModalLogo>
                  <img
                    src={process.env.PUBLIC_URL + "/image/logo1.png"}
                    alt="로고"
                  />
                  <Closebutton onClick={closeModal}>
                    <CloseIcon sx={{ fontSize: 30, color: "#000000" }} />
                  </Closebutton>
                </ModalLogo>
                <Sidelist>
                  <SideLink to="/funding" text="펀딩+" />
                  <SideLink to="/store" text="스토어" />
                  <SideLink to="/about" text="About" />
                  <TeamName>IEUN CO.</TeamName>
                </Sidelist>
              </ModalContent>
            </ModalOverlay>
          ) : null}
          <Header>
            <OpenModalButton onClick={openModal}>
              <MenuIcon sx={{ fontSize: 40, color: "#6E934D" }} />
            </OpenModalButton>
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
            <Horwrap className="horwrap" ref={horwrapRef}>
              <Banner link="/about" img="/image/test4.jpg" />
              <Banner link="/funding" img="/image/test6.jpg" />
              <Banner link="/store" img="/image/test7.jpg" />
            </Horwrap>
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

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 95;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  height: 100%;
  width: 20%;
  animation: ${(props) => {
      if (props.isUnmount === true) {
        return closeModal;
      } else {
        return openModal;
      }
    }}
    1s forwards;
`;

const openModal = keyframes`
  0% {
    transform: translateX(-300px);
  }
  100% {
    transform: translateX(0px);
  }
`;

const closeModal = keyframes`
  0% {
    margin-top: 0px;
  }
  100% {
    transform: translateX(-300px);
  }
`;

const ModalLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    margin-top: 10px;
    width: 60px;
    height: 60px;
  }
`;

const Closebutton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 20px;
  cursor: pointer;
  position: absolute;
  top: 1px;
  right: 1px;
`;

const Sidelist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const TeamName = styled.p`
  font-size: 35px;
  color: #353535;
  font-weight: bold;
  margin-top: 170px;
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

const OpenModalButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
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
`;

const Horwrap = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  width: 200vw;
  height: 100%;
`;

const ContentsFrame = styled.div`
  padding: 5rem;
`;

const Contentslist = styled.div`
  display: grid;
  gap: 3rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
`;

const H1 = styled.h1`
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #639443;
`;
