import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loadUser, userRefresh } from "../auth/authSlice";
import { store } from "../../store";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL as string,
  }),
  tagTypes: ["Users", "Products"],
  endpoints: (builder) => ({
    refresh: builder.query<refreshResponse, refreshData>({
      query: () => ({
        url: "users/refresh",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userRefresh({
              token: result.data.accessToken,
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),

    loadUser: builder.query({
      query: (accessToken: string) => ({
        url: "users/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            loadUser({
              user: result.data.user,
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useRefreshQuery, useLoadUserQuery } = apiSlice;
