import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentTitle: "나의 펀딩 내역",
  currentCategory: "funding",
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setTitle(state, action) {
      state.currentTitle = action.payload;
    },
    setCategory(state, action) {
      state.currentCategory = action.payload;
    },
  },
});

export const userDetailsActions = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
