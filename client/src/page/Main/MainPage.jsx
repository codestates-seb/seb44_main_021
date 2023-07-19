import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Lenis from "@studio-freight/lenis";
import style from "./MainPage.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loading from "../../loading";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CloseIcon from "@mui/icons-material/Close";
import NorthEastSharpIcon from "@mui/icons-material/NorthEastSharp";

const MainPage = () => {
  const [logoSize, setLogoSize] = useState(60);
  const [nowloding, setNowloding] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const horwrapRef = useRef(null);

  // const handleScroll = () => {
  //   let scrollPosition = window.scrollY;
  //   console.log(scrollPosition);
  //   if (scrollPosition > 750) {
  //     scrollPosition = 750;
  //   }
  //   const newLogoSize = logoSize - scrollPosition / 5;
  //   setLogoSize(newLogoSize);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    axios({
      url: "/upcyclings?page=1&size=4",
      method: "get",
    })
      .then((response) => {
        setData(response.data.data);
        console.log(data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (horwrapRef.current) {
      const horwrapWidth = horwrapRef.current.offsetWidth;
      gsap.to(".horwrap", {
        x: -horwrapWidth * 2 - 600,
        duration: 3,
        scrollTrigger: {
          trigger: ".horwrap",
          start: "top 145px",
          end: "+=330%",
          scrub: true,
          pin: ".horwrap",
          // markers: true,
        },
      });
    }
    setNowloding(true);
  }, [nowloding, horwrapRef.current]);

  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      {nowloding ? (
        <div id={style.mainpage}>
          {open ? (
            <div className={style.modalOverlay}>
              <div className={style.modalContent}>
                <div className={style.modalLogo}>
                  <img
                    src={process.env.PUBLIC_URL + "/image/logo5.png"}
                    alt="로고"
                    style={{
                      width: "60px",
                      height: "60px",
                    }}
                  />
                  <button onClick={closeModal} id={style.closebutton}>
                    <CloseIcon sx={{ fontSize: 30, color: "#000000" }} />
                  </button>
                </div>
                <div id={style.sidelist}>
                  <Link to="/funding" className={style.link}>
                    <div className={style.sidelistText}>펀딩 페이지</div>
                  </Link>
                  <Link to="/store" className={style.link}>
                    <div className={style.sidelistText}>상품 페이지</div>
                  </Link>
                  <Link to="/about" className={style.link}>
                    <div className={style.sidelistText}>About</div>
                  </Link>
                  <p
                    style={{
                      fontSize: "50px",
                      color: "#000000",
                      fontWeight: "bold",
                      marginTop: "170px"
                    }}
                  >
                    利   隱
                  </p>

                </div>
              </div>
            </div>
          ) : null}
          <div id={style.header}>
            <button className={style.button} onClick={openModal}>
              <MenuIcon sx={{ fontSize: 40, color: "#6E934D" }} />
            </button>
            <div id={style.logo}>
              <img
                src={process.env.PUBLIC_URL + "/image/logo3.png"}
                alt="로고"
                style={{
                  width: `${logoSize}px`,
                  height: `${logoSize}px`,
                  borderRadius: "20px",
                }}
              />
              <img
                src={process.env.PUBLIC_URL + "/image/logo2.png"}
                alt="로고"
                style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
              />
            </div>
            <button className={style.button}>
              <Link to="/login">
                <AccountBoxIcon
                  className={style.button}
                  sx={{ fontSize: 40, color: "#6E934D" }}
                />
              </Link>
            </button>
          </div>
          <div id={style.main}>
            <div className="horwrap" ref={horwrapRef}>
              <div className={style.horwrap}>
                <div className={style.hor}>
                  <img
                    src={process.env.PUBLIC_URL + "/image/test4.jpg"}
                    alt="test"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className={style.hor}>
                  <img
                    src={process.env.PUBLIC_URL + "/image/test6.jpg"}
                    alt="test"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className={style.hor}>
                  <img
                    src={process.env.PUBLIC_URL + "/image/test7.jpg"}
                    alt="test"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            </div>
            <div id={style.contents}>
              <div id={style.h1boxMagazine}>
                <h1 className={style.h1}>Magazine</h1>
              </div>
              <div className={style.contentslist}>
                <a
                  href="https://eco-fresh.co.kr/article/%EC%97%90%EC%BD%94-%EB%A7%A4%EA%B1%B0%EC%A7%84/1008/168259/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={style.contentsbox}>
                    <img
                      src={process.env.PUBLIC_URL + "/image/test10.jpg"}
                      alt="test"
                      style={{
                        width: "100%",
                        height: "80%",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        marginBottom: "15px",
                      }}
                    >

                    </p>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      이은이 알려주는 친환경 잡지
                    </p>
                    <p
                      style={{
                        fontSize: "14px", lineHeight: "1.8", marginBottom: "5px"
                      }}
                    >
                      제로 웨이스트, 리업사이클 등 8개의 키워드 제품을 판매하는 eco fresh를 소개할게요!
                    </p>

                    <p
                      style={{
                        fontSize: "6px", lineHeight: "1.6"
                      }}
                    >
                      @ecomagazine
                    </p>
                  </div>
                </a>
                <a
                  href="https://www.eyesmag.com/search?s=%EC%97%85%EC%82%AC%EC%9D%B4%ED%81%B4%EB%A7%81"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={style.contentsbox}>
                    <img
                      src={process.env.PUBLIC_URL + "/image/test13.png"}
                      alt="test"
                      style={{
                        width: "100%",
                        height: "80%",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                      }}
                    />
                    
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        marginBottom: "15px",
                      }}
                    >

                    </p>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      친환경을 주목하는 아이즈매거진
                    </p>
                    <p
                      style={{
                        fontSize: "14px", lineHeight: "1.8", marginBottom: "5px"
                      }}
                    >
                      클린뷰티부터 스투시까지, 이은이 소개하는 업사이클링의 최신 트렌트를 읽어보세요 🙂
                    </p>

                    <p
                      style={{
                        fontSize: "6px", lineHeight: "1.6"
                      }}
                    >
                      @eyesmagazine
                    </p>

                  </div>
                </a>
                <a
                  href="https://www.beautifulstore.org/upcycling"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={style.contentsbox}>
                    <img
                      src={process.env.PUBLIC_URL + "/image/test11.jpg"}
                      alt="test"
                      style={{
                        width: "100%",
                        height: "80%",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                      }}
                    />

                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        marginBottom: "15px",
                      }}
                    >

                    </p>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      '에코라이프스타일'의 확산
                    </p>
                    <p
                      style={{
                        fontSize: "14px", lineHeight: "1.8", marginBottom: "5px"
                      }}
                    >
                      아름다운 가게에서 소개하는 '에코파티메아리'를 확인해보세요 😎
                    </p>

                    <p
                      style={{
                        fontSize: "6px", lineHeight: "1.6"
                      }}
                    >
                      @beautifulstore
                    </p>
                  </div>
                </a>
                <a
                  href="https://metropolismag.com/sustainability/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={style.contentsbox}>
                    <img
                      src={process.env.PUBLIC_URL + "/image/news4.jpg"}
                      alt="test"
                      style={{
                        width: "100%",
                        height: "80%",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        marginBottom: "15px",
                      }}
                    >

                    </p>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: "10px",
                      }}
                    >
                      지속가능한 업사이클링 인테리어
                    </p>
                    <p
                      style={{
                        fontSize: "14px", lineHeight: "1.8", marginBottom: "5px"
                      }}
                    >
                      전세계가 열광하는 지속가능한 인테리어의 세계로 여러분을 초대합니다 📢
                    </p>

                    <p
                      style={{
                        fontSize: "6px", lineHeight: "1.6"
                      }}
                    >
                      @metropolis
                    </p>
                  </div>
                </a>
              </div>
              <div id={style.h1boxFunding}>
                <h1 className={style.h1}>Funding</h1>
              </div>
              {data.length > 0 ? (
                <div className={style.contentslist}>
                  <Link to="/fundingdetail" className={style.link}>
                    <div className={style.contentsbox}>
                      <img
                        src={data[0].thumbNailImage}
                        alt="img"
                        style={{
                          width: "100%",
                          height: "80%",
                          borderTopLeftRadius: "20px",
                          borderTopRightRadius: "20px",
                        }}
                      />
                      {data[0].title}
                    </div>
                  </Link>

                  <Link to="/fundingdetail" className={style.link}>
                    <div className={style.contentsbox}>
                      <img
                        src={data[1].thumbNailImage}
                        alt="img"
                        style={{
                          width: "100%",
                          height: "80%",
                          borderTopLeftRadius: "20px",
                          borderTopRightRadius: "20px",
                        }}
                      />
                      {data[1].title}
                    </div>
                  </Link>

                  <Link to="/fundingdetail" className={style.link}>
                    <div className={style.contentsbox}>
                      <img
                        src={data[2].thumbNailImage}
                        alt="img"
                        style={{
                          width: "100%",
                          height: "80%",
                          borderTopLeftRadius: "20px",
                          borderTopRightRadius: "20px",
                        }}
                      />
                      {data[2].title}
                    </div>
                  </Link>

                  <Link to="/fundingdetail" className={style.link}>
                    <div className={style.contentsbox}>
                      <img
                        src={data[3].thumbNailImage}
                        alt="img"
                        style={{
                          width: "100%",
                          height: "80%",
                          borderTopLeftRadius: "20px",
                          borderTopRightRadius: "20px",
                        }}
                      />
                      {data[3].title}
                    </div>
                  </Link>
                </div>
              ) : null}
            </div>
            <div id={style.footer}>
              <img
                src={process.env.PUBLIC_URL + "/image/test8.jpg"}
                alt="test"
                style={{ width: "100%", height: "100%" }}
              />
              
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default MainPage;

// const handleScroll = () => {
//   let scrollPosition = window.scrollY;
//   console.log(scrollPosition);
//   if (scrollPosition > 750) {
//     scrollPosition = 750;
//   }
//   const newLogoSize = logoSize - scrollPosition / 5;
//   setLogoSize(newLogoSize);
// };

// useEffect(() => {
//   window.addEventListener("scroll", handleScroll);
//   return () => {
//     window.removeEventListener("scroll", handleScroll);
//   };
// }, []);

// return (
//   <div>
//     <div id={style.header}>
//       <button>사이드바 햄버거</button>
//       <div id={style.logo}>
//         <img
//           src={process.env.PUBLIC_URL + "/image/logo3.png"}
//           alt="로고"
//           style={{
//             width: `${logoSize}px`,
//             height: `${logoSize}px`,
//             borderRadius: "20px",
//           }}
//         />
//         <img
//           src={process.env.PUBLIC_URL + "/image/logo2.png"}
//           alt="로고"
//           style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
//         />
//       </div>
//       <button>로그인 버튼</button>
//     </div>

//     <h2>컨텐츠</h2>
//     <div id={style.contents}>test</div>
//   </div>

// gsap.registerPlugin(ScrollTrigger);

// gsap.to(".horwrap", {
//   scrollTrigger: {
//     trigger: ".horwrap",
//     start: "0% 50%",
//     end: "100% 30%",
//     scrub: 1,
//     // pin: ".horwrap",
//     markers: true,
//   },
//   x: -1300,
// });
