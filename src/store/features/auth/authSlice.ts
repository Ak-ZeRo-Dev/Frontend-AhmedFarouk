import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type IInitialState = {
  token: string;
  user: IUser | null;
  isRemember: boolean;
};

const initialState: IInitialState = {
  token: "",
  user: null,
  isRemember: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = "";
      state.user = null;
    },
    userForgotPassword: (state, action) => {
      state.token = action.payload.token;
    },
    userRefresh: (state, action) => {
      state.token = action.payload.token;
    },
    loadUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;

export const {
  userRegistration,
  userLoggedIn,
  userLoggedOut,
  userForgotPassword,
  userRefresh,
  loadUser,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
