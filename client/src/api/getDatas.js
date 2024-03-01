import { axiosInstance } from "./axiosInstance";

export const getDetailDatas = (memberId, endpoint) => {
  return axiosInstance.get(`/${endpoint}/member/${memberId}?page=1&size=999`);
};

export const getSellData = (sellId) => {
  return axiosInstance.get(`/sells/${sellId}`);
};

export const getUpcycleData = (upcyclingId) => {
  return axiosInstance.get(`/upcyclings/${upcyclingId}`);
};

export const getUserData = (memberId) =>
  axiosInstance.get(`/members/${memberId}`);
