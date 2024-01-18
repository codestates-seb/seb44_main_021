import { axiosInstance } from "./axiosInstance";

export const verifyPwd = (data) =>
  axiosInstance.post(`/members/verifiedpassword`, data);

export const patchInfo = (id, data) =>
  axiosInstance.patch(`/members/${id}`, data);
