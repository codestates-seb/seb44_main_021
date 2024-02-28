import { axiosInstance } from "./axiosInstance";

export const postLogin = (data) => {
  return axiosInstance.post("/auth/login", data);
};
export const postSignup = (data) => {
  return axiosInstance.post("/members/signup", data);
};

export const verifyPwd = (data) =>
  axiosInstance.post(`/members/verifiedpassword`, data);

export const patchInfo = (id, data) =>
  axiosInstance.patch(`/members/${id}`, data);
