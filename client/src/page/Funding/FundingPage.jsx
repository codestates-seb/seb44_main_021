import React, { useState, useEffect } from "react";
// import { UserDataContext } from "../../store/UserDataSlice";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Lenis from "@studio-freight/lenis";
import Header from "../../components/Header/Header";
import style from "./FundingPage.module.css";
import { useSelector } from "react-redux";
import { useGetMemberId } from "../../hooks/useGetMemberId";
import { axiosInstance } from "../../api/axiosInstance";

const List = (props) => {
  return (
    <div id={style.list} key={props.index}>
      <Link to={`/fundingdetail/${props.upcyclingId}`} className={style.link}>
        <img
          src={props.thumbNailImage}
          alt="로고"
          style={{
            width: "250px",
            height: "60%",
            borderRadius: "20px",
            objectFit: "cover",
          }}
        />
        <div id={style.listText}>
          <div id={style.title}>{props.title}</div>
          <div id={style.materiar}>
            <img
              id={style.materiaricon}
              src={`${process.env.PUBLIC_URL}/image/circle.png`}
              alt="원모양 아이콘"
            />
            {props.categoryName}
          </div>
        </div>
      </Link>
    </div>
  );
};

const FundingPage = () => {
  const { getMemberId } = useGetMemberId();
  const userData = useSelector((state) => state.userData);

  const [sort, setSort] = useState("descending");
  const [kategorie, setKategorie] = useState(0);
  const [fundingList, setFundingList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoding, setIsLoding] = useState(false);
  const [role, setrole] = useState("");

  const urlParams = new URL(window.location.href).searchParams;
  const serch = urlParams.get("serch");
  const [searchParam, setSearchParam] = useState(serch);

  useEffect(() => {
    getMemberId();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`/members/${userData.memberId}`)
      .then((res) => {
        setrole(res.data.data.memberRole);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userData.memberId, userData.memberRole]);

  useEffect(() => {
    if (searchParam) {
      axiosInstance({
        url: `/upcyclings/search?page=1&size=8&searchKeyword=${searchParam}`,
        method: "get",
      })
        .then((response) => {
          setFundingList(response.data.data);
          setIsLoding(true);
        })
        .catch((err) => console.log(err));
    } else {
      axiosInstance({
        url: "/upcyclings/descending?page=1&size=8",
        method: "get",
      })
        .then((response) => {
          setIsLoding(true);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    setIsLoding(false);
    setPage(1);
    if (searchParam) {
      if (kategorie === 0) {
        axiosInstance({
          url: `/upcyclings/search?page=1&size=8&sort=${sort}&searchKeyword=${searchParam}`,
          method: "get",
        })
          .then((response) => {
            setFundingList(response.data.data);
            setIsLoding(true);
          })
          .catch((err) => console.log(err));
      } else {
        axiosInstance({
          url: `/upcyclings/search?page=1&size=8&sort=${sort}&categoryId=${kategorie}&searchKeyword=${searchParam}`,
          method: "get",
        })
          .then((response) => {
            setFundingList(response.data.data);
            setIsLoding(true);
          })
          .catch((err) => console.log(err));
      }
    } else {
      if (kategorie === 0) {
        axiosInstance({
          url: `/upcyclings/${sort}?page=1&size=8`,
          method: "get",
        })
          .then((response) => {
            setFundingList(response.data.data);
            setIsLoding(true);
          })
          .catch((err) => console.log(err));
      } else {
        axiosInstance({
          url: `/upcyclings/${sort}/categories/${kategorie}?page=1&size=8`,
          method: "get",
        })
          .then((response) => {
            setFundingList(response.data.data);
            setIsLoding(true);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [sort, kategorie, searchParam]);

  const handleScroll = () => {
    // 스크롤 이벤트 핸들러
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollHeight - scrollTop === clientHeight) {
      // 스크롤이 하단에 도달했을 때 추가 데이터 로드
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      if (searchParam) {
        if (kategorie === 0) {
          axiosInstance({
            url: `/upcyclings/search?page=${page}&size=8&sort=${sort}&searchKeyword=${searchParam}`,
            method: "get",
          })
            .then((response) => {
              setFundingList((prev) => [...prev, ...response.data.data]);
            })
            .catch((err) => console.log(err));
        } else {
          axiosInstance({
            url: `/upcyclings/search?page=${page}&size=8&sort=${sort}&categoryId=${kategorie}&searchKeyword=${searchParam}`,
            method: "get",
          })
            .then((response) => {
              setFundingList((prev) => [...prev, ...response.data.data]);
            })
            .catch((err) => console.log(err));
        }
      } else {
        if (kategorie === 0) {
          axiosInstance({
            url: `/upcyclings/${sort}?page=${page}&size=8`,
            method: "get",
          })
            .then((response) => {
              setFundingList((prev) => [...prev, ...response.data.data]);
            })
            .catch((err) => console.log(err));
        } else {
          axiosInstance({
            url: `/upcyclings/${sort}/categories/${kategorie}?page=${page}&size=8`,
            method: "get",
          })
            .then((response) => {
              setFundingList((prev) => [...prev, ...response.data.data]);
            })
            .catch((err) => console.log(err));
        }
      }
    }
  }, [page]);

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  const ViewAll = () => {
    if (kategorie !== 0) {
      setKategorie(0);
      window.scrollTo(0, 0);
    }
  };

  const ViewCloth = () => {
    if (kategorie !== 1) {
      setKategorie(1);
      window.scrollTo(0, 0);
    }
  };

  const ViewWood = () => {
    if (kategorie !== 2) {
      setKategorie(2);
      window.scrollTo(0, 0);
    }
  };

  const ViewPlastic = () => {
    if (kategorie !== 3) {
      setKategorie(3);
      window.scrollTo(0, 0);
    }
  };

  const ViewIron = () => {
    if (kategorie !== 4) {
      setKategorie(4);
      window.scrollTo(0, 0);
    }
  };

  const ViewGlass = () => {
    if (kategorie !== 5) {
      setKategorie(5);
      window.scrollTo(0, 0);
    }
  };

  const ViewEtc = () => {
    if (kategorie !== 6) {
      setKategorie(6);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div>
      <Header url="funding" setSearchParam={setSearchParam} />
      <div id={style.container}>
        <div id={style.containerup}>
          <div id={style.blank}></div>
          <div id={style.sort}>
            <div id={style.sortcontainer}>
              <div id={style.sortblank}></div>
              <div id={style.sortbox}>
                <button
                  id={style.sorttext1}
                  className={`${
                    sort === "descending" ? style.selectsorttext : ""
                  }`}
                  onClick={handleChange}
                  value={"descending"}
                >
                  최신순
                </button>
                <div id={style.sorticon}>|</div>
                <button
                  id={style.sorttext2}
                  className={`${
                    sort === "ascending" ? style.selectsorttext : ""
                  }`}
                  onClick={handleChange}
                  value={"ascending"}
                >
                  오래된 순
                </button>
              </div>
            </div>
            {role === "MEMBER_UPCYCLER" ? (
              <Link to="/fundingcreate">
                <button id={style.fundingButton}>펀딩 제품 등록</button>
              </Link>
            ) : null}
          </div>
        </div>
        <div id={style.containerdown}>
          <div id={style.aside}>
            <div id={style.kategorie}>카테고리</div>
            <button
              className={`${style.button} 
              ${kategorie === 0 ? style.selectedButton : ""}`}
              onClick={ViewAll}
            >
              All
            </button>
            <button
              className={`${style.button} 
              ${kategorie === 1 ? style.selectedButton : ""}`}
              onClick={ViewCloth}
            >
              천
            </button>
            <button
              className={`${style.button} 
              ${kategorie === 2 ? style.selectedButton : ""}`}
              onClick={ViewWood}
            >
              목재
            </button>
            <button
              className={`${style.button} 
              ${kategorie === 3 ? style.selectedButton : ""}`}
              onClick={ViewPlastic}
            >
              플라스틱
            </button>
            <button
              className={`${style.button} 
              ${kategorie === 4 ? style.selectedButton : ""}`}
              onClick={ViewIron}
            >
              철제
            </button>
            <button
              className={`${style.button} 
              ${kategorie === 5 ? style.selectedButton : ""}`}
              onClick={ViewGlass}
            >
              유리
            </button>
            <button
              className={`${style.button} 
              ${kategorie === 6 ? style.selectedButton : ""}`}
              onClick={ViewEtc}
            >
              기타
            </button>
          </div>
          <div id={style.funding}>
            {isLoding
              ? fundingList.map((obj, index) => List(obj, index))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingPage;
