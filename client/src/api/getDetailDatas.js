import { axiosInstance } from "./axiosInstance";

export const getDetailDatas = (memberId, endpoint) => {
  return axiosInstance.get(`/${endpoint}/member/${memberId}?page=1&size=999`);
};
