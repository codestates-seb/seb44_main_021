import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";
import ProfileDropdown from "./dropdown/ProfileDropdown";
import * as S from "./Header.styled";
import SearchBar from "./SearchBar/SearchBar";

const Header = () => {
  let { pathname } = useLocation();
  return (
    <S.HeaderContainer>
      <S.HeaderWrapper>
        <S.LeftArea>
          <S.MenuBtn />
          <Logo />
          <ul>
            <Link to="/funding">
              <li>펀딩+</li>
            </Link>
            <Link to="/store">
              <li>스토어</li>
            </Link>
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
