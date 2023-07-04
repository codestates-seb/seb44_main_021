import React from "react";
import style from "./MainPage.module.css";

const MainPage = () => {
  return (
    <div>
      <div id={style.header}>
        <button>사이드바 햄버거</button>
        <div>로고</div>
        <button>로그인 버튼</button>
      </div>
      <div>컨텐츠</div>
    </div>
  );
};

export default MainPage;
