import React, { useState, useEffect, useContext } from "react";
import style from "./Header.module.css";
import Logo from "../Logo/Logo";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { UserDataContext } from "../../contexts/UserDataContext";
import axios from "axios";

const Header = ({ url, setSearchParam }) => {
  const { setUserData } = useContext(UserDataContext);

  const [isLogin, setIsLogin] = useState(false);

  const urlParams = new URL(window.location.href).searchParams;
  const serch = urlParams.get("serch");
  const [searchTerm, setSearchTerm] = useState(serch); // 검색어 상태 추가

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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
      const token = localStorage.getItem("token");
      const payload = token.substring(
        token.indexOf(".") + 1,
        token.lastIndexOf(".")
      );
      const decodedPayload = decodeURIComponent(
        atob(payload)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      const dec = JSON.parse(decodedPayload);

      setUserData((prevUserData) => ({
        ...prevUserData,
        displayName: dec.displayName,
        email: dec.username,
        memberId: dec.memberId,
      }));
    }
  }, []);
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
        {isLogin ? (
          <ProfileDropdown setIsLogin={setIsLogin} />
        ) : (
          <ProfileLogin />
        )}
      </div>
    </div>
  );
};

export default Header;

const ProfileDropdown = ({ setIsLogin }) => {
  const [menuView, setMenuView] = useState(false);
  const Dropdown = () => {
    setMenuView(!menuView);
  };

  return (
    <div className={style.ProfileWrapper}>
      <AccountCircleIcon
        onClick={Dropdown}
        sx={{ fontSize: 35, color: "#6E934D" }}
      />
      <div className={style.Dropdowncontainer}>
        {menuView && <DropdownBox setIsLogin={setIsLogin} />}
      </div>
    </div>
  );
};

const ProfileLogin = () => {
  return (
    <div className={style.ProfileWrapper}>
      <Link to="/login">
        <AccountCircleIcon sx={{ fontSize: 35, color: "#6E934D" }} />
      </Link>
    </div>
  );
};

const DropdownBox = ({ setIsLogin }) => {
  const handleLogout = () => {
    setIsLogin(false);

    axios
      .delete("/auth/signout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 저장한 토큰 값을 사용하여 헤더 설정
        },
      })
      .then((res) => {
        localStorage.removeItem("token"); // 요청이 성공하면 로컬 스토리지에서 토큰 삭제
        window.location.reload("/");
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
