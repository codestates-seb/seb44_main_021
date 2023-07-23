import React from 'react';
import Header from '../../components/Header/Header';
import style from './FundingCreatePage.module.css';
import { useState, useRef, useContext} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../contexts/UserDataContext";

const FundingCreatePage = () => {

    const [title, setTitle] = useState("");
    const [titleMsg, setTitleMsg] = useState("");
    const [content, setcontent] = useState("");
    const [contentMsg, setcontentMsg] = useState("");
    const [totalQuantity, settotalQuantity] = useState("");
    const [totalQuantityMsg, settotalQuantityMsg] = useState("");
    const [material, setmaterial] = useState("");
    const [materialMsg, setmaterialMsg] = useState("");
    const [ddate, setddate] = useState("");
    const [ddateMsg, setddateMsg] = useState("");
    const [imgurl, setimgurl] = useState("");
    const [imgurlMsg, setimgurlMsg] = useState("");

    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const totalQuantityRef = useRef(null);
    const materialRef = useRef("");
    const ddateRef = useRef(null);
    const navigate = useNavigate();

    //날짜 최소 최대 값 변수
    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 100);
    const formattedMaxDate = maxDate.toISOString().split('T')[0];

    const { userData } = useContext(UserDataContext);

    const handleInputChange = (event) => {
        event.target.value = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    };

    const Imgurl = (url) => {
      if(url === ""){
        setimgurlMsg("이미지를 넣어주세요!");
      }else{
        setimgurlMsg("");
      }
    }

    const Title = () => {
        let titleValue = titleRef.current.value;
        setTitle(titleValue);
    
        if (title.length < 4) {
          setTitleMsg("펀딩명은 5자 이상이여야 합니다!");
        } else {
          setTitleMsg("");
        }
    };

    const Content = () => {
        let contentValue = contentRef.current.value;
        setcontent(contentValue);
    
        if (content.length < 9) {
            setcontentMsg("펀딩 소개글은 10자 이상이여야 합니다!");
        } else {
            setcontentMsg("");
        }
    };

    const TotalQuantity = () => {
      let TQValue = totalQuantityRef.current.value;
      settotalQuantity(TQValue);
  
      if (TQValue === "") {
        settotalQuantityMsg("수량을 입력해주세요!");
      } else if (TQValue.indexOf("0") === 0) {
        settotalQuantityMsg("수량 첫번째 자리에 0이 입력되면 안됩니다.");
      } else {
        settotalQuantityMsg("");
      }
    };

    const Material = () => {
        let materialValue = materialRef.current;
        setmaterial(materialValue)

        if(materialValue === ""){
            setmaterialMsg("자재를 하나 선택해주세요!");
        }
        else {
            setmaterialMsg("");
        }
    };

    const handleMateriel1 = () => {
      materialRef.current = '1';
      Material();
    }

    const handleMateriel2 = () => {
      materialRef.current = '2';
      Material();
    }

    const handleMateriel3 = () => {
      materialRef.current = '3';
      Material();
    }

    const handleMateriel4 = () => {
      materialRef.current = '4';
      Material();
    }

    const handleMateriel5 = () => {
      materialRef.current = '5';
      Material();
    }

    const handleMateriel6 = () => {
      materialRef.current = '6';
      Material();
    }


    const Ddate = () => {
      let ddateValue = ddateRef.current.value;
      setddate(ddateValue);
  
      if (ddateValue === "") {
        setddateMsg("펀딩 마감일을 선택해주세요!");
      } else {
        setddateMsg("");
      }
    };

    const Create = () => {
        Imgurl(imgurl);
        Title();
        Content();
        Material();
        TotalQuantity();
        Ddate();
        if (imgurl !== "" && title.length >= 5 && content.length >= 10 && totalQuantity.length > 0  && material !== "" & ddate !== "") {
          axios({
            url: "/upcyclings",
            method: "post",
            data: {
                memberId: userData.memberId,
                categoryId: material,
                title: title,
                content: content,
                totalQuantity:totalQuantity,
                deadline: ddate,
                thumbNailImage: imgurl
            },
          })
            .then((res) => {
              console.log(res);
              navigate("/funding");
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
            <div id={style.leftWrapper}>
              <div id={style.TitleName}>펀딩 기본 정보</div>
              <div id={style.SubTitle}>만드실 업사이클링을 대표하는 중요한 정보들을 입력해주세요.</div>
              <div className={style.Titlebox}>
                <div className={style.CommonMent}>펀딩 제목</div>
                <div className={style.star}>*</div>
              </div>
              <textarea onChange={Title} ref={titleRef} placeholder='40자 이내로 입력해주세요.' id={style.NameInput} maxLength="40"/>
              <p className={style.errMsg}>{titleMsg}</p>
              <div className={style.Titlebox}>
                <div className={style.CommonMent}>대표 이미지</div>
                <div className={style.star}>*</div>
              </div>
              <SettingUserThumbnail setimgurl = {setimgurl} Imgurl = {Imgurl}/>
              <p className={style.errMsg}>{imgurlMsg}</p>
              <div className={style.Titlebox}>
                <div className={style.CommonMent}>펀딩 소개</div>
                <div className={style.star}>*</div>
              </div>
              <textarea onChange={Content} ref={contentRef} placeholder='500자 이내로 입력해주세요.' id={style.IntroduceBox} maxLength="500"/>
              <p className={style.errMsg}>{contentMsg}</p>
              <div className={style.Titlebox}>
                <div className={style.CommonMent}>펀딩 자재 유형</div>
                <div className={style.star}>*</div>
              </div>
              <div className={style.radioGroup}>
                <input className={style.radio} type="radio" value="1" name="materials" style={{ backgroundImage: 'url(/image/IconCloth.png)', backgroundSize:'cover'}} onClick={handleMateriel1} />
                <input className={style.radio} type="radio" value="2" name="materials" style={{ backgroundImage: 'url(/image/IconWood.png)', backgroundSize:'cover'}} onClick={handleMateriel2} />
                <input className={style.radio} type="radio" value="3" name="materials" style={{ backgroundImage: 'url(/image/IconPlastic.png)', backgroundSize:'cover'}} onClick={handleMateriel3} />
                <input className={style.radio} type="radio" value="4" name="materials" style={{ backgroundImage: 'url(/image/IconSteel.png)', backgroundSize:'cover'}} onClick={handleMateriel4} />
                <input className={style.radio} type="radio" value="5" name="materials" style={{ backgroundImage: 'url(/image/IconGlass.png)', backgroundSize:'cover'}} onClick={handleMateriel5} />
                <input className={style.radio} type="radio" value="6" name="materials" style={{ backgroundImage: 'url(/image/IconEtc.png)', backgroundSize:'cover'}} onClick={handleMateriel6} />
              </div>
              <p className={style.errMsg}>{materialMsg}</p>
              <div className={style.Titlebox}>
                <div className={style.CommonMent}>목표 수량</div>
                <div className={style.star}>*</div>
              </div>
              <input type="text" onChange={TotalQuantity} ref={totalQuantityRef} onInput={handleInputChange} placeholder='숫자만 입력해주세요.' id={style.AmountInput}/>
              <p className={style.errMsg}>{totalQuantityMsg}</p>
              <div className={style.Titlebox}>
                <div className={style.CommonMent}>펀딩 종료일</div>
                <div className={style.star}>*</div>
              </div>
              <div>
                <input type='date' id={style.DateInput} onChange={Ddate} ref={ddateRef} min={minDate} max={formattedMaxDate}/>
                <p className={style.errMsg}>{ddateMsg}</p>        
              </div>
              <button id={style.CreateButton}  onClick={Create}>등록하기</button>
            </div>
            <div id={style.rightWrapper}>
              <div id={style.tipbox1}>
                <p className={style.tiptitle}>TIP! 프로젝트 제목은 핵심을 간결하게</p>
                <p className={style.tipcontent}>업사이클링 상품의 특징이 잘 드러나는 키워드를 한 가지 이상 포함해 주세요.</p>
                <p className={style.tipcontent}>중요한 키워드는 눈에 잘 띄도록 제목 앞부분에 적는 것을 추천해요.</p>
              </div>
              <div id={style.tipbox2}>
                <p className={style.tiptitle}>TIP! 클릭할 수밖에 없는 매력적인 이미지</p>
                <p className={style.tipcontent}>펀딩의 첫인상인 대표 이미지는 가장 매력적으로 보이는 사진을 선택해 주세요.</p>
                <p className={style.tipcontent}>이미지가 1:1 비율로 보일 수 있으므로 이미지 내 좌우 여백이 충분하고 중앙에 위치한 사진을 선택해 주세요.</p>
              </div>
              <div id={style.tipbox3}>
                <p className={style.tiptitle}>TIP! 이것만은 알아 주었으면 하는 핵심</p>
                <p className={style.tipcontent}>프로젝트를 쉽고 간결하게 소개해 주세요.</p>
                <p className={style.tipcontent}>원하시는 자재에 대해 상세히 적어주세요.</p>
              </div>
              <div id={style.tipbox4}>
                <p className={style.tiptitle}>TIP! 핵심 자재 하나만 픽</p>
                <p className={style.tipcontent}>나중에 수정이 안되니 가장 펀딩을 원하는 자재를 하나만 선택해주세요.</p>
                <p className={style.tipcontent}>여러개의 업사이클링 제품이 필요하다면 펀딩을 여러번 등록해주세요.</p>
              </div>
              <div id={style.tipbox5}>
                <p className={style.tiptitle}>TIP! 목표 수량은 너무 낮거나 높지 않게</p>
                <p className={style.tipcontent}>펀딩율을 결정하는 중요한 요소니 신중하게 고민해 주세요. 추후 수정이 불가합니다.</p>
              </div>
              <div id={style.tipbox6}>
                <p className={style.tiptitle}>TIP! 100일 뒤까지는 오케이</p>
                <p className={style.tipcontent}>목표 수량을 채울 수 있는 시간을 고민후 선택해주세요. 추후 수정이 불가합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default FundingCreatePage;

const SettingUserThumbnail = ({setimgurl , Imgurl}) => {
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
            setimgurl(response.data);
            console.log(response.data);
            console.log(formData);
            Imgurl(response.data);
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
          id={style.imgInput}
        />
        <div id={style.imgWrapper}>
          {imageSrc ? (
            <img id={style.FundingImg} src={imageSrc} alt="펀딩 이미지 미리보기" />
          ) : (
            <div>+ 이미지를 추가해주세요.</div>
          )}
        </div>
      </div>
    );
  };
  