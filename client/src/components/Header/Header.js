import React from 'react';
import style from "./Header.module.css"
import Logo from '../Logo/Logo';
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    const [isLogin] = useState(true);

    return (
        <div id={style.HeaderContainer}>
            <div id={style.HeaderWrapper}>
                <div id={style.LogoWrapper}>
                    <Logo />
                </div>
                <div className={style.LinkWrapper}>
                    <Link to='/fundinglist' className={style.LinkStyle}>
                        <div className={style.LinkContent}>펀딩+</div>
                    </Link>
                </div>
                <div className={style.LinkWrapper}>
                    <Link to='/storelist' className={style.LinkStyle}>
                        <div className={style.LinkContent}>스토어</div>
                    </Link>
                </div>
                <div id={style.SearchWrapper}>
                    {
                        (window.location.pathname === "/fundinglist"
                        ||window.location.pathname === "/storelist")
                        &&(
                        <div id={style.SeachContent}>
                            <SearchIcon
                                sx={{ width: "30px", height: "100%", color:"rgb(160,161,175)"}}
                            />
                            <input
                                id={style.SearchInput}
                                placeholder="검색어를 입력하세요."
                                type="text"
                            />
                        </div>
                        )
                    }
                </div>
                    {isLogin ? <ProfileDropdown/>:<ProfileLogin/>}

            </div>
        </div>
    );
};

export default Header;

const ProfileDropdown = () => {
    const [menuView, setMenuView] = useState(false); 
    const Dropdown = () => {
        setMenuView(!menuView);
    };

    return (
        <div className={style.ProfileWrapper}>
            <AccountCircleIcon 
                onClick = {Dropdown}
                sx={{ width: "35px", height: "100%", color:"#6E934D"  }}
            />
            <div className={style.Dropdowncontainer}>
                {menuView && <DropdownBox />}
            </div>
        </div>
    );
};

const ProfileLogin = () => {
    return(
        <div className={style.ProfileWrapper}>
            <Link to='/login'>
                <AccountCircleIcon 
                    sx={{ width: "35px", height: "100%", color:"#6E934D"  }}
                />
            </Link>
        </div>
    );
};

const DropdownBox = () => {
    const handleLogout = () => {

    }

    return(
        <div>
            <div className={style.MenuItem} >
                <Link to='/mypage' className={style.MenuLink} >
                    My page
                </Link>
            </div>
            <div onClick={handleLogout} className={style.MenuItem}>
                <Link to='/' className={style.MenuLink}>
                    Logout
                </Link>
            </div>
        </div>
    );
};