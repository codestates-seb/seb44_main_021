import { axiosInstance } from "./axiosInstance";

export const logout = () => {
  axiosInstance
    .delete("/auth/signout", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // 저장한 토큰 값을 사용하여 헤더 설정
      },
    })
    .then((res) => {
      localStorage.removeItem("login");
      window.location.reload("/");
      console.log(res);
    })
    .catch((err) => {
      if (err.response && err.response.status === 500) {
        // 토큰 만료로 인한 500 Unauthorized 에러일 경우에도 로그아웃 실행
        localStorage.removeItem("login");
        window.location.reload("/");
      } else {
        console.log("Error occurred during logout:", err);
      }
    });
};
