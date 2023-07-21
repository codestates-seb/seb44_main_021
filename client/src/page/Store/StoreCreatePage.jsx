import React from 'react';
import Header from '../../components/Header/Header';
import style from './StoreCreatePage.module.css';
import { useState, useRef, useContext} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../contexts/UserDataContext";

const StoreCreatePage = () => {

    const [categoryid, setcategoryid] = useState("");
    const [categoryidMsg, setcategoryidMsg] = useState("");
    const [title, setTitle] = useState("");
    const [titleMsg, setTitleMsg] = useState("");
    const [content, setcontent] = useState("");
    const [contentMsg, setcontentMsg] = useState("");
    const [price, setprice] = useState("");
    const [priceMsg, setpriceMsg] = useState("");
    const [material, setmaterial] = useState("");
    const [materialMsg, setmaterialMsg] = useState("");
    const [thumimgurl, setThumimgurl] = useState("");
    const [thumimgurlMsg, setThumimgurlMsg] = useState("");
    const [contentimgurl, setContentimgurl] = useState("");
    const [contentimgurlMsg, setContentimgurlMsg] = useState("");

    const categoryRef = useRef(null);
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const priceRef = useRef(null);
    const materialRef = useRef(null);
    const navigate = useNavigate();

    const { userData } = useContext(UserDataContext);

    const handleCategory1 = () => {
      categoryRef.current = '1';
      Category();
    }

    const handleCategory2 = () => {
      categoryRef.current = '2';
      Category();
    }

    const handleCategory3 = () => {
      categoryRef.current = '3';
      Category();
    }

    const handleCategory4 = () => {
      categoryRef.current = '4';
      Category();
    }

    const handleCategory5 = () => {
      categoryRef.current = '5';
      Category();
    }

    const Category = () => {
      let categoryValue = categoryRef.current;
      setcategoryid(categoryValue);
      console.log("categoty"+categoryValue)

      if(categoryValue === null){
        setcategoryidMsg("카테고리를 선택해주세요!")
      }else{
        setcategoryidMsg("")
      }
    }


    const Title = () => {
        let titleValue = titleRef.current.value;
        setTitle(titleValue);
    
        if (title.length < 4) {
          setTitleMsg("펀딩명은 5자 이상이여야 합니다!");
        } else {
          setTitle(titleValue);
          setTitleMsg("");
        }
    };

    const Content = () => {
        let contentValue = contentRef.current.value;
        setcontent(contentValue);
    
        if (content.length < 9) {
            setcontentMsg("펀딩 소개글은 10자 이상이여야 합니다!");
        } else {
            setcontent(contentValue);
            setcontentMsg("");
        }
    };

    const Price = () => {
      let priceValue = priceRef.current.value;
      setprice(priceValue);
  
      if (priceValue === "") {
        setpriceMsg("가격을 입력해주세요!");
      } else {
        setpriceMsg("");
      }
    };

    //가격에 숫자 입력 방지 키워드
    const handleInputChange = (event) => {
      event.target.value = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    };

    //자재 상세 설명
    const Material = () => {
        let materialValue = materialRef.current.value;
        setmaterial(materialValue)

        if(materialValue.length < 1){
            setmaterialMsg("자재 소개글은 2자 이상이여야 합니다!");
        }
        else {
            setmaterialMsg("");
        }
    };

    const ThumImgurl = (url) => {
      if(url === ""){
        setThumimgurlMsg("이미지를 넣어주세요!");
      }else{
        setThumimgurlMsg("");
      }
    }

    const ContentImgurl = (url) => {
      if(url === ""){
        setContentimgurlMsg("이미지를 넣어주세요!");
      }else{
        setContentimgurlMsg("");
      }
    }

    const Create = () => {
        Category();
        Title();
        Content();
        Price();
        Material();
        ThumImgurl(thumimgurl);
        ContentImgurl(contentimgurl);
        if (title.length >= 5 && content.length >= 10 && price !== "" && categoryid !== "" && thumimgurl !== "" && contentimgurl !== "") {
          axios({
            url: "/sells",
            method: "post",
            data: {
                memberId: userData.memberId,
                sellCategoryId : categoryid,
                title: title, 
                content: content,
                price: price,
                material: material, 
                thumbNailImage: thumimgurl, 
                contentImage: contentimgurl 
            },
          })
            .then((res) => {
              console.log(res);
              navigate("/store");
            })
            .catch((err) => {
              console.log(err.response.data);
            });
        } else {
          alert("필수 입력란을 입력해주세요!");
        }
    };

    return (
        <div id={style.AllContainer}>
            <Header />
            <div id={style.TitleName}>스토어 제품 등록</div>
            <div id={style.SubTitle}>판매하실 업사이클링 제품을 소개해주세요.</div>
            <div id={style.upWrapper}>
                <div id={style.leftWrapper}>
                    <SettingUserThumbnail setThumimgurl = {setThumimgurl} ThumImgurl = {ThumImgurl}/>
                    <p className={style.errMsg}>{thumimgurlMsg}</p>
                    <div className={style.CommonMent}>Step2. 제품명을 입력해주세요!</div>
                    <textarea onChange={Title} ref={titleRef} placeholder='50자 이내로 입력해주세요.' id={style.NameInput} maxLength="50"/>
                    <p className={style.errMsg}>{titleMsg}</p>
                    <div className={style.AmountBox}>
                        <div>
                            <div className={style.CommonMent}>Step3. 제품에 대한 자세한 설명이 담긴 이미지를 등록해주세요!</div>
                        </div>
                        <div>
                          <SettingContentimg setContentimgurl={setContentimgurl} ContentImgurl={ContentImgurl} />
                          <p className={style.errMsg}>{contentimgurlMsg}</p>
                        </div>
                    </div>
                </div>
                <div id={style.rightWrapper}>
                    <div id={style.MaterierBox}>
                        <div id={style.basicfont}>Step4. 제품에 들어간 업사이클링 자재를 자세히 적어주세요!</div>
                        <div className={style.CautionMent}>*나중에 수정이 안되니 신중하게 선택해주세요*</div>
                        <textarea onChange={Material} ref={materialRef} placeholder='ex)깨진 유리조각, 페트병, 가죽치마 (100자 이내)' id={style.materialInput} maxLength="100"/>
                        <p className={style.errMsg}>{materialMsg}</p>
                    </div>
                    <div className={style.CommonMent}>Step5. 내가 만든 제품에 대해 자세히 적어보세요!</div>
                    <textarea onChange={Content} ref={contentRef} placeholder='500자 이내로 입력해주세요.' id={style.IntroduceBox} maxLength="500"/>
                    <p className={style.errMsg}>{contentMsg}</p>
                    <div id={style.categorybox}>
                        <div>
                            <div className={style.CommonMent}>Step6. 제품에 대한 카테고리를 선택해주세요!</div>
                        </div>
                        <div className={style.radioGroup}>
                          <input type='radio' name='category' value="1" className={style.radioinput} onClick={handleCategory1}/>의류
                          <input type='radio' name='category' value="2" className={style.radioinput} onClick={handleCategory2}/>가구
                          <input type='radio' name='category' value="3" className={style.radioinput} onClick={handleCategory3}/>인테리어
                          <input type='radio' name='category' value="4" className={style.radioinput} onClick={handleCategory4}/>소품
                          <input type='radio' name='category' value="5" className={style.radioinput} onClick={handleCategory5}/>기타
                        </div>
                        <p className={style.errMsg}>{categoryidMsg}</p>
                    </div>
                    <div className={style.AmountBox}>
                        <div>
                            <div className={style.CommonMent}>Step7. 제품에 대한 합리적인 가격을 입력해주세요!</div>
                            <div className={style.CautionMent}>*나중에 수정이 안되니 신중하게 선택해주세요*</div>
                        </div>
                        <div>
                          <input type="text" onChange={Price} ref={priceRef} onInput={handleInputChange} placeholder='숫자만 입력해주세요.' id={style.AmountInput}/>
                          <p className={style.errMsg}>{priceMsg}</p>
                        </div>
                    </div>
                    <button id={style.CreateButton}  onClick={Create}>등록하기</button>
                </div>
            </div>
            <div id={style.downWrapper}>
              <div id={style.ContentimgWrapper}>
                {contentimgurl ? (
                  <img id={style.FundingImg} src={contentimgurl} alt="제품 컨텐츠 이미지 미리보기" />
                ) : (
                  <img id={style.FundingImg} src={`${process.env.PUBLIC_URL}/image/basicImg.png`} alt="제품 컨텐츠 이미지 미리보기" />
                )}             
              </div>
            </div>
        </div>

    );
};

export default StoreCreatePage;

const SettingUserThumbnail = ({setThumimgurl , ThumImgurl}) => {
    const [imageSrc, setImageSrc] = useState(null);
    const inputRef = useRef(null);
  
    const onUpload = (e) => {

      if (!e.target.files) {
        return;
      }
      
      const file = e.target.files[0]; // 선택된 파일
      const reader = new FileReader(); // 파일을 읽기 위한 FileReader 객체 생성
      const formData = new FormData(); // 파일 데이터를 담을 FormData 객체 생성

      //이미지 크기 제한
      if (file.size > 1 * 1024 * 1024) {
        alert('이미지 크기가 1MB를 초과합니다. 다시 선택해주세요!!');
        return;
      }
  
      reader.readAsDataURL(file);
      formData.append('file', file); // FormData에 파일 추가
  
      return new Promise((resolve, reject) => {
        reader.onload = () => {
          // 파일 읽기가 완료되면 실행될 함수
          setImageSrc(reader.result || null); // 이미지 컨텐츠를 설정합니다.
          resolve();
        };
  
        reader.onerror = () => {
          // 파일 읽기 중에 오류가 발생한 경우 실행될 함수
          reject(new Error('파일을 읽는 도중 오류가 발생했습니다.'));
        };
        
  
        axios({
          url: '/upload',
          method: 'POST',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => {
            setThumimgurl(response.data);
            console.log(response.data);
            console.log(formData);
            ThumImgurl(response.data);
          })
          .catch((error) => {
            console.error(error);
          });


      });
    };
  
    return (
      <div id={style.imgContainer}>
        <div id={style.imgWrapper}>
        {imageSrc ? (
            <img id={style.FundingImg} src={imageSrc} alt="제품 대표 이미지 미리보기" />
          ) : (
            <img id={style.FundingImg} src={`${process.env.PUBLIC_URL}/image/basicImg.png`} alt="제품 대표 이미지 미리보기" />
          )}
        </div>
        <div className={style.CommonMent}>
          Step1. 판매하려고 하는 업사이클링 제품을 대표할 수 있는 이미지를 넣어주세요!
        </div>
        <input
          type="file"
          accept="image/*"
          name="file"
          ref={inputRef}
          onChange={onUpload}
          id={style.imgInput}
        />
      </div>
    );
  };

  const SettingContentimg = ({setContentimgurl, ContentImgurl}) => {
    const [imageSrc, setImageSrc] = useState(null);
    const inputRef = useRef(null);
  
    const onUpload = (e) => {

      if (!e.target.files) {
        return;
      }
      
      const file = e.target.files[0]; // 선택된 파일
      const reader = new FileReader(); // 파일을 읽기 위한 FileReader 객체 생성
      const formData = new FormData(); // 파일 데이터를 담을 FormData 객체 생성

      //이미지 크기 제한
      if (file.size > 1 * 1024 * 1024) {
        alert('이미지 크기가 1MB를 초과합니다. 다시 선택해주세요!!');
        return;
      }
  
      reader.readAsDataURL(file);
      formData.append('file', file); // FormData에 파일 추가
  
      return new Promise((resolve, reject) => {
        reader.onload = () => {
          // 파일 읽기가 완료되면 실행될 함수
          setImageSrc(reader.result || null); // 이미지 컨텐츠를 설정합니다.
          resolve();
        };
  
        reader.onerror = () => {
          // 파일 읽기 중에 오류가 발생한 경우 실행될 함수
          reject(new Error('파일을 읽는 도중 오류가 발생했습니다.'));
        };
        
  
        axios({
          url: '/upload',
          method: 'POST',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then((response) => {
            setContentimgurl(response.data);
            console.log(response.data);
            console.log(formData);
            ContentImgurl(response.data);
          })
          .catch((error) => {
            console.error(error);
          });


      });
    };

    return (
        <input
          type="file"
          accept="image/*"
          name="file"
          ref={inputRef}
          onChange={onUpload}
          id={style.CimgInput}
        />
    );
  };
  
  