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
      <div id={style.AllWrapper}>
        <div id={style.leftWrapper}>
          <div id={style.imgContainer}>
            <img id={style.thumimg} src={data.thumbNailImage} alt="img"/>
          </div>
          <div id={style.MaterierBox}>
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
            <hr id={style.materiarhr}></hr>
            <div id={style.materiartext}>"{data.categoryName}" 자재가 있다면 펀딩해주세요!</div>
            <div id={style.materiartext}>이은 펀딩은 단순히 제품을 펀딩하는 것이 아닌 업사이클링 제품을 위한 펀딩 과정을 지원해요.</div>
            <div id={style.materiarblank}></div>
          </div>
        </div>
        <div id={style.rightWrapper}>
          <div id={style.userbox}>
            <div id={style.userinf}>
              <img id={style.userprofile} src={`${process.env.PUBLIC_URL}/image/profile.jpeg`}/>
              <div id={style.upcycler}>{data.displayName}</div>
            </div>
            <div id={style.useroption}>
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
            </div>
          </div>
          <div id={style.subbox}>
            <div id={style.text1}>🎁 펀딩</div>
            <div id={style.viewtext}>조회수 {data.viewCount}</div>
          </div>
          <div id={style.NameInput}>
            <h3>{data.title}</h3>
          </div>
          <div id={style.IntroduceBox}>{data.content}</div>
          <div className={style.AmountBox}>
              <div className={style.text2}>{data.deadline} </div>
              <div>부로 펀딩이 마감됩니다. </div>
          </div>
          <div id={style.fundingpercent}>
              <div className={style.text2}>{data.totalReceivedQuantity <= 0 ? "00%" : `${fundingRate}%`}</div>
              <div>달성했습니다.</div>
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
      <div id={style.footer}></div>
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
