import React from "react";
import style from "./StoreEditPage.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StoreEditPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState("");

  //수정한 펀딩명, 펀딩 소개글 상태값
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setContentText] = useState("");
  const [titleMsg, setTitleMsg] = useState("");
  const [contentMsg, setcontentMsg] = useState("");

  // 현재 url에서 id 가져오기
  const url = window.location.href;
  const parts = url.split("/");
  const sellId = parts[parts.length - 1];

  useEffect(() => {
    axios({
      url: `/sells/${sellId}`,
      method: "get",
    })
      .then((response) => {
        setData(response.data);
        setContentText(response.data.content);
        setEditTitle(response.data.title);
      })
      .catch((err) => console.log(err));
  }, [sellId]);

  const handleTitleChange = (e) => {
    const editTitleValue = e.target.value;
    setEditTitle(editTitleValue);

    if (editTitle.length < 4) {
      setTitleMsg("펀딩명은 5자 이상이여야 합니다!");
    } else {
      setTitleMsg("");
    }
  };

  const handleContentChange = (e) => {
    const editContentValue = e.target.value;
    setContentText(editContentValue);

    if (editContent.length < 9) {
      setcontentMsg("펀딩 소개글은 10자 이상이여야 합니다!");
    } else {
      setcontentMsg("");
    }
  };

  const handleSavaEdit = () => {
    axios({
      url: `/sells/${sellId}`,
      method: "PATCH",
      data: {
        upcyclingId: sellId,
        title: editTitle,
        content: editContent,
        totalQuantity: data.totalQuantity,
      },
    })
      .then((res) => {
        navigate(`/storedetail/${sellId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id={style.AllContainer}>
      <div id={style.AllWrapper}>
        <div id={style.leftWrapper}>
          <div id={style.imgContainer}>
            <img
              id={style.FundingImg}
              src={data.thumbNailImage}
              alt="제품 대표 이미지 미리보기"
            />
          </div>
          <div id={style.MaterierBox}>
            <div className={style.materiarblank}></div>
            <div className={style.materiartext}>
              판매자가 작성한 제품에 사용된 업사이클링 품목입니다.
            </div>
            <hr id={style.materiarhr}></hr>
            <div id={style.materialcontext}>{data.material}</div>
            <div className={style.materiarblank}></div>
          </div>
        </div>
        <div id={style.rightWrapper}>
          <textarea
            placeholder="40자 이내로 입력해주세요."
            id={style.NameInput}
            defaultValue={data.title}
            maxLength="40"
            onChange={handleTitleChange}
          />
          <p className={style.errMsg}>{titleMsg}</p>
          <textarea
            placeholder="500자 이내로 입력해주세요."
            id={style.IntroduceBox}
            maxLength="500"
            defaultValue={data.content}
            onChange={handleContentChange}
          />
          <p className={style.errMsg}>{contentMsg}</p>
          <div className={style.AmountBox}>
            <div className={style.text1}>
              카테고리는 <p className={style.text2}>{data.sellCategoryName}</p>
              로 선택하셨습니다.{" "}
            </div>
            <div className={style.text1}>
              가격은 <p className={style.text2}>{data.price}</p>원으로
              선택하셨습니다.
            </div>
          </div>
          <button id={style.CreateButton} onClick={handleSavaEdit}>
            수정하기
          </button>
        </div>
      </div>
      <div id={style.infoWrapper}>
        <div id={style.info}>
          <div id={style.infoTitle}>제품 상세 정보</div>
          <img src={data.contentImage} alt="img" />
        </div>
        <div id={style.footer}>IEUN CO.</div>
      </div>
    </div>
  );
};

export default StoreEditPage;
