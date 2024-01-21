import React, { useState } from "react";
import * as S from "./Details.styled";
import { useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import styled from "styled-components";

const Details = ({ details }) => {
  const detailsData = useSelector((state) => state.userDetails);

  const currentCategory = detailsData.currentCategory;
  const totalCategoryData = details[currentCategory];

  const { tableHeader, detail } = totalCategoryData || {
    tableHeader: [],
    detail: [],
  };

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  const LAST_PAGE =
    detail.length % 10 === 0
      ? parseInt(detail.length / 10)
      : parseInt(detail.length / 10) + 1;

  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.outerText));
  };

  return (
    <S.DetailsContainer>
      <S.DetailsTitle>
        <S.DetailsTitleIcon
          src={`${process.env.PUBLIC_URL}/image/logo1.png`}
          alt="cartegory-title-icon"
        />
        <S.DetailsTitleText>{detailsData.currentTitle}</S.DetailsTitleText>
      </S.DetailsTitle>
      <S.DetailsTable>
        {tableHeader.length > 0 && (
          <>
            <thead>
              <tr>
                {tableHeader.map((text, index) => (
                  <th key={index}>{text}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {detail.length > 0 ? (
                detail
                  .slice(5 * (currentPage - 1), 10 * (currentPage - 1) + 10)
                  .map((data, Index) => (
                    <tr key={Index}>
                      {Object.keys(data).map((key, keyIndex) => (
                        <td key={keyIndex}>{data[key]}</td>
                      ))}
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={tableHeader.length}>내역이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </>
        )}
      </S.DetailsTable>
      {detail.length > 0 && (
        <CustomPagination
          page={currentPage}
          count={LAST_PAGE}
          onChange={handlePageChange}
          shape="rounded"
        />
      )}
    </S.DetailsContainer>
  );
};

export default Details;
const CustomPagination = styled(Pagination)`
  .MuiPagination-ul {
    margin-top: 1rem;
    justify-content: center;
    .Mui-selected {
      background-color: var(--color-main);
      color: #fff;

      &:hover {
        background-color: var(--color-main-80);
      }
    }
  }
`;
