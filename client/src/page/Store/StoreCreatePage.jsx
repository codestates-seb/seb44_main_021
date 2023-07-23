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
        <div>
          <Header />
          <div id={style.AllContainer}>
            <div id={style.AllWrapper}>
              <div id={style.UpWrapper}>
                <div id={style.leftWrapper}>
                  <div id={style.TitleName}>스토어 기본 정보</div>
                  <div id={style.SubTitle}>판매하실 업사이클링 제품을 대표하는 중요한 정보들을 입력해주세요.</div>
                  <div className={style.Titlebox}>
                    <div className={style.CommonMent}>제품 제목</div>
                    <div className={style.star}>*</div>
                  </div>
                  <textarea onChange={Title} ref={titleRef} placeholder='40자 이내로 입력해주세요.' id={style.NameInput} maxLength="40"/>
                  <p className={style.errMsg}>{titleMsg}</p>
                  <div className={style.Titlebox}>
                    <div className={style.CommonMent}>대표 이미지</div>
                    <div className={style.star}>*</div>
                  </div>
                  <SettingUserThumbnail setThumimgurl = {setThumimgurl} ThumImgurl = {ThumImgurl}/>
                  <p className={style.errMsg}>{thumimgurlMsg}</p>
                  <div className={style.Titlebox}>
                    <div className={style.CommonMent}>제품 소개</div>
                    <div className={style.star}>*</div>
                  </div>
                  <textarea onChange={Content} ref={contentRef} placeholder='500자 이내로 입력해주세요.' id={style.IntroduceBox} maxLength="500"/>
                  <p className={style.errMsg}>{contentMsg}</p>
                  <div className={style.Titlebox}>
                    <div className={style.CommonMent}>자재 소개</div>
                    <div className={style.star}>*</div>
                  </div>
                  <textarea onChange={Material} ref={materialRef} placeholder='ex)깨진 유리조각, 페트병, 가죽치마 (100자 이내)' id={style.materialInput} maxLength="100"/>
                  <p className={style.errMsg}>{materialMsg}</p>
                  <div className={style.Titlebox}>
                    <div className={style.CommonMent}>카테고리</div>
                    <div className={style.star}>*</div>
                  </div>
                  <div className={style.radioGroup}>
                    <input type='radio' name='category' value="1" className={style.radioinput} onClick={handleCategory1}/>의류
                    <input type='radio' name='category' value="2" className={style.radioinput} onClick={handleCategory2}/>가구
                    <input type='radio' name='category' value="3" className={style.radioinput} onClick={handleCategory3}/>인테리어
                    <input type='radio' name='category' value="4" className={style.radioinput} onClick={handleCategory4}/>소품
                    <input type='radio' name='category' value="5" className={style.radioinput} onClick={handleCategory5}/>기타
                  </div>
                  <p className={style.errMsg}>{categoryidMsg}</p>
                  <div className={style.Titlebox}>
                    <div className={style.CommonMent}>판매 금액</div>
                    <div className={style.star}>*</div>
                  </div>
                  <input type="text" onChange={Price} ref={priceRef} onInput={handleInputChange} placeholder='숫자만 입력해주세요.' id={style.AmountInput}/>
                  <p className={style.errMsg}>{priceMsg}</p>
                  <div className={style.Titlebox}>
                    <div className={style.CommonMent}>상세 정보 이미지</div>
                    <div className={style.star}>*</div>
                  </div>
                  <SettingContentimg setContentimgurl={setContentimgurl} ContentImgurl={ContentImgurl} />
                  <p className={style.errMsg}>{contentimgurlMsg}</p>
                  <button id={style.CreateButton}  onClick={Create}>등록하기</button>
                </div>
                <div id={style.rightWrapper}>
                  <div id={style.tipbox1}>
                    <p className={style.tiptitle}>TIP! 제품 제목은 핵심을 간결하게</p>
                    <p className={style.tipcontent}>업사이클링 상품만의 장점을 잘 드러나는 키워드를 한 가지 이상 포함해 주세요.</p>
                    <p className={style.tipcontent}>중요한 키워드는 눈에 잘 띄도록 제목 앞부분에 적는 것을 추천해요.</p>
                  </div>
                  <div id={style.tipbox2}>
                    <p className={style.tiptitle}>TIP! 클릭할 수밖에 없는 매력적인 이미지</p>
                    <p className={style.tipcontent}>제품의 첫인상인 대표 이미지는 가장 매력적으로 보이는 사진을 선택해 주세요.</p>
                    <p className={style.tipcontent}>이미지가 1:1 비율로 보일 수 있으므로 이미지 내 좌우 여백이 충분하고 중앙에 위치한 사진을 선택해 주세요.</p>
                  </div>
                  <div id={style.tipbox3}>
                    <p className={style.tiptitle}>TIP! 이것만은 알아 주었으면 하는 핵심</p>
                    <p className={style.tipcontent}>제품을 간결하게 소개해 주세요.</p>
                    <p className={style.tipcontent}>육하원칙에 의거하여 적으면 더 좋아요.</p>
                  </div>
                  <div id={style.tipbox4}>
                    <p className={style.tiptitle}>TIP! 업사이클한 자재에 대한 자세한 설명</p>
                    <p className={style.tipcontent}>어떤 자재를 가지고 만들었는지 적어주세요. 자세할수록 소비자의 마음을 사로잡기 좋습니다. 추후 수정이 불가하니 신중하게 적어주세요.</p>
                  </div>
                  <div id={style.tipbox5}>
                    <p className={style.tiptitle}>TIP! 가격은 너무 낮거나 높지 않게</p>
                    <p className={style.tipcontent}>추후 수정이 불가하니 신중하게 선택해주세요.</p>
                    <p className={style.tipcontent}>판매자의 노력이 담긴 합리적인 가격을 제시해주세요.</p>
                  </div>
                  <div id={style.tipbox6}>
                    <p className={style.tiptitle}>TIP! 상세한 설명이 담긴 단 한 장의 사진</p>
                    <p className={style.tipcontent}>최대한 많은 내용을 담아 긴 사진으로 한 장 올려주세요.</p>
                    <p className={style.tipcontent}>소비자들이 궁금해할만한 내용은 모두 담아주세요.</p>
                  </div>
                </div>
              </div>
              <div id={style.downWrapper}>
                <div id={style.ContentimgWrapper}>
                  {contentimgurl ? (
                    <img className={style.FundingImg} src={contentimgurl} alt="제품 컨텐츠 이미지 미리보기" />
                  ) : (
                    <div>+ 이미지를 추가해주세요.</div>                  
                  )}             
                </div>
              </div>
            </div>
            <div id={style.footer}>IEUN CO.</div>
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
      <div>
        <input
          type="file"
          accept="image/*"
          name="file"
          ref={inputRef}
          onChange={onUpload}
          className={style.imgInput}
        />
        <div id={style.imgWrapper}>
          {imageSrc ? (
            <img className={style.FundingImg} src={imageSrc} alt="펀딩 이미지 미리보기" />
          ) : (
            <div>+ 이미지를 추가해주세요.</div>
          )}
        </div>
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
          className={style.imgInput}
        />
    );
  };
  
  