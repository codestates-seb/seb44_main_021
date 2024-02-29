import { axiosInstance } from "./axiosInstance";

export const patchEditUpcycle = (upcyclingId, data) => {
  return axiosInstance.patch(`/upcyclings/${upcyclingId}`, data);
};

export const patchEditSell = (sellId, data) => {
  return axiosInstance.patch(`/sells/${sellId}`, data);
};
