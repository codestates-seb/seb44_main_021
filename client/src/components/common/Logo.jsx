import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Logo = () => {
  return (
    <Link to="/">
      <LogoImg
        src={`${process.env.PUBLIC_URL}/image/logo2.png`}
        alt="logo"
      ></LogoImg>
    </Link>
  );
};

export default Logo;

const LogoImg = styled.img`
  width: 70px;
  height: 70px;
`;
