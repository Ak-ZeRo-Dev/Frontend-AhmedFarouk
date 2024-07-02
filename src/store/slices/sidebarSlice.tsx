import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    open: true,
  },
  reducers: {
    getOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});
export const selectIsOpen = (state: RootState) => state.sidebar.open;
export const { getOpen } = sidebarSlice.actions;
export default sidebarSlice.reducer;
