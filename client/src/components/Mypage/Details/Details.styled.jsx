import styled from "styled-components";

// Details
export const DetailsContainer = styled.div`
  padding: 0 0 1rem 3rem;
  flex: 3;
  @media (max-width: 768px) {
    padding: 1rem;
    margin-left: 0;
  }
`;

export const DetailsTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const DetailsTitleText = styled.p`
  color: #6e934d;
  font-size: 1.2rem;
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const DetailsTitleIcon = styled.img`
  width: 1.8rem;
  height: 1.8rem;
`;

export const DetailsTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  tr {
    margin: 0.3rem 0;
    & > th {
      font-weight: 500;
      border-top: 2px solid var(--color-main);
      border-bottom: 1px solid var(--color-main);
      height: 2.2rem;
      vertical-align: middle;

      @media (max-width: 768px) {
        font-size: 0.8rem;
      }
    }
    & > td {
      text-align: center;
      padding: 0.7rem 0;
      border-bottom: 1px solid #eaeaea;
    }
  }

  tbody {
    font-size: 0.9rem;
    @media (max-width: 768px) {
      font-size: 0.75rem;
    }
  }
`;

export const EmptyText = styled.p`
  color: #767676;
  text-align: center;
  border-bottom: none;
`;
