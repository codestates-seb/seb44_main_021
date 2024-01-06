import React, { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useGetMemberId } from "../../hooks/useGetMemberId";
import { axiosInstance } from "../../api/axiosInstance";
import Banner from "../../components/SubPage/SideBar";
import Navigation from "../../components/SubPage/Navigation";
import List from "../../components/SubPage/Funding/List";

const FundingPage = () => {
  const { getMemberId } = useGetMemberId();
  const userData = useSelector((state) => state.userData);

  const [sort, setSort] = useState("descending");
  const [kategorie, setKategorie] = useState(0);
  const [fundingList, setFundingList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoding, setIsLoding] = useState(false);
  const [role, setrole] = useState("");

  const searchParam = useSelector((state) => state.search.searchWord);

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

  return (
    <div>
      {/* <Header url="funding" setSearchParam={setSearchParam} /> */}
      <Container>
        <Navigation
          sort={sort}
          setSort={setSort}
          role={role}
          param="/funding"
          // link="/fundingcreate"
        />
        <ContainerBottom>
          <Banner
            kategorie={kategorie}
            setKategorie={setKategorie}
            menu={["All", "천", "목재", "플라스틱", "철제", "유리", "기타"]}
          />
          <Funding>
            {isLoding
              ? fundingList.map((obj, index) => <List key={index} {...obj} />)
              : null}
          </Funding>
        </ContainerBottom>
      </Container>
    </div>
  );
};

export default FundingPage;

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

const Funding = styled.div`
  float: right;
  display: grid;
  width: 80%;
  grid-template-columns: 0fr 1fr 1fr 1fr;
`;
