import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../components/common/Button";
import useInputs from "../../hooks/useInputs";
import * as S from "./FundingCreatePage.styeld";
import { createFundingPost } from "../../api/createPost";
import CreateFormSection from "../../components/create/CreateFormSection";
import useErrHandler from "../../hooks/useErrHandler";
import { FUNDING_INPUT_ATT } from "../../constants/attribute";
import { FUNDING_TIPS } from "../../constants/tips";
import { isEmpty, validationsPost } from "../../utils/validateInput";
import React, { useCallback } from "react";

const FundingCreatePage = () => {
  const { handleValidation, errMsgObj } = useErrHandler();
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();

  const [createData, onChange] = useInputs({
    categoryId: null,
    title: null,
    content: null,
    totalQuantity: null,
    deadline: null,
    thumbNailImage: null,
  });
  // console.log(createData);
  const handleInputChange = useCallback((e) => {
    handleValidation(e, validationsPost);
    onChange(e);
  }, []);

  const createFunding = (e) => {
    e.preventDefault();
    const creationCondition = isEmpty(errMsgObj) && !isEmpty(createData);

    if (creationCondition) {
      createFundingPost({
        ...createData,
        memberId: userData.memberId,
      })
        .then((res) => {
          navigate("/funding");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("입력란을 확인해주세요!");
    }
  };
  return (
    <S.CreateFormContainer>
      <S.CreateForm onSubmit={createFunding}>
        <fieldset>
          <legend>펀딩 글 작성</legend>
          <p>
            필수<span>(*)</span> 입력란은 반드시 입력해주세요.
          </p>
          {FUNDING_INPUT_ATT.map((att, idx) => (
            <CreateFormSection
              key={idx}
              onChange={handleInputChange}
              errMsg={errMsgObj[att.name]}
              description={FUNDING_TIPS[idx]}
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

export default React.memo(FundingCreatePage);
