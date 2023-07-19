import React, { useState, useEffect, useContext } from "react";
import Header from "../../components/Header/Header";
import style from "./StoreDetail.module.css";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { UserDataContext } from "../../contexts/UserDataContext";

const StoreDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const { userData } = useContext(UserDataContext);

  useEffect(() => {
    axios({
      url: `/sells/${id}`,
      method: "get",
    })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleOpenModal = () => {
    if (quantity) {
      setIsModalOpen(true);
      axios({
        url: `/orders`,
        method: "post",
        data: {
          memberId: userData.memberId,
          orderSells: [
            {
              sellId: data.sellId,
              quantity: quantity,
            },
          ],
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setQuantity(0);
  };

  return (
    <div id={style.AllContainer}>
      <Header />
      <div id={style.TitleName}>펀딩 상세 정보</div>
      {userData.memberId === data.memberId ? (
        <div id={style.buttonContainer}>
          <Link to={`/fundingedit/${data.upcyclingId}`} className={style.link}>
            <button id={style.button}>수정</button>
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
            <div className={style.radioGroup}>{data.material}</div>
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
              <h2>판매 가격</h2>
            </div>
            <div>
              <h2>{data.price}원</h2>
            </div>
          </div>
          <div className={style.AmountBox}>
            <div>
              <h2>수량</h2>
            </div>
            <div>
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">수량</InputLabel>
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
            </div>
          </div>
          <div className={style.AmountBox}>
            <div>
              <h2>총 합계금액</h2>
            </div>
            <div>
              <h2>{data.price * quantity}원</h2>
            </div>
          </div>
          {localStorage.getItem("token") ? (
            <button id={style.CreateButton} onClick={handleOpenModal}>
              구매하기
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
              <h3>구매해 주셔서 감사합니다!!</h3>

              <div className={style.modaltext}>제품명 : {data.title}</div>
              <div className={style.modaltext}>수량 : {quantity}</div>
              <div className={style.modaltext}>
                총 금액 : {data.price * quantity}원
              </div>
              <div id={style.fundingButton}>
                <Link to="/mypage">
                  <button className={style.fundingButton}>
                    구매 내역 보러가기
                  </button>
                </Link>
                <Link to="/store">
                  <button className={style.fundingButton}>
                    다른 상품 보러가기
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreDetail;
