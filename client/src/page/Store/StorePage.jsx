import React, { useState, useEffect, useContext } from "react";
import { UserDataContext } from "../../contexts/UserDataContext";
import { Link } from "react-router-dom";
import axios from "axios";
import Lenis from "@studio-freight/lenis";
import Header from "../../components/Header/Header";
import style from "./StorePage.module.css";

const List = (props) => {

  const formatPriceWithCommas = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div id={style.list} key={props.sellId}>
      <Link to={`/storedetail/${props.sellId}`} className={style.link}>
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
          <div id={style.pricebox}>
            <div id={style.price}>{formatPriceWithCommas(props.price)}</div>
            <div id={style.pricetext}>원</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const StorePage = () => {
  const [sort, setSort] = useState("descending");
  const [kategorie, setKategorie] = useState(0);
  const [stoerList, setStoreList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    axios({
      url: "/sells/descending?page=1&size=8",
      method: "get",
    })
      .then((response) => {
        setStoreList(response.data.data);
        console.log(response.data.data);
        setIsLoding(true);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setIsLoding(false);
    setPage(1);
    if (kategorie === 0) {
      axios({
        url: `/sells/${sort}?page=1&size=8`,
        method: "get",
      })
        .then((response) => {
          setStoreList(response.data.data);
          setIsLoding(true);
        })
        .catch((err) => console.log(err));
    } else {
      axios({
        url: `/sells/${sort}/sellcategories/${kategorie}?page=1&size=8`,
        method: "get",
      })
        .then((response) => {
          setStoreList(response.data.data);
          setIsLoding(true);
        })
        .catch((err) => console.log(err));
    }
  }, [sort, kategorie]);

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
      if (kategorie === 0) {
        axios({
          url: `/sells/${sort}?page=${page}&size=8`,
          method: "get",
        })
          .then((response) => {
            setStoreList((prev) => [...prev, ...response.data.data]);
          })
          .catch((err) => console.log(err));
      } else {
        axios({
          url: `/sells/${sort}/categories/${kategorie}?page=${page}&size=8`,
          method: "get",
        })
          .then((response) => {
            setStoreList((prev) => [...prev, ...response.data.data]);
          })
          .catch((err) => console.log(err));
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

  return (
    <div>
      <Header />
      <div id={style.container}>
        <div id={style.containerup}>
          <div id={style.blank}></div>
          <div id={style.sort}>
            <div id={style.sortcontainer}>
              <div id={style.sortblank}></div>
              <div id={style.sortbox}>
                <button id={style.sorttext1} className={`${sort === "descending" ? style.selectsorttext : ""}`} onClick={handleChange} value={"descending"}>최신순</button>
                <div id={style.sorticon}>|</div>
                <button id={style.sorttext2} className={`${sort === "ascending" ? style.selectsorttext : ""}`} onClick={handleChange} value={"ascending"}>오래된 순</button>
              </div>
            </div>
            {localStorage.getItem("token") ? (
              <Link to="/storecreate">
                <button id={style.fundingButton}>스토어 제품 등록</button>
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
              의류
            </button>
            <button
              className={`${style.button} 
              ${kategorie === 2 ? style.selectedButton : ""}`}
              onClick={ViewWood}
            >
              가구
            </button>
            <button
              className={`${style.button} 
              ${kategorie === 3 ? style.selectedButton : ""}`}
              onClick={ViewPlastic}
            >
              인테리어
            </button>
            <button
              className={`${style.button} 
              ${kategorie === 4 ? style.selectedButton : ""}`}
              onClick={ViewIron}
            >
              소품
            </button>
            <button
              className={`${style.button} 
              ${kategorie === 5 ? style.selectedButton : ""}`}
              onClick={ViewGlass}
            >
              기타
            </button>
          </div>
          <div id={style.funding}>
            {isLoding ? stoerList.map((obj, index) => List(obj, index)) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
