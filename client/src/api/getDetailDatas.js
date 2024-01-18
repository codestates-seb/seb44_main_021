import { axiosInstance } from "./axiosInstance";
import { userDetailsActions } from "../store/slice/userDetailsSlice";

export const getDetailDatas = (memberId, dispatch, mapFunction, endpoint) => {
  axiosInstance
    .get(`/${endpoint}/member/${memberId}?page=1&size=999`)
    .then((res) => {
      dispatch(
        userDetailsActions.setDetails({
          category: endpoint,
          data: mapFunction(res.data.data),
        })
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
