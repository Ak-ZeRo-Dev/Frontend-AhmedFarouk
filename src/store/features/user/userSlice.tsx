import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type IInitialState = {
  token: string;
  theme: string;
  width: number;
  isSmall: boolean;
};

const initialState: IInitialState = {
  token: "",
  width: 0,
  isSmall: false,
  theme: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userUpdateEmail: (state, action) => {
      state.token = action.payload.token;
    },
    userDeleteAccount: (state, action) => {
      state.token = action.payload.token;
    },
    getClientWidth: (state, action) => {
      state.width = action.payload;
      state.isSmall = action.payload < 1024;
    },
    getTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const selectVerifiedToken = (state: RootState) => state.user.token;
export const selectClientWidth = (state: RootState) => state.user.width;
export const selectIsSmall = (state: RootState) => state.user.isSmall;
export const selectTheme = (state: RootState) => state.user.theme;

export const { userUpdateEmail, userDeleteAccount, getClientWidth, getTheme } =
  authSlice.actions;

export const userReducer = authSlice.reducer;
