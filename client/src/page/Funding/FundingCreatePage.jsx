import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import MaterialRadio from "../../components/create/MaterialRadio";
import Button from "../../components/common/Button";
import ImgUploader from "../../components/common/ImgUploader";
import useInputs from "../../hooks/useInputs";
import * as S from "./FundingCreatePage.styeld";
import { postCreate } from "../../api/postCreate";
import { useGetMemberId } from "../../hooks/useGetMemberId";

const FundingCreatePage = () => {
  const [titleMsg, setTitleMsg] = useState("");
  const [contentMsg, setContentMsg] = useState("");
  const [totalQuantityMsg, setTotalQuantityMsg] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  //날짜 최소 최대 값 변수
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 100);
  const formattedMaxDate = maxDate.toISOString().split("T")[0];

  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);

  const { getMemberId } = useGetMemberId();
  useEffect(() => {
    getMemberId();
  }, [userData.memberId]);

  const [createData, onChange] = useInputs({
    categoryId: null,
    title: "",
    content: "",
    totalQuantity: null,
    deadline: null,
  });

  const transformInputValue = (e) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(e); // 입력 필드의 값 업데이트

    // 각 입력 필드에 대한 유효성 검사
    switch (name) {
      case "title":
        if (value.length < 5) {
          setTitleMsg("펀딩명은 5자 이상이여야 합니다!");
        } else {
          setTitleMsg("");
        }
        break;
      case "content":
        if (value.length < 10) {
          setContentMsg("펀딩 소개글은 10자 이상이여야 합니다!");
        } else {
          setContentMsg("");
        }
        break;
      case "totalQuantity":
        if (value.toString().startsWith("0")) {
          setTotalQuantityMsg("수량 첫번째 자리에 0이 입력되면 안됩니다.");
        } else {
          setTotalQuantityMsg("");
        }
        break;

      // 다른 입력 필드에 대한 유효성 검사 추가
      default:
        break;
    }
  };

  const Create = () => {
    if (
      // imgUrl !== "" &&
      // createData.title.length >= 5 &&
      // createData.content.length >= 10 &&
      // createData.quantity.length > 0 &&
      // (createData.categoryId !== "") & (createData.ddate !== "")
      titleMsg &&
      contentMsg &&
      totalQuantityMsg &&
      imgUrl &&
      createData.categoryId &&
      createData.deadline
    ) {
      postCreate({
        ...createData,
        thumbNailImage: imgUrl,
        memberId: userData.memberId,
      })
        .then((res) => {
          navigate("/funding");
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } else {
      alert("필수 입력란을 확인해주세요!");
    }
  };

  console.log(createData);
  return (
    <>
      <Header />
      <S.CreateFormContainer>
        <S.CreateFormWrapper>
          <S.TitleBox>
            <h1>펀딩 글 작성</h1>
            <p>
              필수<span style={{ color: "red" }}>(*)</span> 입력란은 반드시
              입력해주세요.
            </p>
          </S.TitleBox>

          <S.InputContainer>
            <div>
              <S.Label>
                펀딩 제목<span>*</span>
              </S.Label>
              <S.StyledInput
                type="text"
                name="title"
                placeholder="40자 이내로 입력해주세요."
                onChange={handleInputChange}
              />
              <S.ErrMsg>{titleMsg}</S.ErrMsg>
            </div>
            <S.TipBox>
              <h5>TIP! 펀딩 제목은 핵심을 간결하게</h5>
              <p>
                제작 예정인 업사이클링 제품의 특징이 잘 드러나도록 키워드를
                포함해 주세요.
              </p>
            </S.TipBox>
          </S.InputContainer>

          <S.InputContainer>
            <div>
              <S.Label>
                대표 이미지<span>*</span>
              </S.Label>
              <ImgUploader setImgUrl={setImgUrl} onChange={onChange} />
            </div>
            <S.TipBox>
              <h5>TIP! 클릭할 수밖에 없는 매력적인 이미지</h5>
              <p>
                펀딩 글의 첫인상인 대표 이미지는 가장 매력적으로 보이는 사진을
                선택해 주세요.
              </p>
              <p>
                이미지가 1:1 비율로 보일 수 있으므로 이미지 내 좌우 여백이
                충분하고 중앙에 위치한 사진을 선택해 주세요.
              </p>
            </S.TipBox>
          </S.InputContainer>

          <S.InputContainer>
            <div>
              <S.Label>
                펀딩 소개<span>*</span>
              </S.Label>
              <S.TextArea
                name="content"
                placeholder="500자 이내로 입력해주세요."
                onChange={handleInputChange}
                maxLength="500"
              />
              <S.ErrMsg>{contentMsg}</S.ErrMsg>
            </div>
            <S.TipBox>
              <h5>TIP! 이것만은 알아 주었으면 하는 핵심</h5>
              <p>새롭게 탄생할 제품에 대해 쉽고 간결하게 소개해 주세요.</p>

              <p>펀딩 받기를 원하는 자재에 대해 상세히 적어주세요.</p>
            </S.TipBox>
          </S.InputContainer>

          <S.InputContainer>
            <div>
              <S.Label>
                펀딩 자재 유형<span>*</span>
              </S.Label>
              <MaterialRadio onChange={handleInputChange} />
            </div>
            <S.TipBox>
              <h5>TIP! 핵심 자재 하나만 픽</h5>
              <p>
                나중에 수정이 안되니 가장 펀딩을 원하는 자재를 하나만
                선택해주세요.
              </p>
              <p>
                여러개의 업사이클링 제품이 필요하다면 펀딩을 여러번
                등록해주세요.
              </p>
            </S.TipBox>
          </S.InputContainer>

          <S.InputContainer>
            <div>
              <S.Label>
                목표 수량<span>*</span>
              </S.Label>
              <S.StyledInput
                type="text"
                name="totalQuantity"
                placeholder="숫자만 입력해주세요."
                onChange={handleInputChange}
                // onBlur={validateTotalQuantity}
                onInput={transformInputValue}
              />
              <S.ErrMsg>{totalQuantityMsg}</S.ErrMsg>
            </div>
            <S.TipBox>
              <h5>TIP! 목표 수량은 너무 낮거나 높지 않게</h5>
              <p>
                펀딩율을 결정하는 중요한 요소니 신중하게 고민해 주세요. 추후
                수정이 불가합니다.
              </p>
            </S.TipBox>
          </S.InputContainer>

          <S.InputContainer>
            <div>
              <S.Label>
                펀딩 종료일<span>*</span>
              </S.Label>
              <S.StyledInput
                type="date"
                name="deadline"
                onChange={onChange}
                onBlur={handleInputChange}
                customStyle={false}
                min={minDate}
                max={formattedMaxDate}
              />
            </div>
            <S.TipBox>
              <h5>TIP! 100일 뒤까지는 오케이</h5>
              <p>
                목표 수량을 채울 수 있는 시간을 고민 후 선택해주세요. 추후
                수정이 불가합니다.
              </p>
            </S.TipBox>
          </S.InputContainer>

          <S.InputContainer>
            <Button
              formFields={{ ...createData, thumbNailImage: imgUrl }}
              content="등록하기"
              onClick={Create}
            />
          </S.InputContainer>
        </S.CreateFormWrapper>
      </S.CreateFormContainer>
    </>
  );
};

export default FundingCreatePage;
