import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CATEGORY_OPTIONS } from "../../constants/options";
import useInputs from "../../hooks/useInputs";
import useErrHandler from "../../hooks/useErrHandler";
import * as S from "./StoreCreatePage.Styled";
import Button from "../../components/common/Button";
import { STORE_TIPS } from "../../constants/tips";
import { STORE_INPUT_ATT } from "../../constants/attribute";
import CreateFormSection from "../../components/create/CreateFormSection";
import SelectBox from "../../components/common/SelectBox";
import { createStorePost } from "../../api/postApi";
import { validationsPost } from "../../utils/validateInput";

const StoreCreatePage = () => {
  const { handleValidation, errMsgObj } = useErrHandler();
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

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    handleValidation(e, validationsPost);
    onChange(e);
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
      }).then((res) => {
        navigate("/store");
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
          <S.InputSection>
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
          </S.InputSection>
          {STORE_INPUT_ATT.map((att, idx) => (
            <CreateFormSection
              key={idx}
              onChange={handleInputChange}
              errMsg={errMsgObj[att.name]}
              description={STORE_TIPS[idx]}
              {...att}
            />
          ))}
          <Button
            type="submit"
            formFields={{ ...createData /* thumbNailImage: imgUrl */ }}
          >
            등록하기
          </Button>
        </fieldset>
      </S.CreateForm>
    </S.CreateFormContainer>
  );
};

export default StoreCreatePage;
