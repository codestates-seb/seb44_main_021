import React, { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import style from "./MainPage.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loading from "../../loading";

const MainPage = () => {
  const [logoSize, setLogoSize] = useState(250);
  const [nowloding, setNowloding] = useState(false);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.to(".horwrap", {
      x: -3000,
      duration: 5,
      scrollTrigger: {
        trigger: ".horwrap",
        start: "top 250px",
        end: "bottom top",
        scrub: true,
        pin: ".horwrap",
      },
    });
    setNowloding(true);
  }, [nowloding]);

  const lenis = new Lenis();

  lenis.on("scroll", (e) => {
    console.log(e);
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return (
    <>
      {nowloding ? (
        <>
          <div id={style.header}>
            <button>사이드바 햄버거</button>
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
            <button>로그인 버튼</button>
          </div>
          <div id={style.main}>
            <div className="horwrap">
              <div className={style.horwrap}>
                <div className={style.hor}>site1</div>
                <div className={style.hor}>site2</div>
                <div className={style.hor}>site3</div>
              </div>
            </div>
            <div id={style.contents}>text</div>
          </div>
        </>
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
