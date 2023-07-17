import React from 'react';
import { Link } from "react-router-dom";
import style from "./Logo.module.css";

const logo = () => {
    return (
        <Link to="/">
            <img
            className={style.logo}
            src={`${process.env.PUBLIC_URL}/image/logo2.png`}
            alt="logo"
            ></img>
        </Link>
    );
};

export default logo;