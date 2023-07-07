import React, { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import style from "./MainPage.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loading from "../../loading";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CloseIcon from "@mui/icons-material/Close";

const MainPage = () => {
  const [logoSize, setLogoSize] = useState(70);
  const [nowloding, setNowloding] = useState(false);
  const [open, setOpen] = useState(false);
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

  gsap.registerPlugin(ScrollTrigger);

  // useEffect(() => {
  //   gsap.to(".horwrap", {
  //     x: -1000,
  //     duration: 5,
  //     scrollTrigger: {
  //       trigger: ".horwrap",
  //       start: "top 255px",
  //       end: "bottom top",
  //       scrub: true,
  //       pin: ".horwrap",
  //       markers: true,
  //     },
  //   });
  //   setNowloding(true);
  // }, [nowloding]);

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
                <button onClick={closeModal} id={style.closebutton}>
                  <CloseIcon sx={{ fontSize: 50 }} />
                </button>
                <div id={style.sidelist}>
                  <div className={style.sidelistText}>펀딩 페이지</div>
                  <div className={style.sidelistText}>상품 페이지</div>
                  <div className={style.sidelistText}>About 페이지</div>
                </div>
              </div>
            </div>
          ) : null}
          <div id={style.header}>
            <button className={style.button} onClick={openModal}>
              <MenuIcon sx={{ fontSize: 50 }} />
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
              <AccountBoxIcon className={style.button} sx={{ fontSize: 50 }} />
            </button>
          </div>
          <div id={style.main}>
            <div className="horwrap" ref={horwrapRef}>
              <div className={style.horwrap}>
                <div className={style.hor}>
                  <img
                    src={process.env.PUBLIC_URL + "/image/test1.jpg"}
                    alt="test"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className={style.hor}>
                  <img
                    src={process.env.PUBLIC_URL + "/image/test2.jpg"}
                    alt="test"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className={style.hor}>
                  <img
                    src={process.env.PUBLIC_URL + "/image/test3.jpg"}
                    alt="test"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            </div>
            <div id={style.contents}>
              <h1>뉴스</h1>
              <div className={style.contentslist}>
                <div className={style.contentsbox}>box</div>
                <div className={style.contentsbox}>box</div>
                <div className={style.contentsbox}>box</div>
                <div className={style.contentsbox}>box</div>
              </div>
              <h1>광고</h1>
              <div className={style.contentslist}>
                <div className={style.contentsbox}>box</div>
                <div className={style.contentsbox}>box</div>
                <div className={style.contentsbox}>box</div>
                <div className={style.contentsbox}>box</div>
              </div>
            </div>
            <div id={style.footer}>
              <div id={style.footercontents}></div>
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
