import { createSlice } from "@reduxjs/toolkit";
import { ILayout, ISocial } from "../../../types/layout";
import { RootState } from "../../store";

type IInitialState = {
  data: ILayout[];
  logo: any;
  images: any;
  info: any;
  about: any;
  social: any;
  categories: any;
};

const initialState: IInitialState = {
  data: [],
  logo: {},
  images: {},
  info: {},
  about: {},
  social: [],
  categories: [],
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setLogo: (state) => {
      if (state.data.length > 0) {
        state.logo = state.data.find((ele) => ele.type === "logo")?.logo;
      }
    },
    setSocial: (state) => {
      state.social = state.data.find((ele) => ele.type === "social")?.social;
    },
    setCategories: (state) => {
      state.categories = state.data.find(
        (ele) => ele.type === "categories"
      )?.categories;
    },
    setImages: (state) => {
      state.images = state.data.find((ele) => ele.type === "images");
    },
    setInfo: (state) => {
      state.info = state.data.find((ele) => ele.type === "information")?.info;
    },
    setAbout: (state) => {
      state.about = state.data.find((ele) => ele.type === "about")?.about;
    },
  },
});

export const selectData = (state: RootState) => state.layout.data;
export const selectLogo = (state: RootState) => state.layout.logo;
export const selectAbout = (state: RootState) => state.layout.about;
export const selectInfo = (state: RootState) => state.layout.info;
export const selectCategories = (state: RootState) => state.layout.categories;
export const selectContactUsImage = (state: RootState) =>
  state.layout.images?.contactUs?.url;
export const selectLoginImage = (state: RootState) =>
  state.layout.images?.login?.url;
export const selectRegisterImage = (state: RootState) =>
  state.layout.images?.register?.url;
export const selectVerificationImage = (state: RootState) =>
  state.layout.images?.verification?.url;
export const selectUserBackground = (state: RootState) =>
  state.layout.images?.userBackground?.url;
export const selectSocial = (state: RootState) => state.layout.social;

export const {
  setData,
  setAbout,
  setImages,
  setInfo,
  setLogo,
  setSocial,
  setCategories,
} = layoutSlice.actions;
export default layoutSlice.reducer;
