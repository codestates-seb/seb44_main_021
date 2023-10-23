import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../api/logout";
import * as S from "./ProfileDropdown.styled";

const ProfileDropdown = () => {
  const [menuView, setMenuView] = useState(false);
  const navigate = useNavigate();
  const loginStatus = JSON.parse(localStorage.getItem("login"));

  const openDropdown = () => {
    if (loginStatus) {
      setMenuView(!menuView);
    } else {
      navigate("/login");
    }
  };
  return (
    <S.DropdownContainer>
      <AccountCircleIcon
        sx={{ fontSize: 35, fill: "#6e934d" }}
        onClick={openDropdown}
      />
      <S.DropdownWrapper>
        {menuView && (
          <ul>
            <S.MenuItem onClick={() => navigate("/mypage/funding")}>
              My page
            </S.MenuItem>
            <S.MenuItem onClick={logout}>Logout</S.MenuItem>
          </ul>
        )}
      </S.DropdownWrapper>
    </S.DropdownContainer>
  );
};

export default ProfileDropdown;
