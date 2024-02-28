import React from "react";
import style from "./FundingEditPage.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance";

const FundingEditPage = () => {
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
  const upcyclingId = parts[parts.length - 1];

  useEffect(() => {
    axiosInstance({
      url: `/upcyclings/${upcyclingId}`,
      method: "get",
    })
      .then((response) => {
        setData(response.data.data);
        setContentText(response.data.data.content);
        setEditTitle(response.data.data.title);
      })
      .catch((err) => console.log(err));
  }, [upcyclingId]);

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
    axiosInstance({
      url: `/upcyclings/${upcyclingId}`,
      method: "PATCH",
      data: {
        upcyclingId: upcyclingId,
        title: editTitle,
        content: editContent,
        totalQuantity: data.totalQuantity,
      },
    })
      .then((res) => {
        navigate(`/fundingdetail/${upcyclingId}`);
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
              alt="펀딩 이미지 미리보기"
            />
          </div>
          <div id={style.MaterierBox}>
            <div className={style.radioGroup}>
              <input
                className={style.radio}
                type="radio"
                value="1"
                name="materials"
                style={{
                  backgroundImage: "url(/image/IconCloth.png)",
                  backgroundSize: "cover",
                }}
                checked={data.categoryId === 1}
                disabled
              />
              <input
                className={style.radio}
                type="radio"
                value="2"
                name="materials"
                style={{
                  backgroundImage: "url(/image/IconWood.png)",
                  backgroundSize: "cover",
                }}
                checked={data.categoryId === 2}
                disabled
              />
              <input
                className={style.radio}
                type="radio"
                value="3"
                name="materials"
                style={{
                  backgroundImage: "url(/image/IconPlastic.png)",
                  backgroundSize: "cover",
                }}
                checked={data.categoryId === 3}
                disabled
              />
              <input
                className={style.radio}
                type="radio"
                value="4"
                name="materials"
                style={{
                  backgroundImage: "url(/image/IconSteel.png)",
                  backgroundSize: "cover",
                }}
                checked={data.categoryId === 4}
                disabled
              />
              <input
                className={style.radio}
                type="radio"
                value="5"
                name="materials"
                style={{
                  backgroundImage: "url(/image/IconGlass.png)",
                  backgroundSize: "cover",
                }}
                checked={data.categoryId === 5}
                disabled
              />
              <input
                className={style.radio}
                type="radio"
                value="6"
                name="materials"
                style={{
                  backgroundImage: "url(/image/IconEtc.png)",
                  backgroundSize: "cover",
                }}
                checked={data.categoryId === 6}
                disabled
              />
            </div>
            <hr id={style.materiarhr}></hr>
            <div className={style.materiartext}>
              "{data.categoryName}" 자재를 선택하셨습니다.
            </div>
            <div id={style.materiarblank}></div>
          </div>
        </div>
        <div id={style.rightWrapper}>
          <textarea
            id={style.NameInput}
            placeholder="40자 이내로 입력해주세요."
            defaultValue={data.title}
            maxLength="40"
            onChange={handleTitleChange}
          />
          <p className={style.errMsg}>{titleMsg}</p>
          <textarea
            placeholder="500자 이내로 입력해주세요."
            id={style.IntroduceBox}
            defaultValue={data.content}
            maxLength="500"
            onChange={handleContentChange}
          />
          <p className={style.errMsg}>{contentMsg}</p>
          <div className={style.AmountBox}>
            <div className={style.text1}>
              마감일은 <p className={style.text2}>{data.deadline}</p>로
              선택하셨습니다.{" "}
            </div>
            <div className={style.text1}>
              수량은 <p className={style.text2}>{data.totalQuantity}</p>개
              선택하셨습니다.
            </div>
          </div>
          <button id={style.CreateButton} onClick={handleSavaEdit}>
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundingEditPage;
