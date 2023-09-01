import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDetailsActions } from "../../../store/userDetailsSlice";
import { getDetailDatas } from "../../../api/getDetailDatas";
import * as S from "./DetailsCategory.styled";
import { useNavigate } from "react-router-dom";

const DetailsCategory = ({ userData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detailAllDatas = useSelector((state) => state.userDetails);
  const detailData = Object.keys(detailAllDatas.details).map(
    (key) => detailAllDatas.details[key]
  );

  const handleCategoryClick = (data) => {
    // setSelectedCategory(data.category);
    dispatch(userDetailsActions.setTitle(data.title));
    dispatch(userDetailsActions.setCategory(data.category));
    getDetailDatas(
      userData.memberId,
      dispatch,
      data.mapFunction,
      data.category
    );
    navigate(`/mypage/${data.category}`);
  };

  return (
    <S.CategoryContainer>
      <hr />
      {userData.memberRole === "MEMBER_USER" && (
        <ul>
          {detailData.slice(0, 2).map((data, index) => (
            <S.CategoryList
              key={index}
              className={
                detailAllDatas.currentCartegory === data.category
                  ? "selected"
                  : ""
              }
              active={detailAllDatas.currentCartegory === data.category}
              onClick={() => handleCategoryClick(data)}
            >
              {data.title}
            </S.CategoryList>
          ))}
        </ul>
      )}
      {userData.memberRole === "MEMBER_UPCYCLER" && (
        <ul>
          {detailData.map((data, index) => (
            <S.CategoryList
              key={index}
              className={
                detailAllDatas.currentCartegory === data.category
                  ? "selected"
                  : ""
              }
              active={detailAllDatas.currentCartegory === data.category}
              onClick={() => {
                handleCategoryClick(data);
              }}
            >
              {data.title}
            </S.CategoryList>
          ))}
        </ul>
      )}
    </S.CategoryContainer>
  );
};

export default DetailsCategory;
