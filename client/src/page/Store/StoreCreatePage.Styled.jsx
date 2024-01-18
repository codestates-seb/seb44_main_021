import styled from "styled-components";

export const CreateFormContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4rem 0;
`;
export const CreateForm = styled.form`
  max-width: 1000px;
  @media (max-width: 768px) {
    max-width: 768px;
    margin: 4rem;
  }
  fieldset {
    > legend {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-main);
    }

    > p {
      margin-top: 0.5rem;

      > span {
        color: red;
      }
    }
  }
`;

export const TitleBox = styled.div`
  & p {
    font-size: 0.9rem;
    margin-top: 0.5rem;
    & > span {
      color: red;
    }
  }
`;
