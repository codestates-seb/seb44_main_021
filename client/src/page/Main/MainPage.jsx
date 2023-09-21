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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MainPage = () => {
  const [logoSize, setLogoSize] = useState(60);
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
  }, []);

  useEffect(() => {
    axios({
      url: "/upcyclings/descending?page=1&size=4",
      method: "get",
    })
      .then((response) => {
        setData(response.data.data);
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
  }, [horwrapRef.current]);

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
        <div id={style.mainpage}>
          {open ? (
            <div className={style.modalOverlay}>
              <div
                className={`${style.modalContent} ${
                  !isUnmount ? "" : style.closeModal
                }`}
              >
                <div className={style.modalLogo}>
                  <img
                    src={process.env.PUBLIC_URL + "/image/logo1.png"}
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
                    <div className={style.sidelistText}>펀딩+</div>
                  </Link>
                  <Link to="/store" className={style.link}>
                    <div className={style.sidelistText}>스토어</div>
                  </Link>
                  <Link to="/about" className={style.link}>
                    <div className={style.sidelistText}>About</div>
                  </Link>
                  <p
                    style={{
                      fontSize: "35px",
                      color: "#353535",
                      fontWeight: "bold",
                      marginTop: "170px",
                    }}
                  >
                    IEUN CO.
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
            {localStorage.getItem("token") ? (
              <ProfileDropdown />
            ) : (
              <button className={style.button}>
                <Link to="/login">
                  <AccountCircleIcon
                    className={style.button}
                    sx={{ fontSize: 35, color: "#6E934D" }}
                  />
                </Link>
              </button>
            )}
          </div>
          <div id={style.main}>
            <div className="horwrap" ref={horwrapRef}>
              <div className={style.horwrap}>
                <div className={style.hor}>
                  <Link to="/about">
                    <img
                      src={process.env.PUBLIC_URL + "/image/test4.jpg"}
                      alt="test"
                      className={style.mainImg}
                    />
                  </Link>
                </div>

                <div className={style.hor}>
                  <Link to="/funding">
                    <img
                      src={process.env.PUBLIC_URL + "/image/test6.jpg"}
                      alt="test"
                      className={style.mainImg}
                    />
                  </Link>
                </div>

                <div className={style.hor}>
                  <Link to="/store">
                    <img
                      src={process.env.PUBLIC_URL + "/image/test7.jpg"}
                      alt="test"
                      className={style.mainImg}
                    />
                  </Link>
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
                      src={process.env.PUBLIC_URL + "/image/test13.png"}
                      alt="test"
                      className={style.contentsImg}
                    />
                    <p className={style.contentsText}>
                      이은이 알려주는 친환경 잡지
                    </p>
                    <p className={style.contentsSub}>
                      제로 웨이스트, 리업사이클 등 8개의 키워드 제품을 판매하는
                      eco fresh를 소개할게요!
                    </p>

                    <p className={style.contentsFooter}>@ecomagazine</p>
                  </div>
                </a>
                <a
                  href="https://www.eyesmag.com/search?s=%EC%97%85%EC%82%AC%EC%9D%B4%ED%81%B4%EB%A7%81"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={style.contentsbox}>
                    <img
                      src={process.env.PUBLIC_URL + "/image/test14.png"}
                      alt="test"
                      className={style.contentsImg}
                    />
                    <p className={style.contentsText}>
                      친환경을 주목하는 아이즈매거진
                    </p>
                    <p className={style.contentsSub}>
                      클린뷰티부터 스투시까지, 이은이 소개하는 업사이클링의 최신
                      트렌트를 읽어보세요 🙂
                    </p>

                    <p className={style.contentsFooter}>@eyesmagazine</p>
                  </div>
                </a>
                <a
                  href="https://www.beautifulstore.org/upcycling"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={style.contentsbox}>
                    <img
                      src={process.env.PUBLIC_URL + "/image/test15.jpg"}
                      alt="test"
                      className={style.contentsImg}
                    />

                    <p className={style.contentsText}>
                      '에코라이프스타일'의 확산
                    </p>
                    <p className={style.contentsSub}>
                      아름다운 가게에서 소개하는 '에코파티메아리'를 확인해보세요
                      😎
                    </p>

                    <p className={style.contentsFooter}>@beautifulstore</p>
                  </div>
                </a>
                <a
                  href="https://metropolismag.com/sustainability/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={style.contentsbox}>
                    <img
                      src={process.env.PUBLIC_URL + "/image/test16.jpg"}
                      alt="test"
                      className={style.contentsImg}
                    />
                    <p className={style.contentsText}>
                      지속가능한 업사이클링 인테리어
                    </p>
                    <p className={style.contentsSub}>
                      전세계가 열광하는 지속가능한 인테리어의 세계로 여러분을
                      초대합니다 📢
                    </p>

                    <p className={style.contentsFooter}>@metropolis</p>
                  </div>
                </a>
              </div>
              <div id={style.h1boxFunding}>
                <h1 className={style.h1}>Funding</h1>
              </div>
              {data.length > 3 ? (
                <div className={style.contentslist}>
                  <Link
                    to={`/fundingdetail/${data[0].upcyclingId}`}
                    className={style.link}
                  >
                    <div className={style.contentsbox}>
                      <img
                        src={data[0].thumbNailImage}
                        alt="img"
                        className={style.contentsImg}
                      />
                      <div className={style.contentsText}>{data[0].title}</div>
                      <div className={style.contentsSub}>{data[0].content}</div>
                      <div
                        className={style.contentsFooter}
                      >{`@${data[0].displayName}`}</div>
                    </div>
                  </Link>

                  <Link
                    to={`/fundingdetail/${data[1].upcyclingId}`}
                    className={style.link}
                  >
                    <div className={style.contentsbox}>
                      <img
                        src={data[1].thumbNailImage}
                        alt="img"
                        className={style.contentsImg}
                      />
                      <div className={style.contentsText}>{data[1].title}</div>
                      <div className={style.contentsSub}>{data[1].content}</div>
                      <div
                        className={style.contentsFooter}
                      >{`@${data[1].displayName}`}</div>
                    </div>
                  </Link>

                  <Link
                    to={`/fundingdetail/${data[2].upcyclingId}`}
                    className={style.link}
                  >
                    <div className={style.contentsbox}>
                      <img
                        src={data[2].thumbNailImage}
                        alt="img"
                        className={style.contentsImg}
                      />
                      <div className={style.contentsText}>{data[2].title}</div>
                      <div className={style.contentsSub}>{data[2].content}</div>
                      <div
                        className={style.contentsFooter}
                      >{`@${data[2].displayName}`}</div>
                    </div>
                  </Link>

                  <Link
                    to={`/fundingdetail/${data[3].upcyclingId}`}
                    className={style.link}
                  >
                    <div className={style.contentsbox}>
                      <img
                        src={data[3].thumbNailImage}
                        alt="img"
                        className={style.contentsImg}
                      />
                      <div className={style.contentsText}>{data[3].title}</div>
                      <div className={style.contentsSub}>{data[3].content}</div>
                      <div
                        className={style.contentsFooter}
                      >{`@${data[3].displayName}`}</div>
                    </div>
                  </Link>
                </div>
              ) : null}
            </div>
            <div id={style.footer}>
              <img
                src={process.env.PUBLIC_URL + "/image/test8.jpg"}
                alt="test"
                className={style.mainImg}
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

const ProfileDropdown = () => {
  const [menuView, setMenuView] = useState(false);
  const Dropdown = () => {
    setMenuView(!menuView);
  };

  return (
    <div className={style.ProfileWrapper}>
      <AccountCircleIcon
        onClick={Dropdown}
        sx={{ width: "35px", height: "100%", color: "#6E934D" }}
      />
      <div className={style.Dropdowncontainer}>
        {menuView && <DropdownBox />}
      </div>
    </div>
  );
};

const DropdownBox = () => {
  const handleLogout = () => {
    axios
      .delete("/auth/signout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 저장한 토큰 값을 사용하여 헤더 설정
        },
      })
      .then((res) => {
        localStorage.removeItem("token");
        window.location.reload();
      })
      .catch((err) => {
        if (err.response && err.response.status === 500) {
          // 토큰 만료로 인한 500 Unauthorized 에러일 경우에도 로그아웃 실행
          localStorage.removeItem("token");
          window.location.reload();
        } else {
          console.log("Error occurred during logout:", err); // 다른 에러는 그대로 콘솔에 표시
        }
      });
  };

  return (
    <div>
      <div className={style.MenuItem}>
        <Link to="/mypage" className={style.MenuLink}>
          My page
        </Link>
      </div>
      <div onClick={handleLogout} className={style.MenuItem}>
        <Link to="/" className={style.MenuLink}>
          Logout
        </Link>
      </div>
    </div>
  );
};
