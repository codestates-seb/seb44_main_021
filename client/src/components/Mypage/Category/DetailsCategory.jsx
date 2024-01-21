import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDetailsActions } from "../../../store/slice/userDetailsSlice";
import { getDetailDatas } from "../../../api/getDetailDatas";
import * as S from "./DetailsCategory.styled";
import { useNavigate } from "react-router-dom";

const DetailsCategory = ({ details, getUserDetails }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.userData);

  const currentCategory = useSelector(
    (state) => state.userDetails.currentCategory
  );
  const detailData = Object.keys(details).map((key) => details[key]);

  const handleCategoryClick = (data) => {
    dispatch(userDetailsActions.setTitle(data.title));
    dispatch(userDetailsActions.setCategory(data.category));

    getDetailDatas(userData.memberId, data.category).then((res) => {
      getUserDetails(data.category, res.data.data);
    });

    navigate(`/mypage/${data.category}`);
  };

  return (
    <S.CategoryContainer>
      <hr />
      {userData.memberRole === "MEMBER_USER" ? (
        <ul>
          {detailData.slice(0, 2).map((data, index) => (
            <S.CategoryList
              key={index}
              className={currentCategory === data[index].category && "selected"}
              active={currentCategory === data.category}
              onClick={() => handleCategoryClick(data)}
            >
              {data.title}
            </S.CategoryList>
          ))}
        </ul>
      ) : (
        <ul>
          {detailData.map((data, index) => (
            <S.CategoryList
              key={index}
              className={
                currentCategory === data.category
                  ? "selected"
                  : "underline-effect"
              }
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
