import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://re21.store",
  headers: {
    // "Content-Type": "application/json;charset=UTF-8",
    // authorization: "empty",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  // withCredentials: true,
});
