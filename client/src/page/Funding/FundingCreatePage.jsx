import React from 'react';
import Header from '../../components/Header/Header';
import style from './FundingCreatePage.module.css';
import { useState, useRef, useContext, useEffect} from 'react';
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
            url: "http://ec2-43-201-105-214.ap-northeast-2.compute.amazonaws.com:8080/upcyclings",
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
        <div id={style.AllContainer}>
            <Header />
            <div id={style.TitleName}>업사이클링 정보</div>
            <div id={style.SubTitle}>만드실 업사이클링 제품을 소개해주세요.</div>
            <div id={style.AllWrapper}>
                <div id={style.leftWrapper}>
                    <SettingUserThumbnail setimgurl = {setimgurl} Imgurl = {Imgurl}/>
                    <p className={style.errMsg}>{imgurlMsg}</p>
                    <div id={style.MaterierBox}>
                        <div className={style.CommonMent}>
                            Step2. 펀딩 받고 싶은 자재를 골라주세요!
                            <div className={style.CautionMent}>(하나로 제한)</div>
                        </div>
                        <div className={style.radioGroup}>
                            <input className={style.radio} type="radio" value="1" name="materials" style={{ backgroundImage: 'url(/image/IconCloth.png)', backgroundSize:'cover'}} onClick={handleMateriel1} />
                            <input className={style.radio} type="radio" value="2" name="materials" style={{ backgroundImage: 'url(/image/IconSteel.png)', backgroundSize:'cover'}} onClick={handleMateriel2} />
                            <input className={style.radio} type="radio" value="3" name="materials" style={{ backgroundImage: 'url(/image/IconPlastic.png)', backgroundSize:'cover'}} onClick={handleMateriel3} />
                            <input className={style.radio} type="radio" value="4" name="materials" style={{ backgroundImage: 'url(/image/IconWood.png)', backgroundSize:'cover'}} onClick={handleMateriel4} />
                            <input className={style.radio} type="radio" value="5" name="materials" style={{ backgroundImage: 'url(/image/IconGlass.png)', backgroundSize:'cover'}} onClick={handleMateriel5} />
                            <input className={style.radio} type="radio" value="6" name="materials" style={{ backgroundImage: 'url(/image/IconEtc.png)', backgroundSize:'cover'}} onClick={handleMateriel6} />
                        </div>
                        <p className={style.errMsg}>{materialMsg}</p>
                    </div>
                </div>
                <div id={style.rightWrapper}>
                    <div className={style.AmountBox}>
                        <div>
                            <div >Step3. 펀딩 자재 수량을 입력해주세요!</div>
                            <div>펀딩율에 적용됩니다.</div>
                            <div className={style.CautionMent}>*나중에 수정이 안되니 신중하게 선택해주세요*</div>
                        </div>
                        <div>
                            <input type="text" onChange={TotalQuantity} ref={totalQuantityRef} onInput={handleInputChange} placeholder='숫자만 입력해주세요.' id={style.AmountInput}/>
                            <p className={style.errMsg}>{totalQuantityMsg}</p>
                        </div>
                    </div>
                    <div className={style.CommonMent}>Step4. 펀딩명을 입력해주세요!</div>
                    <div className={style.CautionMent}>펀딩율을 높이는 Tip★ 내가 만드려고 하는 제품의 특징을 살려서 적어보세요!</div>
                    <textarea onChange={Title} ref={titleRef} placeholder='50자 이내로 입력해주세요.' id={style.NameInput} maxLength="50"/>
                    <p className={style.errMsg}>{titleMsg}</p>
                    <div className={style.CommonMent}>Step5. 내가 필요한 자재에 대해 자세히 적어보세요!</div>
                    <div> 원하는 자재를 자세히 적을수록 원하시는 자재를 받으실 수 있습니다.</div>
                    <textarea onChange={Content} ref={contentRef} placeholder='500자 이내로 입력해주세요.' id={style.IntroduceBox} maxLength="500"/>
                    <p className={style.errMsg}>{contentMsg}</p>
                    <div className={style.AmountBox}>
                        <div>
                            <div className={style.CommonMent}>Step6. 정확한 펀딩 마감일을 입력해주세요!</div>
                            <div className={style.CautionMent}>*나중에 수정이 안되니 신중하게 선택해주세요*</div>
                        </div>
                        <div>
                            <input type='date' id={style.DateInput} onChange={Ddate} ref={ddateRef}/>
                            <p className={style.errMsg}>{ddateMsg}</p>        
                        </div>
                    </div>
                    <button id={style.CreateButton}  onClick={Create}>등록하기</button>
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
          url: 'http://ec2-43-201-105-214.ap-northeast-2.compute.amazonaws.com:8080/upload',
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
      <div id={style.imgContainer}>
        <div id={style.imgWrapper}>
          <img id={style.FundingImg} src={imageSrc} alt="펀딩 이미지 미리보기" />
        </div>
        <div className={style.CommonMent}>
          Step1. 만드려고 하는 업사이클링 제품을 대표할 수 있는 이미지를 넣어주세요!
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
  