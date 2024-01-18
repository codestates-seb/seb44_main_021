import { createSlice } from "@reduxjs/toolkit";
import {
  mapFundingDetails,
  mapOrderDetails,
  mapUpcyclingDetails,
  mapSellsDetails,
} from "../../utils/mapDetails";

const initialState = {
  currentTitle: "나의 펀딩 내역",
  currentCartegory: "funding",
  details: {
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
      mapFunction: mapSellsDetails,
      tableHeader: ["날짜", "제품명", "금액"],
      detail: [],
    },
  },
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setTitle(state, action) {
      state.currentTitle = action.payload;
    },
    setCategory(state, action) {
      state.currentCartegory = action.payload;
    },
    setDetails(state, action) {
      const { category, data } = action.payload;
      if (state.details[category]) {
        state.details[category].detail = [...data];
      }
    },
  },
});

export const userDetailsActions = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
