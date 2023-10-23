import { configureStore } from "@reduxjs/toolkit";
import { userDataReducer } from "./userDataSlice";
// import { bookmarkReducer } from "./bookmarkSlice";
import { userDetailsReducer } from "./userDetailsSlice";

const store = configureStore({
  reducer: {
    userData: userDataReducer,
    userDetails: userDetailsReducer,
  },
});

export default store;
