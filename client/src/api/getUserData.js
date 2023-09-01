import { axiosInstance } from "./axiosInstance";
import { userDataActions } from "../store/userDataSlice";

export const getUserData = (memberId, dispatch) => {
  axiosInstance
    .get(`/members/${memberId}`)
    .then((res) => {
      const user = res.data.data;
      dispatch(
        userDataActions.setUserData({
          email: user.email,
          displayName: user.displayName,
          memberRole: user.memberRole,
          thumbNailImage: user.thumbNailImage,
        })
      );
    })
    .catch((err) => {
      console.log(err);
    });
};
