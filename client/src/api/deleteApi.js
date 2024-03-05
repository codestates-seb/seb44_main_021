import { axiosInstance } from "./axiosInstance";

export const deleteSell = (id) => {
  return axiosInstance.delete(`/sells/${id}`);
};

export const deleteUpcycle = (id) => {
  return axiosInstance.delete(`/upcyclings/${id}`);
};
