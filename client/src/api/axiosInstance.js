import axios from "axios";
import { validateToken } from "../utils/validateToken";

export const axiosInstance = axios.create({
  baseURL: "https://re21.store",
  headers: {
    "Content-Type": "application/json",
    // authorization: "empty",
  },
});
axiosInstance.interceptors.request.use((config) => {
  // const newConfig = { ...config };
  const accessToken = localStorage.getItem("token");
  // if (accessToken) {
  config.headers.Authorization = `Bearer ${accessToken}`;
  // }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (validateToken() === "Access Token Expired") {
      return (
        alert("토큰이 만료되었습니다. 다시 로그인해 주시길 바랍니다."),
        localStorage.clear(),
        (window.location.href = "/login"),
        Promise.reject("Access Token Expired")
      );
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
