import React, { useCallback } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RadioGroup from "../../components/common/RadioGroup";
import { MATERIAL_OPTIONS } from "../../constants/options";
import useInputs from "../../hooks/useInputs";
import useErrHandler from "../../hooks/useErrHandler";
import { validationsPost } from "../../utils/validateInput";
import TextArea from "../../components/common/TextArea";
import Input from "../../components/common/Input";
import styled from "styled-components";
import {
  GridWrapper,
  MaxWidthContainer,
  ThumbnailImg,
} from "../../styles/CommonStyle";
import Button from "../../components/common/Button";
import { patchEditUpcycle } from "../../api/editApi";
import { getUpcycleData } from "../../api/getDatas";

const FundingEditPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { handleValidation, errMsgObj } = useErrHandler();

  const upcyclingId = pathname.split("/").pop();

  const [editData, onChange, setEditData] = useInputs({});

  const handleInputChange = useCallback((e) => {
    handleValidation(e, validationsPost);
    onChange(e);
  }, []);

  useEffect(() => {
    getUpcycleData(upcyclingId).then((response) => {
      setEditData((prevData) => ({ ...prevData, ...response.data.data }));
    });
  }, []);

  const handleSavaEdit = () => {
    const { title, content, totalQuantity } = editData;
    patchEditUpcycle(upcyclingId, {
      upcyclingId: upcyclingId,
      title: title,
      content: content,
      totalQuantity: totalQuantity,
    }).then(() => {
      navigate(`/fundingdetail/${upcyclingId}`);
    });
  };

  return (
    <MaxWidthContainer>
      <GridWrapper>
        <LeftArea>
          <ThumbnailImg
            src={editData.thumbNailImage}
            alt="펀딩 이미지 미리보기"
          />

          <RadioGroup
            name="categoryId"
            options={MATERIAL_OPTIONS}
            onChange={onChange}
          />
          <p>"{editData.categoryName}" 자재를 선택하셨습니다.</p>
        </LeftArea>

        <RightArea>
          <Input
            variant="outline"
            name="title"
            placeholder="40자 이내로 입력해주세요."
            defaultValue={editData.title}
            maxLength="40"
            onChange={handleInputChange}
          />
          <p className="Edit__errMsg">{errMsgObj.content}</p>
          <TextArea
            boxSize="25rem"
            placeholder="500자 이내로 입력해주세요."
            name="content"
            defaultValue={editData.content}
            maxLength="500"
            onChange={handleInputChange}
          />
          <p className="Edit__errMsg">{errMsgObj.content}</p>

          <InfoText>
            마감일은 <span>{editData.deadline}</span>로 선택하셨습니다.
          </InfoText>
          <InfoText>
            수량은 <span>{editData.totalQuantity}</span>개 선택하셨습니다.
          </InfoText>
          <Button onClick={handleSavaEdit}>수정하기</Button>
        </RightArea>
      </GridWrapper>
    </MaxWidthContainer>
  );
};

export default FundingEditPage;

const LeftArea = styled.div`
  & > div {
    margin: 1rem 0;
  }
  & > p {
    margin: 1rem 0;
    font-size: 0.875rem;
  }
`;

const RightArea = styled.div`
  & > button {
    width: 100%;
  }
  .Edit__errMsg {
    margin-top: 5px;
    font-size: 14px;
    color: rgb(221, 106, 106);
  }
`;

const InfoText = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  margin: 10px 0;
  & > span {
    font-size: 1.3rem;
    font-weight: 600;
    color: #6e934d;
    margin: 0 2px;
  }
`;
