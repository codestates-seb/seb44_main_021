import { axiosInstance } from "./axiosInstance";

export const getUserData = (memberId) =>
  axiosInstance.get(`/members/${memberId}`);
