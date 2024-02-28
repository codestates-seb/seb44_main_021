import { useNavigate } from "react-router-dom";
import * as S from "./UserSelectionForm.styled";

const UserSelectionForm = () => {
  const navigate = useNavigate();

  const handleClickButton = (el) => {
    navigate(`/signup/${el}`);
  };

  return (
    <S.FormContainer>
      <h1>
        어떤 서비스를 이용하고
        <br /> 싶으신가요?
      </h1>
      <div>
        <p>쓰지 않는 물건을 펀딩하고 싶다면</p>
        <S.UserRoleBtn onClick={() => handleClickButton("users")}>
          <S.CheckIcon />
          일반 사용자로 가입
        </S.UserRoleBtn>
      </div>

      <div>
        <p>업사이클 자제를 찾고 있다면</p>
        <S.UserRoleBtn onClick={() => handleClickButton("upcycler")}>
          <S.CheckIcon />
          업사이클러로 가입
        </S.UserRoleBtn>
      </div>
    </S.FormContainer>
  );
};

export default UserSelectionForm;
