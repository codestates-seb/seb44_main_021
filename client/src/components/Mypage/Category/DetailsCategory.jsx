import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDetailsActions } from "../../../store/userDetailsSlice";
import { getDetailDatas } from "../../../api/getDetailDatas";
import {
  mapFundingDetails,
  mapOrderDetails,
  mapUpcyclingDetails,
  mapSellsDetails,
} from "../../../utils/mapDetails";
import * as S from "./DetailsCategory.styled";
import { useNavigate } from "react-router-dom";

const DetailsCategory = ({ userData }) => {
  const detailsData = [
    {
      title: "나의 펀딩 내역",
      category: "funding",
      mapFunction: mapFundingDetails,
    },
    {
      title: "나의 주문 내역",
      category: "orders",
      mapFunction: mapOrderDetails,
    },
    {
      title: "나의 펀딩 등록 내역",
      category: "upcyclings",
      mapFunction: mapUpcyclingDetails,
    },
    {
      title: "나의 제품 등록 내역",
      category: "sells",
      mapFunction: mapSellsDetails,
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.userDetails);

  const handleCategoryClick = (data) => {
    setSelectedCategory(data.category);
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
  console.log(data);
  const [selectedCategory, setSelectedCategory] = useState("funding");

  return (
    <S.CategoryContainer>
      <hr />
      {userData.memberRole === "MEMBER_USER" && (
        <ul>
          {detailsData.slice(0, 2).map((data, index) => (
            <S.CategoryList
              key={index}
              active={selectedCategory === data.category}
              onClick={() => handleCategoryClick(data)}
            >
              {data.title}
            </S.CategoryList>
          ))}
        </ul>
      )}
      {userData.memberRole === "MEMBER_UPCYCLER" && (
        <ul>
          {detailsData.map((data, index) => (
            <S.CategoryList
              key={index}
              className={selectedCategory === data.category ? "selected" : ""}
              active={selectedCategory === data.category}
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
