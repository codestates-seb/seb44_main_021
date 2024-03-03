import { useNavigate } from "react-router-dom";
import Logo from "../common/Logo";
import ProfileDropdown from "./dropdown/ProfileDropdown";
import * as S from "./Header.styled";
import SearchBar from "./SearchBar/SearchBar";
import SideBarModal from "./SideBarModal";
import { memo } from "react";

const Header = ({ pathname }) => {
  const navigate = useNavigate();
  const handleFundingClick = () => navigate("/funding");
  const handleStoreClick = () => navigate("/store");
  return (
    <S.HeaderContainer>
      <S.HeaderWrapper>
        <S.LeftArea>
          {/* <SideBarModal /> */}
          {window.innerWidth <= 768 && <SideBarModal />}
          <Logo />
          <ul>
            <li onClick={handleFundingClick}>펀딩+</li>
            <li onClick={handleStoreClick}>스토어</li>
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

export default memo(Header);
