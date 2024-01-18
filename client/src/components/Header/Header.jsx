import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../common/Logo";
import ProfileDropdown from "./dropdown/ProfileDropdown";
import * as S from "./Header.styled";
import SearchBar from "./SearchBar/SearchBar";
import SideBarModal from "../common/SideBarModal";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <S.HeaderContainer>
      <S.HeaderWrapper>
        <S.LeftArea>
          {/* <SideBarModal /> */}
          {window.innerWidth <= 768 && <SideBarModal />}
          <Logo />
          <ul>
            <li onClick={() => navigate("/funding")}>펀딩+</li>
            <li onClick={() => navigate("/store")}>스토어</li>
          </ul>
        </S.LeftArea>

        <S.RightArea>
          {(pathname === "/funding" || pathname === "/store") && (
            <SearchBar pathname={pathname} />
          )}
          <ProfileDropdown />
        </S.RightArea>
      </S.HeaderWrapper>
    </S.HeaderContainer>
  );
};

export default Header;
