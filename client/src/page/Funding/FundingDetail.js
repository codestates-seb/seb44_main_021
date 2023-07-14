import React from "react";
import Header from "../../components/Header/Header";
import style from "./FundingDetail.module.css";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";

const FundingDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [funding, setFunding] = useState(false);

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFunding(false);
    setQuantity("");
  };

  const clickFunding = () => {
    if (quantity) {
      setFunding(true);
      console.log(funding);
      setQuantity("");
    }
  };

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
          <button id={style.CreateButton} onClick={handleOpenModal}>
            펀딩하기
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>
            <button className={style.closeButton} onClick={handleCloseModal}>
              <CloseIcon />
            </button>
            <div className={style.modalBody}>
              <h3>펀딩해 주셔서 감사합니다!!</h3>
              {funding ? (
                <div>
                  <div className={style.modaltext}>
                    주소 : 서울특별시 강남구 58 - 2
                  </div>
                  <div className={`${style.modaltext} ${style.red}`}>
                    택배는 위의 주소로 착불로 보내주시면 됩니다!
                  </div>
                  <div className={style.modaltext}>달성률</div>
                  <div className={`${style.modaltext} ${style.rate}`}>
                    00% -{">"} 00%
                  </div>
                  <Link to="/funding">
                    <button id={style.fundingButton}>
                      다른 펀딩 더 보러가기
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className={style.modaltext}>펀딩명 : title</div>
                  <div className={style.modaltext}>자재 : xxx</div>
                  <div className={style.modaltext}>보내실 수량 :</div>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        수량
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={quantity}
                        label="quantity"
                        onChange={handleChange}
                      >
                        <MenuItem value={1}>1개</MenuItem>
                        <MenuItem value={2}>2개</MenuItem>
                        <MenuItem value={3}>3개</MenuItem>
                        <MenuItem value={4}>4개</MenuItem>
                        <MenuItem value={5}>5개</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <div className={`${style.modaltext} ${style.red}`}>
                    * 반드시 수량을 선택해 주세요!
                  </div>
                  <button id={style.fundingButton} onClick={clickFunding}>
                    펀딩하기
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundingDetail;
