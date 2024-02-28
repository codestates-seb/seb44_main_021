import { useCallback, useState } from "react";
import { detailsInfo } from "../constants/detailsInfo";

const useGetUserDetails = () => {
  const [details, setDetails] = useState(detailsInfo);

  const getUserDetails = useCallback((category, data) => {
    setDetails((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        detail: [...prev[category].mapFunction(data)],
      },
    }));
  }, []);

  return { details, getUserDetails };
};

export default useGetUserDetails;
