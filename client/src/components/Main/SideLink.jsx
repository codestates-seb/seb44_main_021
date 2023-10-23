import styled from "styled-components";
import { Link } from "react-router-dom";

const SideLink = ({ to, text }) => {
  return (
    <LinkPage to={to}>
      <SideLinkText>{text}</SideLinkText>
    </LinkPage>
  );
};

export default SideLink;

const LinkPage = styled(Link)`
  outline: none;
  text-decoration: none;
  color: black;
`;

const SideLinkText = styled.div`
  margin-top: 20px;
  font-size: 25px;
  cursor: pointer;
  font-weight: 500;
  color: #000;
  display: inline-block;
  padding: 10px 0;
  position: relative;
  text-decoration: none;
`;
