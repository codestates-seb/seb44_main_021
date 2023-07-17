import React from 'react';
import Header from '../../components/Header/Header';
import style from './FundingCreatePage.module.css';
import { useState, useRef} from 'react';
import axios from "axios";

const FundingEditPage = () => {

    return (
        <div id={style.AllContainer}>
            <Header />
            <div id={style.TitleName}>업사이클링 정보</div>
            <div id={style.SubTitle}>만드실 업사이클링 제품을 소개해주세요.</div>
            <div id={style.AllWrapper}>
                <div id={style.leftWrapper}>
                    <SettingUserThumbnail/>
                    <div id={style.MaterierBox}>
                        <div className={style.CommonMent}>
                            Step2. 펀딩 받고 싶은 자재를 골라주세요!
                            <div className={style.CautionMent}>(하나로 제한)</div>
                        </div>
                        <div className={style.radioGroup}>
                            <input className={style.radio} type="radio" value="1" name="materials" style={{ backgroundImage: 'url(/image/IconCloth.png)', backgroundSize:'cover'}} />
                            <input className={style.radio} type="radio" value="2" name="materials" style={{ backgroundImage: 'url(/image/IconSteel.png)', backgroundSize:'cover'}}  />
                            <input className={style.radio} type="radio" value="3" name="materials" style={{ backgroundImage: 'url(/image/IconPlastic.png)', backgroundSize:'cover'}}  />
                            <input className={style.radio} type="radio" value="4" name="materials" style={{ backgroundImage: 'url(/image/IconWood.png)', backgroundSize:'cover'}} />
                            <input className={style.radio} type="radio" value="5" name="materials" style={{ backgroundImage: 'url(/image/IconGlass.png)', backgroundSize:'cover'}} />
                            <input className={style.radio} type="radio" value="6" name="materials" style={{ backgroundImage: 'url(/image/IconEtc.png)', backgroundSize:'cover'}}  />
                        </div>
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
                            <input type="text" placeholder='숫자만 입력해주세요.' id={style.AmountInput}/>
                        </div>
                    </div>
                    <div className={style.CommonMent}>Step4. 펀딩명을 입력해주세요!</div>
                    <div className={style.CautionMent}>펀딩율을 높이는 Tip★ 내가 만드려고 하는 제품의 특징을 살려서 적어보세요!</div>
                    <textarea placeholder='50자 이내로 입력해주세요.' id={style.NameInput} maxLength="50"/>
                    <div className={style.CommonMent}>Step5. 내가 필요한 자재에 대해 자세히 적어보세요!</div>
                    <div> 원하는 자재를 자세히 적을수록 원하시는 자재를 받으실 수 있습니다.</div>
                    <textarea placeholder='500자 이내로 입력해주세요.' id={style.IntroduceBox} maxLength="500"/>
                    <div className={style.AmountBox}>
                        <div>
                            <div className={style.CommonMent}>Step6. 정확한 펀딩 마감일을 입력해주세요!</div>
                            <div className={style.CautionMent}>*나중에 수정이 안되니 신중하게 선택해주세요*</div>
                        </div>
                        <div>
                            <input type='date' id={style.DateInput}/>
                        </div>
                    </div>
                    <button id={style.CreateButton}>등록하기</button>
                </div>
            </div>
        </div>
    );
};

export default FundingEditPage;

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
  