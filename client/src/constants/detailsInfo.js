import {
  mapFundingDetails,
  mapOrderDetails,
  mapUpcyclingDetails,
  mapSellsDetails,
} from "../utils/mapDetails";

export const detailsInfo = {
  funding: {
    title: "나의 펀딩 내역",
    category: "funding",
    tableHeader: ["날짜", "펀딩명", "수량"],
    mapFunction: mapFundingDetails,
    detail: [],
  },
  orders: {
    title: "나의 주문 내역",
    category: "orders",
    tableHeader: ["날짜", "제품명", "수량", "금액"],
    mapFunction: mapOrderDetails,
    detail: [],
  },
  upcyclings: {
    title: "나의 펀딩 등록 내역",
    category: "upcyclings",
    tableHeader: ["날짜", "펀딩명", "펀딩기한"],
    mapFunction: mapUpcyclingDetails,
    detail: [],
  },
  sells: {
    title: "나의 제품 등록 내역",
    category: "sells",
    tableHeader: ["날짜", "제품명", "금액"],
    mapFunction: mapSellsDetails,
    detail: [],
  },
};
