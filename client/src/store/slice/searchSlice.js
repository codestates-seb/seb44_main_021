import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchWord: "",
};

export const searchSlice = createSlice({
  name: "Search",
  initialState,
  reducers: {
    setSearchWord: (state, actions) => {
      state.searchWord = actions.payload;
    },
  },
});

export const { setSearchWord } = searchSlice.actions;

export default searchSlice.reducer;
