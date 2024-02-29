import React, { useCallback } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useErrHandler from "../../hooks/useErrHandler";
import useInputs from "../../hooks/useInputs";
import { validationsPost } from "../../utils/validateInput";
import { patchEditSell } from "../../api/editApi";
import { getSellData } from "../../api/getDatas";
import {
  GridWrapper,
  MaxWidthContainer,
  ThumbnailImg,
} from "../../styles/CommonStyle";
import TextArea from "../../components/common/TextArea";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const StoreEditPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { handleValidation, errMsgObj } = useErrHandler();

  const sellId = pathname.split("/").pop();

  const [editData, onChange, setEditData] = useInputs({});
  console.log(editData);

  const handleInputChange = useCallback((e) => {
    handleValidation(e, validationsPost);
    onChange(e);
  }, []);

  useEffect(() => {
    getSellData(sellId).then((response) => {
      setEditData((prevData) => ({ ...prevData, ...response.data }));
    });
  }, []);

  const handleSavaEdit = () => {
    const { title, content, totalQuantity } = editData;
    patchEditSell(sellId, {
      upcyclingId: sellId,
      title: title,
      content: content,
      totalQuantity: totalQuantity,
    }).then(() => {
      navigate(`/storedetail/${sellId}`);
    });
  };

  return (
    <MaxWidthContainer>
      <GridWrapper>
        <LeftArea>
          <ThumbnailImg
            src={editData.thumbNailImage}
            alt="제품 대표 이미지 미리보기"
          />

          <MaterierBox>
            <p>판매자가 작성한 제품에 사용된 업사이클링 품목입니다.</p>
            <p>{editData.material}</p>
          </MaterierBox>
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
          <p className="Edit__errMsg">{errMsgObj.title}</p>

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
            카테고리는 <span>{editData.sellCategoryName}</span>로
            선택하셨습니다.
          </InfoText>
          <InfoText>
            가격은 <span>{editData.price}</span>원으로 선택하셨습니다.
          </InfoText>
          <Button onClick={handleSavaEdit}>수정하기</Button>
        </RightArea>
      </GridWrapper>

      <InfoWrapper>
        <div className="item-info">
          <h2>제품 상세 정보</h2>
          <img src={editData.contentImage} alt="img" />
        </div>
        <p className="footer">IEUN CO.</p>
      </InfoWrapper>
    </MaxWidthContainer>
  );
};

export default StoreEditPage;
const LeftArea = styled.div`
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
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .item-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 50px;
    h2 {
      color: #6e934d;
      margin: 10px 0 50px 0;
      font-size: 22px;
      font-weight: bold;
      border-bottom: 1px solid rgb(243, 244, 246);
      padding-bottom: 20px;
    }
  }
  .footer {
    width: 100vw;
    margin-top: 20px;
    background-color: #6e934d;
    text-align: center;
    padding: 1rem;
    color: #fff;
    font-size: 20px;
  }
`;

const MaterierBox = styled.div`
  background-color: rgb(249, 250, 251);
  border-radius: 5px;
  padding: 1rem;
  & > p {
    font-size: 12px;
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
