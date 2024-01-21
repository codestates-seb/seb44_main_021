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
      return { ...state, ...action.payload };
    },
  },
});

export const userDataActions = userDataSlice.actions;
export default userDataSlice.reducer;
