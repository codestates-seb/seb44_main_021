import React from "react";
import style from "./Header.module.css";
import Logo from "../Logo/Logo";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../../contexts/UserDataContext";

const Header = () => {
  const { setUserData } = useContext(UserDataContext);
  const [isLogin, setIsLogin] = useState(false);

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
      console.log(dec);

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
                }}
              />
              <input
                id={style.SearchInput}
                placeholder="검색어를 입력하세요."
                type="text"
              />
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
    localStorage.removeItem("token");
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
