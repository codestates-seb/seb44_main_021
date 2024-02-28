// ImgPreview.js
import React from "react";
import styled from "styled-components";

const ImgPreview = ({ fileName, imageSrc, purpose }) => {
  return (
    <>
      {purpose === "profile" ? (
        <UserImg src={imageSrc} alt="profile-img" />
      ) : (
        <ImgPreviewBox>
          {imageSrc && fileName !== "파일을 선택해 주세요." ? (
            <img src={imageSrc} alt="펀딩 이미지 미리보기" />
          ) : (
            <p>👀 미리보기</p>
          )}
        </ImgPreviewBox>
      )}
    </>
  );
};

const ImgPreviewBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid var(--color-gray-50);
  padding: 0.7rem;
  border-radius: 5px;
  & p {
    color: #777;
    font-size: 0.85rem;
    /* font-size: 0.85rem; */
  }
  & img {
    max-width: 100%;
    max-height: 100%;
  }
`;

//프로필

const UserImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: solid 4px var(--color-main);
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
`;

export default ImgPreview;
