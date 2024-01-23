import { useCallback, useState } from "react";
import {
  mapFundingDetails,
  mapOrderDetails,
  mapUpcyclingDetails,
  mapSellsDetails,
} from "../utils/mapDetails";

const detailsInfo = {
  funding: {
    mapFunction: mapFundingDetails,
    detail: [],
  },
  orders: {
    mapFunction: mapOrderDetails,
    detail: [],
  },
  upcyclings: {
    mapFunction: mapUpcyclingDetails,
    detail: [],
  },
  sells: {
    mapFunction: mapSellsDetails,
    detail: [],
  },
};

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
