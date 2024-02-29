import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif; 
    font-weight: 200;
  }
body{

}
  a {
    text-decoration: none;
    color: inherit;
  }
  ol, ul, li{
    list-style: none;
  }

  button {
    border: none;
    background: transparent;
    cursor: pointer;
  }
  
  input,textarea:focus {
    outline: none;

  }
  input::placeholder {color:#777; font-size: 0.85rem;}
  input::-webkit-input-placeholder {color:#777; font-size: 0.85rem;}
  input:-moz-input-placeholder {color:#777; font-size: 0.85rem;}

  textarea::placeholder {color:#777; font-size: 0.85rem;}
  textarea::-webkit-input-placeholder {color:#777; font-size: 0.85rem;}
  textarea:-moz-input-placeholder {color:#777; font-size: 0.85rem;}



  .underline-effect {
    position:relative;
    display: inline-block;
    width:fit-content;
    cursor: pointer;
    
  &::after {
    background: #c0d6b1;
    position: absolute;
    left: 50%;
    bottom: -0.5rem;
    content: "";
    height: 3px;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }

  &:hover::after {
    left: 0;
    width: 100%;
  }
}
`;

export default GlobalStyle;
