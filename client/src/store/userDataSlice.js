import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: "",
  email: "",
  memberId: "",
  memberRole: "",
  thumbNailImage: "",
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData(state, action) {
      console.log(state);
      console.log(action.payload);
      return { ...state, ...action.payload };
    },
  },
});

export const userDataActions = userDataSlice.actions;
export const userDataReducer = userDataSlice.reducer;
