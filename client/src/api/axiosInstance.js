import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://re21.store",
  headers: {
    "Content-Type": "application/json",
    // authorization: "empty",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  // withCredentials: true,
});
