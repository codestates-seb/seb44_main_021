import styled from "styled-components";

// History
export const CategoryContainer = styled.div`
  margin: 0 auto;

  width: 80%;
  hr {
    margin: 2rem 0 1.5rem 0;
    border: none;
    border-top: 1px solid #d1d1d1;
  }
  ul {
    width: 10rem;
  }

  @media (max-width: 768px) {
    width: 90%;
    margin-top: 1rem;
    hr {
      display: none;
    }
    ul {
      display: flex;
      width: 100%;
    }
  }
`;

export const CategoryList = styled.li`
  ${(props) =>
    props.active
      ? `list-style: none;
      display: inline-block;
        text-decoration: underline;
        text-underline-offset: 0.54rem; 
        text-decoration-color: #c0d6b1;
        text-decoration-thickness: 3px;
        line-height: 2rem;
        margin: 0.4rem 0;
        cursor: pointer;
      `
      : `list-style: none;
        display: inline-block;
        margin: 0.4rem 0;
        line-height: 2rem;
        position: relative;
        cursor: pointer;
        `};

  &:not(.selected)::after {
    background: #c0d6b1;
    bottom: 0;
    content: "";
    display: block;
    height: 3px;
    left: 50%;
    position: absolute;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }

  &:not(.selected):hover::after {
    left: 0;
    width: 100%;
  }

  @media (max-width: 768px) {
    margin: 0.4rem auto;
    font-size: 0.7rem;
  }
`;
