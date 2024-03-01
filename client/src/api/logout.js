import { axiosInstance } from "./axiosInstance";

export const logout = () => {
  axiosInstance.delete("/auth/signout").then((res) => {
    localStorage.clear();
    window.location.replace("/");
    console.log(res);
  });
  // .catch((err) => {
  //   if (err.response && err.response.status === 500) {
  //     // 토큰 만료로 인한 500 Unauthorized 에러일 경우에도 로그아웃 실행
  //     localStorage.removeItem("login");
  //     localStorage.removeItem("token");
  //     window.location.replace("/");
  //   } else {
  //     console.log("Error occurred during logout:", err);
  //   }
  // });
};
