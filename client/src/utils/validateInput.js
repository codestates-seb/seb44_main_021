export const validationsPost = {
  title: (value) =>
    value.length < 5 && value !== "" ? "제목은 5자 이상 입력해주세요." : "",
  content: (value) =>
    value.length < 10 && value !== ""
      ? "제품 소개글은 10자 이상 입력해주세요."
      : "",
  totalQuantity: (value) =>
    value.toString().startsWith("0")
      ? "수량 첫번째 자리에 0이 입력되면 안됩니다."
      : "",
  material: (value) =>
    value.length < 5 && value !== ""
      ? "자재 소개는 5자 이상 입력해주세요."
      : "",
  price: (value) =>
    value.toString().startsWith("0")
      ? "판매 금액 첫번째 자리에 0이 입력되면 안됩니다."
      : "",
};

export const validationsLogin = {
  title: (value) =>
    value.length < 5 && value !== "" ? "제목은 5자 이상 입력해주세요." : "",
  content: (value) =>
    value.length < 10 && value !== ""
      ? "제품 소개글은 10자 이상 입력해주세요."
      : "",
  totalQuantity: (value) =>
    value.toString().startsWith("0")
      ? "수량 첫번째 자리에 0이 입력되면 안됩니다."
      : "",
  material: (value) =>
    value.length < 5 && value !== ""
      ? "자재 소개는 5자 이상 입력해주세요."
      : "",
  price: (value) =>
    value.toString().startsWith("0")
      ? "판매 금액 첫번째 자리에 0이 입력되면 안됩니다."
      : "",
};

export const validationsSignup = {
  displayName: (value) =>
    !NAME_REGEX.test(value) ? "특수 문자 제외 2자 ~ 6자를 입력하세요." : "",
  email: (value) =>
    !EMAIL_REGEX.test(value) ? "이메일 형식에 맞지 않습니다." : "",
  password: (value) =>
    !PWD_REGEX.test(value)
      ? "숫자, 문자, 특수문자 포함 8자 이상 입력하세요."
      : "",
};

export const valEditProfile = {
  displayName: (value) =>
    !NAME_REGEX.test(value) ? "특수 문자 제외 2자 ~ 6자를 입력하세요." : "",
  password: (value) =>
    !PWD_REGEX.test(value)
      ? "숫자 ,문자, 특수문자 포함 8자 이상 입력하세요."
      : "",
  verifyPwd: (value) =>
    value.toString().startsWith("0")
      ? "수량 첫번째 자리에 0이 입력되면 안됩니다."
      : "",
};
export const isEmpty = (obj) => {
  return Object.values(obj).every(
    (value) => value === "" || value === undefined
  );
};

// signup regex
const NAME_REGEX = /^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,6}$/;
const EMAIL_REGEX = /^[A-Za-z0-9.\-_]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
export const PWD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,24}$/;
