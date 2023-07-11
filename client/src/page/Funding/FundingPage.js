import React, { useState } from "react";
import Lenis from "@studio-freight/lenis";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Header from "../../components/Header/Header";
import style from "./FundingPage.module.css";

const List = () => {
  return (
    <div id={style.list}>
      <img
        src={process.env.PUBLIC_URL + "/image/test1.jpg"}
        alt="로고"
        style={{
          width: `250px`,
          height: `60%`,
        }}
      />
      <div>
        <div>
          <div>펀딩명</div>
          <div>펀딩 자재</div>
        </div>
        <div>00%</div>
      </div>
    </div>
  );
};

const FundingPage = () => {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  const arr = new Array(27).fill(0);

  return (
    <div>
      <Header />
      <div id={style.containerh}>
        <div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">정렬</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>최신순</MenuItem>
                <MenuItem value={20}>오래된 순</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <button>펀딩 제품 등록</button>
        </div>
      </div>
      <div id={style.container}>
        <div id={style.aside}>
          <div id={style.kategorie}>카테고리</div>
          <button className={style.button}>펀딩 전체보기</button>
          <button className={style.button}>천</button>
          <button className={style.button}>목재</button>
          <button className={style.button}>플라스틱</button>
          <button className={style.button}>철제</button>
          <button className={style.button}>유리</button>
          <button className={style.button}>기타</button>
        </div>
        <div id={style.funding}>{arr.map((obj) => List())}</div>
      </div>
    </div>
  );
};

export default FundingPage;
