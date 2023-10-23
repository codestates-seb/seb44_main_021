import { useDispatch } from "react-redux";
import { userDataActions } from "../store/userDataSlice";

export const useGetMemberId = () => {
  const dispatch = useDispatch();

  const getMemberId = () => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      const payload = accessToken.substring(
        accessToken.indexOf(".") + 1,
        accessToken.lastIndexOf(".")
      );
      const decodedPayload = decodeURIComponent(
        atob(payload)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      const dec = JSON.parse(decodedPayload);
      dispatch(
        userDataActions.setUserData({
          memberId: dec.memberId,
        })
      );
    }
  };

  return { getMemberId };
};
