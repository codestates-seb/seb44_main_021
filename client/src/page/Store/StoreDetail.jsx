import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import style from "./StoreDetail.module.css";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../api/axiosInstance";

const StoreDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [profile, setprofile] = useState("");

  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    axiosInstance({
      url: `/sells/${id}`,
      method: "get",
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`/members/${data.memberId}`)
      .then((res) => {
        setprofile(res.data.data.thumbNailImage);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data.memberId]);

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
        .then((response) => {})
        .catch((err) => console.log(err));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setQuantity(0);
  };

  const navigate = useNavigate();

  const deleteStore = () => {
    const shouldDelete = window.confirm("정말로 삭제하시겠습니까?");

    if (shouldDelete) {
      handleDelete();
    }
  };

  const handleDelete = () => {
    axios({
      url: `/sells/${id}`,
      method: "delete",
    })
      .then((response) => {
        navigate("/store");
      })
      .catch((err) => console.log(err));
    alert("삭제되었습니다.");
  };

  const formatPriceWithCommas = (price) => {
    if (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "수량을 선택해주세요!";
  };

  return (
    <div id={style.AllContainer}>
      <Header />
      <div id={style.AllWrapper}>
        <div id={style.leftWrapper}>
          <div id={style.imgContainer}>
            <img id={style.thumimg} src={data.thumbNailImage} alt="img" />
          </div>
          <div id={style.MaterierBox}>
            <div className={style.materiarblank}></div>
            <div className={style.materiartext}>
              판매자가 작성한 제품에 사용된 업사이클링 품목입니다.
            </div>
            <div className={style.materiartext}>
              이은 스토어는 단순히 수익성 제품을 판매하는 것이 아닌 업사이클링
              제품을 판매하는 과정을 지원해요.
            </div>
            <hr id={style.materiarhr}></hr>
            <div id={style.materialcontext}>{data.material}</div>
            <div className={style.materiarblank}></div>
          </div>
        </div>
        <div id={style.rightWrapper}>
          <div id={style.userbox}>
            <div id={style.userinf}>
              {profile !== null ? (
                <img
                  id={style.userprofile}
                  src={profile}
                  alt="펀딩 이미지 미리보기"
                />
              ) : (
                <img
                  id={style.userprofile}
                  src={`${process.env.PUBLIC_URL}/image/profile.jpeg`}
                  alt="기본 프로필"
                />
              )}
              <div id={style.upcycler}>{data.displayName}</div>
            </div>
            <div id={style.useroption}>
              {userData.memberId === data.memberId ? (
                <div id={style.buttonContainer}>
                  <button className={style.button} onClick={deleteStore}>
                    삭제
                  </button>
                  <Link to={`/storeedit/${data.sellId}`} className={style.link}>
                    <button className={style.button}>수정</button>
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
          <div id={style.subbox}>
            <div className={style.text1}>
              🛒 스토어 {">"} {data.sellCategoryName}
            </div>
            <div id={style.viewtext}>조회수 {data.viewCount}</div>
          </div>
          <div id={style.NameInput}>
            <h3>{data.title}</h3>
          </div>
          <div id={style.IntroduceBox}>{data.content}</div>
          <div className={style.AmountBox}>
            <div className={style.text2}>상품 금액</div>
            <div className={style.text2}>
              {formatPriceWithCommas(data.price)}원
            </div>
          </div>
          <div className={style.quantity}>
            <div className={style.text2}>수량</div>
            <div>
              <select
                id={style.quantitybox}
                value={quantity}
                label="quantity"
                onChange={handleChange}
              >
                <option className={style.text2}>선택해주세요.</option>
                <option className={style.text2} value={1}>
                  1개
                </option>
                <option className={style.text2} value={2}>
                  2개
                </option>
                <option className={style.text2} value={3}>
                  3개
                </option>
                <option className={style.text2} value={4}>
                  4개
                </option>
                <option className={style.text2} value={5}>
                  5개
                </option>
              </select>
            </div>
          </div>
          <div className={style.quantity}>
            <div className={style.text1}>총 결제 금액 </div>
            <div>
              {quantity ? (
                <div className={style.text3}>
                  {formatPriceWithCommas(data.price * quantity)}원
                </div>
              ) : (
                <div className={style.text3}>
                  {formatPriceWithCommas(data.price * quantity)}
                </div>
              )}
            </div>
          </div>
          {localStorage.getItem("token") ? (
            <button id={style.CreateButton} onClick={handleOpenModal}>
              구매하기
            </button>
          ) : (
            <Link to="/login">
              <button id={style.CreateButton}>
                로그인 이후 구매 가능합니다
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
            <div id={style.modaltitle}>
              {userData.displayName}님, 구매해 주셔서 감사합니다!!
            </div>
            <div className={style.modaltext1}>제품명</div>
            <div className={style.modaltext}>{data.title}</div>
            <div className={style.modaltext1}>수량</div>
            <div className={style.modaltext}>{quantity}개</div>
            <div id={style.modaltitle1}>
              총 금액 : {data.price * quantity}원
            </div>
            <div id={style.stoerButton}>
              <Link to="/mypage">
                <button className={style.fundingButton}>
                  구매 내역 보러가기
                </button>
              </Link>
              <Link to="/store">
                <button className={style.fundingButton1}>
                  다른 상품 보러가기
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
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

export default StoreDetail;
