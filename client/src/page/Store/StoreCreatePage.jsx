import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CATEGORY_OPTIONS } from "../../constants/options";
import useInputs from "../../hooks/useInputs";
import useErrHandler from "../../hooks/useErrHandler";
import * as S from "./StoreCreatePage.Styled";
import Button from "../../components/common/Button";
import { STORE_TIPS } from "../../constants/tips";
import { STORE_INPUT_ATT } from "../../constants/attribute";
import FundingFormSection from "../../components/create/funding/FundingFormSection";
import SelectBox from "../../components/common/SelectBox";
import styled from "styled-components";
import { createStorePost } from "../../api/createPost";
import { validationsPost } from "../../utils/validateInput";

const StoreCreatePage = () => {
  const { handleInputErr, errMsgObj } = useErrHandler();
  const userData = useSelector((state) => state.userData);
  const [createData, onChange] = useInputs({
    sellCategoryId: null,
    title: null,
    content: null,
    price: null,
    material: null,
    thumbNailImage: null,
    contentImage: null,
  });
  console.log(createData);

  const navigate = useNavigate();

  // const validations = {
  //   title: (value) =>
  //     value.length < 5 && value !== "" ? "제목은 5자 이상 입력해주세요." : "",
  //   content: (value) =>
  //     value.length < 10 && value !== ""
  //       ? "제품 소개글은 10자 이상 입력해주세요."
  //       : "",
  //   totalQuantity: (value) =>
  //     value.toString().startsWith("0")
  //       ? "수량 첫번째 자리에 0이 입력되면 안됩니다."
  //       : "",
  //   material: (value) =>
  //     value.length < 5 && value !== ""
  //       ? "자재 소개는 5자 이상 입력해주세요."
  //       : "",
  //   price: (value) =>
  //     value.toString().startsWith("0")
  //       ? "판매 금액 첫번째 자리에 0이 입력되면 안됩니다."
  //       : "",
  // };

  const handleInputChange = (e) => {
    handleInputErr(e, validationsPost);
    onChange(e);
    console.log(userData);
  };

  const isErrMsgObjEmpty = Object.values(errMsgObj).every(
    (value) => value === "" || value === undefined
  );

  // createData 객체에 대한 체크
  const isCreateDataEmpty = Object.values(createData).every(
    (value) => value === ""
  );

  const createStore = (e) => {
    e.preventDefault();

    if (isErrMsgObjEmpty && !isCreateDataEmpty) {
      createStorePost({
        ...createData,
        memberId: userData.memberId,
      })
        .then((res) => {
          navigate("/store");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } else {
      alert("입력란을 확인해주세요!");
    }
  };

  return (
    <S.CreateFormContainer>
      <S.CreateForm onSubmit={createStore}>
        <fieldset>
          <legend>스토어 글 작성</legend>
          <p>
            필수<span>(*)</span> 판매하실 업사이클링 제품을 대표하는 중요한
            정보들을 입력해주세요.
          </p>
          <InputSection>
            <label className="input-label">
              카테고리
              <span>*</span>
            </label>
            <SelectBox
              name="sellCategoryId"
              options={CATEGORY_OPTIONS}
              onChange={handleInputChange}
            />
            {/* <p className="err-msg">{errMsg}</p> */}
          </InputSection>
          {STORE_INPUT_ATT.map((att, idx) => (
            <FundingFormSection
              key={idx}
              onChange={handleInputChange}
              errMsg={errMsgObj[att.name]}
              description={STORE_TIPS[idx]}
              {...att}
            />
          ))}
          <Button
            formFields={{ ...createData /* thumbNailImage: imgUrl */ }}
            content="등록하기"
            type="submit"
          />
        </fieldset>
      </S.CreateForm>
    </S.CreateFormContainer>
    // <div>
    //   <div id={style.AllContainer}>
    //     <div id={style.AllWrapper}>
    //       <div id={style.UpWrapper}>
    //         <div id={style.leftWrapper}>
    //           <div id={style.TitleName}>스토어 기본 정보</div>
    //           <div id={style.SubTitle}>
    //             판매하실 업사이클링 제품을 대표하는 중요한 정보들을
    //             입력해주세요.
    //           </div>
    //           <SelectBox options={CATEGORY_OPTIONS} onChange/>
    //           <div className={style.Titlebox}>
    //             <div className={style.CommonMent}>제품 제목</div>
    //             <div className={style.star}>*</div>
    //           </div>
    //           <textarea
    //             onChange={handleInputChange}
    //             ref={titleRef}
    //             placeholder="40자 이내로 입력해주세요."
    //             id={style.NameInput}
    //             maxLength="40"
    //           />
    //           <p className={style.errMsg}>{titleMsg}</p>
    //           <div className={style.Titlebox}>
    //             <div className={style.CommonMent}>대표 이미지</div>
    //             <div className={style.star}>*</div>
    //           </div>
    //           <SettingUserThumbnail
    //             setThumimgurl={setThumimgurl}
    //             ThumImgurl={handleInputChange}
    //           />
    //           <p className={style.errMsg}>{thumimgurlMsg}</p>
    //           <div className={style.Titlebox}>
    //             <div className={style.CommonMent}>제품 소개</div>
    //             <div className={style.star}>*</div>
    //           </div>
    //           <textarea
    //             onChange={handleInputChange}
    //             ref={contentRef}
    //             placeholder="500자 이내로 입력해주세요."
    //             id={style.IntroduceBox}
    //             maxLength="500"
    //           />
    //           <p className={style.errMsg}>{contentMsg}</p>
    //           <div className={style.Titlebox}>
    //             <div className={style.CommonMent}>자재 소개</div>
    //             <div className={style.star}>*</div>
    //           </div>
    //           <textarea
    //             onChange={handleInputChange}
    //             ref={materialRef}
    //             placeholder=
    //             id={style.materialInput}
    //             maxLength="100"
    //           />
    //           <p className={style.errMsg}>{materialMsg}</p>

    //           <p className={style.errMsg}>{categoryidMsg}</p>
    //           <div className={style.Titlebox}>
    //             <div className={style.CommonMent}>판매 금액</div>
    //             <div className={style.star}>*</div>
    //           </div>
    //           <input
    //             type="text"
    //             onChange={handleInputChange}
    //             ref={priceRef}
    //             onInput={blockTextInput}
    //             placeholder="숫자만 입력해주세요."
    //             id={style.AmountInput}
    //           />
    //           <p className={style.errMsg}>{priceMsg}</p>
    //           <div className={style.Titlebox}>
    //             <div className={style.CommonMent}>상세 정보 이미지</div>
    //             <div className={style.star}>*</div>
    //           </div>
    //           <SettingContentimg
    //             setContentimgurl={setContentimgurl}
    //             ContentImgurl={handleInputChange}
    //           />
    //           <p className={style.errMsg}>{contentimgurlMsg}</p>
    //           <div id={style.subMent}>
    //             아래에서 상세 정보 이미지를 미리 볼 수 있어요.
    //           </div>
    //           <button id={style.CreateButton} onClick={Create}>
    //             등록하기
    //           </button>
    //         </div>
    //
    //         </div>
    //       </div>
    //       <div id={style.downWrapper}>
    //         <div id={style.ContentimgWrapper}>
    //           {contentimgurl ? (
    //             <img
    //               className={style.FundingImg}
    //               src={contentimgurl}
    //               alt="제품 컨텐츠 이미지 미리보기"
    //             />
    //           ) : (
    //             <div>+ 이미지를 추가해주세요.</div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default StoreCreatePage;
const InputSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3rem;
  .input-label {
    display: block;
    font-size: 1.1rem;
    font-weight: bold;
    margin-right: 0.8rem;
    & > span {
      font-size: 18px;
      color: red;
      margin-left: 3px;
    }
  }
`;
