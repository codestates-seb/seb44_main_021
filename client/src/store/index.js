import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./userDataSlice";
// import { bookmarkReducer } from "./bookmarkSlice";
import userDetailsReducer from "./userDetailsSlice";
import searchReducer from "./searchSlice";
const store = configureStore({
  reducer: {
    userData: userDataReducer,
    userDetails: userDetailsReducer,
    search: searchReducer,
  },
});

export default store;
