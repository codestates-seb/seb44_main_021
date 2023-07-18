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

  useEffect(() => {
    axios({
      url: "/upcyclings/descending?page=1&size=4",
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
  }, [horwrapRef.current]);

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
                    src={process.env.PUBLIC_URL + "/image/logo4.png"}
                    alt="로고"
                    style={{
                      width: "60px",
                      height: "60px",
                    }}
                  />
                  <button onClick={closeModal} id={style.closebutton}>
                    <CloseIcon sx={{ fontSize: 30, color: "#FFFFFF" }} />
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
                  <AccountBoxIcon
                    className={style.button}
                    sx={{ fontSize: 40, color: "#6E934D" }}
                  />
                </Link>
              </button>
            )}
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
                  <Link to="/funding">
                    <img
                      src={process.env.PUBLIC_URL + "/image/test6.jpg"}
                      alt="test"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Link>
                </div>

                <div className={style.hor}>
                  <Link to="/store">
                    <img
                      src={process.env.PUBLIC_URL + "/image/test7.jpg"}
                      alt="test"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div id={style.contents}>
              <h1 className={style.h1}>Magazine</h1>
              <div className={style.contentslist}>
                <a
                  href="https://www.insehub.or.kr/bbs/board.php?bo_table=bbs_030403&wr_id=88"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={style.contentsbox}>
                    <img
                      src={process.env.PUBLIC_URL + "/image/news1.jpg"}
                      alt="test"
                      style={{
                        width: "100%",
                        height: "80%",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                      }}
                    />
                    <hr
                      style={{
                        border: "none",
                        backgroundColor: "#4d4d4d",
                        height: "1px",
                        marginTop: "5px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        marginBottom: "5px",
                      }}
                    >
                      Connect Magazine
                      <NorthEastSharpIcon sx={{ fontSize: 15 }} />
                    </p>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: "8px",
                      }}
                    >
                      친환경에 앞장서는 솟솟리버스
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      쓰레기의 재탄생! 업사이클링 제품이 뭐야?
                    </p>
                  </div>
                </a>
                <a
                  href="https://www.tinnews.co.kr/23616"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={style.contentsbox}>
                    <img
                      src={process.env.PUBLIC_URL + "/image/news2.png"}
                      alt="test"
                      style={{
                        width: "100%",
                        height: "80%",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                      }}
                    />
                    <hr
                      style={{
                        border: "none",
                        backgroundColor: "#4d4d4d",
                        height: "1px",
                        marginTop: "5px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        marginBottom: "5px",
                      }}
                    >
                      Connect Magazine
                      <NorthEastSharpIcon sx={{ fontSize: 15 }} />
                    </p>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: "8px",
                      }}
                    >
                      친환경에 앞장서는 솟솟리버스
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      업사이클링의 완성은 자원 순환
                    </p>
                  </div>
                </a>
                <a
                  href="https://dream.kotra.or.kr/kotranews/cms/news/actionKotraBoardDetail.do?SITE_NO=3&MENU_ID=180&CONTENTS_NO=1&bbsGbn=243&bbsSn=243&pNttSn=194909"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className={style.contentsbox}>
                    <img
                      src={process.env.PUBLIC_URL + "/image/news3.jpg"}
                      alt="test"
                      style={{
                        width: "100%",
                        height: "80%",
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                      }}
                    />

                    <hr
                      style={{
                        border: "none",
                        backgroundColor: "#4d4d4d",
                        height: "1px",
                        marginTop: "5px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        marginBottom: "5px",
                      }}
                    >
                      Connect Magazine
                      <NorthEastSharpIcon sx={{ fontSize: 15 }} />
                    </p>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: "8px",
                      }}
                    >
                      친환경에 앞장서는 솟솟리버스
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      미국 시장이 열광하는 '업사이클링' 트렌드
                    </p>
                  </div>
                </a>
                <a
                  href="https://news.sbs.co.kr/news/endPage.do?news_id=N1002461263&plink=COPYPASTE&cooper=SBSNEWSEND"
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
                    <hr
                      style={{
                        border: "none",
                        backgroundColor: "#4d4d4d",
                        height: "1px",
                        marginTop: "5px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        marginBottom: "5px",
                      }}
                    >
                      Connect Magazine
                      <NorthEastSharpIcon sx={{ fontSize: 15 }} />
                    </p>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginBottom: "8px",
                      }}
                    >
                      친환경에 앞장서는 솟솟리버스
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      "폐품이 아니라 명품"…'업사이클링'의 진화
                    </p>
                  </div>
                </a>
              </div>
              <h1 className={style.h1}>Funding</h1>
              {data.length > 0 ? (
                <div className={style.contentslist}>
                  <Link
                    to={`/fundingdetail/${data[0].upcyclingId}`}
                    className={style.link}
                  >
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

                  <Link
                    to={`/fundingdetail/${data[1].upcyclingId}`}
                    className={style.link}
                  >
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

                  <Link
                    to={`/fundingdetail/${data[2].upcyclingId}`}
                    className={style.link}
                  >
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

                  <Link
                    to={`/fundingdetail/${data[3].upcyclingId}`}
                    className={style.link}
                  >
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
    localStorage.removeItem("token");
    window.location.reload();
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
