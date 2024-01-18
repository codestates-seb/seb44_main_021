import styled from "styled-components";

// History
export const CategoryContainer = styled.div`
  margin: 0 auto;

  /* width: 80%; */
  hr {
    margin: 2rem 0 1.5rem 0;
    border: none;
    border-top: 1px solid #d1d1d1;
  }
  ul {
    /* width: 100%; */
    display: flex;
    align-items: start;
    flex-direction: column;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    /* width: 90%; */
    margin-top: 1rem;
    hr {
      display: none;
    }
    ul {
      flex-direction: row;
    }
  }
`;

export const CategoryList = styled.li`
  ${(props) =>
    props.className === "selected" &&
    `   
    text-decoration: underline;
    text-underline-offset: 0.5rem;
    text-decoration-color: #c0d6b1;
    text-decoration-thickness: 3px;

        
      `}

  @media (max-width: 768px) {
    margin: 0.4rem auto;
    font-size: 0.7rem;
  }
`;
