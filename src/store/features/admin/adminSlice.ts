import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    searchQuery: "",
    user: {},
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const selectSearchQuery = (state: RootState) => state.admin.searchQuery;
export const selectAdminUser = (state: RootState) => state.admin.user;
export const { setSearchQuery, setUserData } = adminSlice.actions;
export default adminSlice.reducer;
