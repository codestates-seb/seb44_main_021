import { axiosInstance } from "./axiosInstance";

export const createFundingPost = (data) => {
  return axiosInstance.post("/upcyclings", data);
};

export const createStorePost = (data) => {
  return axiosInstance.post("/sells", data);
};

export const fundingPost = (data) => {
  return axiosInstance.post("/funding", data);
};
