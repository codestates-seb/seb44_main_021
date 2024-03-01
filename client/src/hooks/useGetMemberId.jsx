import { useDispatch } from "react-redux";
import { userDataActions } from "../store/slice/userDataSlice";
import { useCallback } from "react";

export const useGetMemberId = () => {
  const dispatch = useDispatch();
  const getMemberId = useCallback(() => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      const decodingToken = JSON.parse(atob(accessToken.split(".")[1]));

      dispatch(
        userDataActions.setUserData({
          memberId: decodingToken.memberId,
        })
      );
    }
  }, []);

  return { getMemberId };
};
