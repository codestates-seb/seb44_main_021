import React from 'react';
import style from './StoreEditPage.module.css';
import Header from '../../components/Header/Header';
import { useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


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
            console.log(response);
            setData(response.data);
            setContentText(response.data.content);
            setEditTitle(response.data.title)
          })
          .catch((err) => console.log(err));
    },[sellId]);


    const handleTitleChange = (e) => {
        const editTitleValue = e.target.value;
        setEditTitle(editTitleValue);

        if(editTitle.length<4){
            setTitleMsg("펀딩명은 5자 이상이여야 합니다!");
        }else {
            setTitleMsg("");
        }     
    };

    const handleContentChange = (e) => {
        const editContentValue = e.target.value;
        setContentText(editContentValue);

        if(editContent.length < 9){
            setcontentMsg("펀딩 소개글은 10자 이상이여야 합니다!");
        }else{
            setcontentMsg("");
        }
    };

    const handleSavaEdit = () => {
        axios({
            url: `/sells/${sellId}`,
            method: "PATCH",
            data: {
                upcyclingId : sellId,
                title: editTitle,
                content: editContent,
                totalQuantity: data.totalQuantity
            },
        })
        .then((res) => {
            console.log(res);
            navigate(`/storedetail/${sellId}`);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <div id={style.AllContainer}>
            <Header />
            <div id={style.TitleName}>스토어 제품 수정</div>
            <div id={style.SubTitle}>제품명과 제품 소개글만 수정 가능합니다.</div>
            <div id={style.AllWrapper}>
                <div id={style.leftWrapper}>
                    <div className={style.CommonMent}>대표 이미지</div>
                    <div id={style.imgContainer}>
                        <img id={style.FundingImg} src={data.thumbNailImage} alt="제품 대표 이미지 미리보기" />
                    </div>                    
                    <div id={style.MaterierBox}>
                        <div className={style.CommonMent}>업사이클링 자재</div>
                        <textarea placeholder='ex)깨진 유리조각, 페트병, 가죽치마 (100자 이내)' id={style.materialInput} maxLength="100" defaultValue={data.material} readOnly/>                    
                    </div>
                </div>
                <div id={style.rightWrapper}>
                    <div className={style.CautionMent}>제품명</div>
                    <textarea placeholder='50자 이내로 입력해주세요.' id={style.NameInput} defaultValue={data.title} maxLength="50" onChange={handleTitleChange}/>
                    <p className={style.errMsg}>{titleMsg}</p>
                    <div className={style.CautionMent}>제품 소개글</div>
                    <textarea placeholder='500자 이내로 입력해주세요.' id={style.IntroduceBox} maxLength="500" defaultValue={data.content} onChange={handleContentChange}/>
                    <p className={style.errMsg}>{contentMsg}</p>
                    <div id={style.categorybox}>
                        <div>
                            <div className={style.CommonMent}>카테고리</div>
                        </div>
                        <div className={style.radioGroup}>
                          <input type='radio' name='category' value="1" className={style.radioinput} checked={data.sellCategoryId === 1} readOnly/>의류
                          <input type='radio' name='category' value="2" className={style.radioinput} checked={data.sellCategoryId === 2} readOnly/>가구
                          <input type='radio' name='category' value="3" className={style.radioinput} checked={data.sellCategoryId === 3} readOnly/>인테리어
                          <input type='radio' name='category' value="4" className={style.radioinput} checked={data.sellCategoryId === 4} readOnly/>소품
                          <input type='radio' name='category' value="5" className={style.radioinput} checked={data.sellCategoryId === 5} readOnly/>기타
                        </div>
                    </div>
                    <div className={style.AmountBox}>
                        <div>
                            <div className={style.CommonMent}>가격</div>
                        </div>
                        <div>
                          <input type="text" placeholder='숫자만 입력해주세요.' id={style.AmountInput} defaultValue={data.price} readOnly />
                        </div>
                    </div>
                    <button id={style.CreateButton}  onClick={handleSavaEdit}>수정하기</button>
                </div>
            </div>
            <div id={style.downWrapper}>
              <div id={style.ContentimgWrapper}>
                <img id={style.FundingImg} src={data.contentImage} alt="제품 상세 이미지 미리보기" />
              </div>
            </div>
        </div>
    );
};

export default StoreEditPage;