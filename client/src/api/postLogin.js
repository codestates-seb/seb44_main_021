import { axiosInstance } from "./axiosInstance";

export const postLogin = (data, navigate) => {
  axiosInstance
    .post("/auth/login", data)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        const authHeader = res.headers.authorization;
        const accessToken = authHeader.split(" ")[1];
        localStorage.setItem("token", accessToken);
        localStorage.setItem("login", "true");

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
      }
      navigate("/");
    })
    .catch((err) => {
      console.log(err);
      if (err.response.data === "Member not found") {
        alert("이메일 또는 비밀번호를 확인하세요.");
      }
    });
};
