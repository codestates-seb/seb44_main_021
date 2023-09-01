import React from "react";
import * as S from "./Details.styled";
import { useSelector } from "react-redux";

const Details = () => {
  const detailsData = useSelector((state) => state.userDetails);
  const currentCartegory = detailsData.currentCartegory;
  const currentCategoryData = detailsData.details[currentCartegory];

  const { tableHeader, detail } = currentCategoryData || {
    tableHeader: [],
    detail: [],
  };

  return (
    <S.DetailsContainer>
      <S.DetailsWrapper>
        <S.DetailsTitle>
          <S.DetailsTitleIcon
            src={`${process.env.PUBLIC_URL}/image/logo1.png`}
          />
          <S.DetailsTitleText>{detailsData.currentTitle}</S.DetailsTitleText>
        </S.DetailsTitle>

        <S.DetailsTable>
          {tableHeader.length > 0 && (
            <>
              <thead>
                <S.DetailsTableRow>
                  {tableHeader.map((text, index) => (
                    <S.DetailsTableHeader key={index}>
                      {text}
                    </S.DetailsTableHeader>
                  ))}
                </S.DetailsTableRow>
              </thead>
              <S.DetailsTableBody>
                {detail.length > 0 ? (
                  detail.map((data, Index) => (
                    <S.DetailsTableRow key={Index}>
                      {Object.keys(data).map((key, keyIndex) => (
                        <S.DetailsTableCell key={keyIndex}>
                          {data[key]}
                        </S.DetailsTableCell>
                      ))}
                    </S.DetailsTableRow>
                  ))
                ) : (
                  <S.DetailsTableRow>
                    <S.DetailsTableCell colSpan={tableHeader.length}>
                      내역이 없습니다.
                    </S.DetailsTableCell>
                  </S.DetailsTableRow>
                )}
              </S.DetailsTableBody>
            </>
          )}
        </S.DetailsTable>
      </S.DetailsWrapper>
    </S.DetailsContainer>
  );
};

export default Details;
