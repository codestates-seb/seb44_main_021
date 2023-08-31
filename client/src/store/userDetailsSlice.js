import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTitle: "나의 펀딩 내역",
  currentCartegory: "funding",
  details: {
    funding: {
      tableHeader: ["날짜", "펀딩명", "수량"],
      detail: [],
    },
    orders: {
      tableHeader: ["날짜", "제품명", "수량", "금액"],
      detail: [],
    },
    upcyclings: {
      tableHeader: ["날짜", "펀딩명", "펀딩기한"],
      detail: [],
    },

    sells: {
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
export const userDetailsReducer = userDetailsSlice.reducer;
