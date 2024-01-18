import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./slice/userDataSlice";
import userDetailsReducer from "./slice/userDetailsSlice";
import searchReducer from "./slice/searchSlice";

const store = configureStore({
  reducer: {
    userData: userDataReducer,
    userDetails: userDetailsReducer,
    search: searchReducer,
  },
});

export default store;
