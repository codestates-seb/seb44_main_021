import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/Header/Header";
import style from "./FundingDetail.module.css";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { UserDataContext } from "../../contexts/UserDataContext";

const FundingDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [funding, setFunding] = useState(false);
  const [fundingRate, setFundingRate] = useState();
  const { userData } = useContext(UserDataContext);

  useEffect(() => {
    axios({
      url: `/upcyclings/${id}`,
      method: "get",
    })
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (data.totalReceivedQuantity === 0) {
      setFundingRate("00");
    } else if (data.totalQuantity && data.totalReceivedQuantity) {
      setFundingRate(
        ((data.totalReceivedQuantity / data.totalQuantity) * 100).toFixed(1)
      );
    }
  }, [data.totalQuantity, data.totalReceivedQuantity]);

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFunding(false);
    setQuantity(0);
    // window.location.reload();
  };

  const clickFunding = () => {
    if (quantity) {
      axios({
        url: `/funding`,
        method: "post",
        data: {
          memberId: userData.memberId,
          upcyclingId: id,
          quantity: quantity,
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
      setFunding(true);
      setFundingRate(
        (
          ((data.totalReceivedQuantity + quantity) / data.totalQuantity) *
          100
        ).toFixed(1)
      );
      console.log(funding);
    }
  };

  const navigate = useNavigate();

  const deleteFunding = () => {
    axios({
      url: `/upcyclings/${id}`,
      method: "delete",
    })
      .then((response) => {
        console.log(response);
        navigate("/funding");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id={style.AllContainer}>
      <Header />
      <div id={style.TitleName}>펀딩 상세 정보</div>
      {userData.memberId === data.memberId ? (
        <div id={style.buttonContainer}>
          <button className={style.button} onClick={deleteFunding}>
            삭제
          </button>
          <Link to={`/fundingedit/${data.upcyclingId}`} className={style.link}>
            <button className={style.button}>수정</button>
          </Link>
        </div>
      ) : null}
      <div id={style.AllWrapper}>
        <div id={style.leftWrapper}>
          <div id={style.imgContainer}>
            <img
              src={data.thumbNailImage}
              alt="img"
              style={{
                width: "35vw",
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
                className={`${style.radio} ${
                  data.categoryId !== 1 ? "" : style.checked
                }`}
                type="radio"
                value="1"
                name="materials"
                style={{
                  backgroundImage: "url(/image/IconCloth.png)",
                  backgroundSize: "cover",
                }}
              />
              <input
                className={`${style.radio} ${
                  data.categoryId !== 2 ? "" : style.checked
                }`}
                type="radio"
                value="2"
                name="materials"
                style={{
                  backgroundImage: "url(/image/IconWood.png)",
                  backgroundSize: "cover",
                }}
              />
              <input
                className={`${style.radio} ${
                  data.categoryId !== 3 ? "" : style.checked
                }`}
                type="radio"
                value="3"
                name="materials"
                style={{
                  backgroundImage: "url(/image/IconPlastic.png)",
                  backgroundSize: "cover",
                }}
              />
              <input
                className={`${style.radio} ${
                  data.categoryId !== 4 ? "" : style.checked
                }`}
                type="radio"
                value="4"
                name="materials"
                style={{
                  backgroundImage: "url(/image/IconSteel.png)",
                  backgroundSize: "cover",
                }}
              />
              <input
                className={`${style.radio} ${
                  data.categoryId !== 5 ? "" : style.checked
                }`}
                type="radio"
                value="5"
                name="materials"
                style={{
                  backgroundImage: "url(/image/IconGlass.png)",
                  backgroundSize: "cover",
                }}
              />
              <input
                className={`${style.radio} ${
                  data.categoryId !== 6 ? "" : style.checked
                }`}
                type="radio"
                value="6"
                name="materials"
                style={{
                  backgroundImage: "url(/image/IconEtc.png)",
                  backgroundSize: "cover",
                }}
              />
            </div>
            <h3 className={style.h3}>업사이클러</h3>
            <div id={style.upcycler}>{data.displayName}</div>
          </div>
        </div>
        <div id={style.rightWrapper}>
          <div id={style.NameInput}>
            <h3>{data.title}</h3>
          </div>
          <div id={style.IntroduceBox}>{data.content}</div>
          <div className={style.AmountBox}>
            <div>
              <h2>펀딩 완료일</h2>
            </div>
            <div>
              <h2>{data.deadline}</h2>
            </div>
          </div>
          <div className={style.AmountBox}>
            <div>
              <h2>펀딩률</h2>
            </div>
            <div>
              <h2>
                {data.totalReceivedQuantity <= 0 ? "00%" : `${fundingRate}%`}
              </h2>
            </div>
          </div>
          {localStorage.getItem("token") ? (
            <button id={style.CreateButton} onClick={handleOpenModal}>
              펀딩하기
            </button>
          ) : (
            <Link to="/login">
              <button id={style.CreateButton}>
                로그인 이후 펀딩 가능합니다
              </button>
            </Link>
          )}
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
                    {(
                      (data.totalReceivedQuantity / data.totalQuantity) *
                      100
                    ).toFixed(1)}
                    % -{">"} {fundingRate}%
                  </div>
                  <Link to="/funding">
                    <button id={style.fundingButton}>
                      다른 펀딩 더 보러가기
                    </button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className={style.modaltext}>펀딩명 : {data.title}</div>
                  <div className={style.modaltext}>
                    자재 : {data.categoryName}
                  </div>
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
