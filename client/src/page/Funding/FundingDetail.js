import React from "react";
import Header from "../../components/Header/Header";
import style from "./FundingDetail.module.css";
import { useState } from "react";

const FundingDetail = () => {
  return (
    <div id={style.AllContainer}>
      <Header />
      <div id={style.TitleName}>펀딩 상세 정보</div>
      <div id={style.AllWrapper}>
        <div id={style.leftWrapper}>
          <div id={style.imgContainer}>
            <img
              src={process.env.PUBLIC_URL + "/image/test1.jpg"}
              alt="img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "20px",
              }}
            />
          </div>
          <div id={style.MaterierBox}>
            <h3 className={style.h3}>펀딩 자재</h3>
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
              />
              <input
                className={style.radio}
                type="radio"
                value="2"
                name="materials"
                style={{
                  backgroundImage: "url(/image/IconSteel.png)",
                  backgroundSize: "cover",
                }}
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
              />
              <input
                className={style.radio}
                type="radio"
                value="4"
                name="materials"
                style={{
                  backgroundImage: "url(/image/IconWood.png)",
                  backgroundSize: "cover",
                }}
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
              />
            </div>
            <h3 className={style.h3}>업사이클러 정보</h3>
            <div id={style.upcycler}></div>
          </div>
        </div>
        <div id={style.rightWrapper}>
          <div id={style.NameInput}>
            <h3>제목</h3>
          </div>
          <div id={style.IntroduceBox}>내용</div>
          <div className={style.AmountBox}>
            <div>
              <h2>펀딩 완료일</h2>
            </div>
            <div>
              <h2>2023-07-13</h2>
            </div>
          </div>
          <div className={style.AmountBox}>
            <div>
              <h2>펀딩률</h2>
            </div>
            <div>
              <h2>00%</h2>
            </div>
          </div>
          <button id={style.CreateButton}>펀딩하기</button>
        </div>
      </div>
    </div>
  );
};

export default FundingDetail;

// const Preview = () => {
//   const [imageSrc, setImageSrc] = useState(null);

//   const onUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     return new Promise((resolve) => {
//       reader.onload = () => {
//         setImageSrc(reader.result || null); // 파일의 컨텐츠
//         resolve();
//       };
//     });
//   };

//   return (
//     <div id={style.imgContainer}>
//       <div id={style.imgWrapper}>
//         <img id={style.FundingImg} src={imageSrc} alt="펀딩 이미지 미리보기" />
//       </div>
//       <div className={style.CommonMent}>
//         Step1. 만드려고 하는 업사이클링 제품을 대표할 수 있는 이미지를
//         넣어주세요!
//       </div>
//       <input
//         accept="image/*"
//         multiple
//         type="file"
//         onChange={(e) => onUpload(e)}
//         id={style.imgInput}
//       />
//     </div>
//   );
// };
