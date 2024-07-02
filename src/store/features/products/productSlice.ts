import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../../types/product";
import { RootState } from "../../store";

type IInitialState = {
  productsResults: IProduct[] | null;
  search: "";
  totalCount: number;
};

const initialState: IInitialState = {
  productsResults: [],
  search: "",
  totalCount: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      if (action.payload && action.payload.products) {
        state.productsResults = action.payload.products;
        state.totalCount = action.payload.totalCount;
      }
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const selectProductsResults = (state: RootState) =>
  state.products.productsResults;
export const selectSearch = (state: RootState) => state.products.search;
export const selectTotalCount = (state: RootState) => state.products.totalCount;

export const { setSearchResults, setSearch } = productSlice.actions;
export default productSlice.reducer;
