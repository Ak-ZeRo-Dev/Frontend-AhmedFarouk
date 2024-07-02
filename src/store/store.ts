import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import { authReducer } from "./features/auth/authSlice";
import { userReducer } from "./features/user/userSlice";
import adminReducer from "./features/admin/adminSlice";
import productsReducer from "./features/products/productSlice";
import layoutReducer from "./features/layout/layoutSlice";
import sidebarReducer from "./slices/sidebarSlice";

export const store = configureStore({
  devTools: true,
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    user: userReducer,
    admin: adminReducer,
    products: productsReducer,
    layout: layoutReducer,
    sidebar: sidebarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const getState = store.getState;

const refresh = async () => {
  const refreshResult = await store.dispatch(
    apiSlice.endpoints.refresh.initiate({}, { forceRefetch: true })
  );

  if (refreshResult.data) {
    const accessToken = refreshResult.data.accessToken;
    await store.dispatch(apiSlice.endpoints.loadUser.initiate(accessToken));
  }
};

(async function initializeApp() {
  // TODO add is remember and next-auth-session

  // if (localStorage.getItem("isRemember")) {
  //   setInterval(() => {
  //     refresh();
  //   }, 5 * 60 * 1000);
  // }

  refresh();
})();
