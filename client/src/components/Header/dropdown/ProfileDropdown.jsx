import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../api/logout";
import * as S from "./ProfileDropdown.styled";
import { ReactComponent as AccountIcon } from "../../../assets/icon/account_icon.svg";

const ProfileDropdown = () => {
  const [menuView, setMenuView] = useState(false);
  const navigate = useNavigate();
  const loginStatus = JSON.parse(localStorage.getItem("login"));
  const dropdownRef = useRef(null);

  const openDropdown = () => {
    if (loginStatus) {
      setMenuView(!menuView);
    } else {
      navigate("/login");
    }
  };

  const handleMyPageClick = () => {
    navigate("/mypage/funding");
    setMenuView(false);
  };

  const handleLogoutClick = () => {
    logout();
    setMenuView(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuView(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <S.DropdownContainer ref={dropdownRef}>
      <AccountIcon onClick={openDropdown} />
      <S.DropdownWrapper>
        {menuView && (
          <ul>
            <li onClick={handleMyPageClick}>My page</li>
            <li onClick={handleLogoutClick}>Logout</li>
          </ul>
        )}
      </S.DropdownWrapper>
    </S.DropdownContainer>
  );
};

export default ProfileDropdown;
