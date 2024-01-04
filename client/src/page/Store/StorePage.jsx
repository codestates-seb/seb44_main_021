import React, { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../api/axiosInstance";
import Banner from "../../components/SubPage/SideBar";
import Navigation from "../../components/SubPage/Navigation";
import Item from "../../components/SubPage/Store/Item";
import styled from "styled-components";

const StorePage = () => {
  const userData = useSelector((state) => state.userData);
  const [sort, setSort] = useState("descending");
  const [kategorie, setKategorie] = useState(0);
  const [stoerList, setStoreList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoding, setIsLoding] = useState(false);
  const [role, setrole] = useState("");

  const urlParams = new URL(window.location.href).searchParams;
  const serch = urlParams.get("serch");
  const [searchParam, setSearchParam] = useState(serch);

  useEffect(() => {
    if (searchParam) {
      axiosInstance({
        url: `/sells/search?page=1&size=8&searchKeyword=${searchParam}`,
        method: "get",
      })
        .then((response) => {
          setStoreList(response.data.data);
          setIsLoding(true);
        })
        .catch((err) => console.log(err));
    } else {
      axiosInstance({
        url: "/sells/descending?page=1&size=8",
        method: "get",
      })
        .then((response) => {
          setStoreList(response.data.data);
          setIsLoding(true);
        })
        .catch((err) => console.log(err));
    }

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
    setIsLoding(false);
    setPage(1);
    if (searchParam) {
      if (kategorie === 0) {
        axiosInstance({
          url: `/sells/search?page=1&size=8&sort=${sort}&searchKeyword=${searchParam}`,
          method: "get",
        })
          .then((response) => {
            setStoreList(response.data.data);
            setIsLoding(true);
          })
          .catch((err) => console.log(err));
      } else {
        axiosInstance({
          url: `/sells/search?page=1&size=8&sort=${sort}&sellCategoryId=${kategorie}&searchKeyword=${searchParam}`,
          method: "get",
        })
          .then((response) => {
            setStoreList(response.data.data);
            setIsLoding(true);
          })
          .catch((err) => console.log(err));
      }
    } else {
      if (kategorie === 0) {
        axiosInstance({
          url: `/sells/${sort}?page=1&size=8`,
          method: "get",
        })
          .then((response) => {
            setStoreList(response.data.data);
            setIsLoding(true);
          })
          .catch((err) => console.log(err));
      } else {
        axiosInstance({
          url: `/sells/${sort}/sellcategories/${kategorie}?page=1&size=8`,
          method: "get",
        })
          .then((response) => {
            setStoreList(response.data.data);
            setIsLoding(true);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [sort, kategorie, searchParam]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollHeight - scrollTop === clientHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      if (searchParam) {
        if (kategorie === 0) {
          axiosInstance({
            url: `/sells/search?page=${page}&size=8&sort=${sort}&searchKeyword=${searchParam}`,
            method: "get",
          })
            .then((response) => {
              setStoreList((prev) => [...prev, ...response.data.data]);
            })
            .catch((err) => console.log(err));
        } else {
          axiosInstance({
            url: `/sells/search?page=${page}&size=8&sort=${sort}&sellCategoryId=${kategorie}&searchKeyword=${searchParam}`,
            method: "get",
          })
            .then((response) => {
              setStoreList((prev) => [...prev, ...response.data.data]);
            })
            .catch((err) => console.log(err));
        }
      } else {
        if (kategorie === 0) {
          axiosInstance({
            url: `/sells/${sort}?page=${page}&size=8`,
            method: "get",
          })
            .then((response) => {
              setStoreList((prev) => [...prev, ...response.data.data]);
            })
            .catch((err) => console.log(err));
        } else {
          axiosInstance({
            url: `/sells/${sort}/sellcategories/${kategorie}?page=${page}&size=8`,
            method: "get",
          })
            .then((response) => {
              setStoreList((prev) => [...prev, ...response.data.data]);
            })
            .catch((err) => console.log(err));
        }
      }
    }
  }, [page]);

  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return (
    <div>
      <Header url="store" setSearchParam={setSearchParam} />
      <Container>
        <Navigation
          sort={sort}
          setSort={setSort}
          role={role}
          link="/storecreate"
        />
        <ContainerBottom>
          <Banner
            kategorie={kategorie}
            setKategorie={setKategorie}
            menu={["All", "의류", "가구", "인테리어", "소품", "기타"]}
          />
          <SellItem>
            {isLoding
              ? stoerList.map((obj, index) => <Item key={index} {...obj} />)
              : null}
          </SellItem>
        </ContainerBottom>
      </Container>
    </div>
  );
};

export default StorePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContainerBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 70%;
`;

const SellItem = styled.div`
  float: right;
  display: grid;
  width: 80%;
  grid-template-columns: 0fr 1fr 1fr 1fr;
`;
