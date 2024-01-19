import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isUnmount: true,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenModal: (state) => {
      // const { modalType } = actions.payload;
      state.isOpen = true;
    },
    setCloseModal: (state) => {
      state.isOpen = false;
    },
    setUnmount: (state, action) => {
      state.isUnmount = action.payload;
    },
  },
});

export const { setOpenModal, setCloseModal, setUnmount } = modalSlice.actions;

export default modalSlice.reducer;
