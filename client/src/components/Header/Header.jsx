import React, { useState, useEffect } from "react";
import style from "./Header.module.css";
import Logo from "../Logo/Logo";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import ProfileDropdown from "./dropdown/ProfileDropdown";

const Header = ({ url, setSearchParam }) => {
  const urlParams = new URL(window.location.href).searchParams;
  const serch = urlParams.get("serch");
  const [searchTerm, setSearchTerm] = useState(serch); // 검색어 상태 추가

  const loginStatus = JSON.parse(localStorage.getItem("login"));

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      setSearchParam(searchTerm);
      window.history.pushState("", null, `/${url}?serch=${searchTerm}`);
    }
  };

  const handleSearch = () => {
    // 검색 버튼 클릭 시 수행할 작업
    // 검색어가 비어있지 않은 경우에만 URL 파라미터를 추가하도록 설정
    if (searchTerm.trim() !== "") {
      setSearchParam(searchTerm);
      window.history.pushState("", null, `/${url}?serch=${searchTerm}`);
    }
  };

  const deleteSearch = () => {
    setSearchTerm("");
    setSearchParam("");
    window.history.pushState("", null, `/${url}`);
  };

  return (
    <div id={style.HeaderContainer}>
      <div id={style.HeaderWrapper}>
        <div id={style.LogoWrapper}>
          <Logo />
        </div>
        <div className={style.LinkWrapper}>
          <Link to="/funding" className={style.LinkStyle}>
            <div className={style.LinkContent}>펀딩+</div>
          </Link>
        </div>
        <div className={style.LinkWrapper}>
          <Link to="/store" className={style.LinkStyle}>
            <div className={style.LinkContent}>스토어</div>
          </Link>
        </div>
        <div id={style.SearchWrapper}>
          {(window.location.pathname === "/funding" ||
            window.location.pathname === "/store") && (
            <div id={style.SeachContent}>
              <SearchIcon
                sx={{
                  width: "30px",
                  height: "100%",
                  color: "rgb(160,161,175)",
                  cursor: "pointer",
                }}
                onClick={handleSearch}
              />
              <input
                id={style.SearchInput}
                placeholder="검색어를 입력하세요."
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
              />
              {searchTerm ? (
                <CloseIcon
                  sx={{
                    width: "30px",
                    height: "100%",
                    color: "rgb(160,161,175)",
                    cursor: "pointer",
                  }}
                  onClick={deleteSearch}
                ></CloseIcon>
              ) : null}
            </div>
          )}
        </div>
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Header;
