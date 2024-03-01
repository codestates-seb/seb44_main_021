import styled from "styled-components";

const MaxWidthContainer = styled.main`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 1000px;
  margin: auto;
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 30px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    /* gap: 2rem; */
    margin-top: 0px;
  }
`;

const ThumbnailImg = styled.img`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
  height: 500px;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

export { MaxWidthContainer, GridWrapper, ThumbnailImg };
