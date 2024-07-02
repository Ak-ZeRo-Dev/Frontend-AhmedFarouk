import { apiSlice } from "../api/apiSlice";
import {
  userForgotPassword,
  userLoggedIn,
  userLoggedOut,
  userRegistration,
} from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterData>({
      invalidatesTags: ["Users"],
      query: (data) => ({
        url: "users/register",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userRegistration({
              token: result.data.verificationToken,
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),

    verification: builder.mutation<verificationResponse, verificationData>({
      invalidatesTags: ["Users"],
      query: ({ verificationToken, clientCode }) => ({
        url: "users/verification",
        method: "POST",
        body: { verificationToken, clientCode: Number(clientCode) },
      }),
    }),

    login: builder.mutation<loginResponse, loginData>({
      invalidatesTags: ["Users"],
      query: (data) => ({
        url: "users/login",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              token: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),

    forgotPassword: builder.mutation<
      forgotPasswordResponse,
      forgotPasswordData
    >({
      invalidatesTags: ["Users"],
      query: ({ email, newPassword }) => ({
        url: "users/forgot-password",
        method: "POST",
        body: { email, newPassword },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userForgotPassword({
              token: result.data.forgotToken,
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),

    confirmChangedPassword: builder.mutation<
      confirmChangedPasswordResponse,
      confirmChangedPasswordData
    >({
      invalidatesTags: ["Users"],
      query: ({ forgotToken, clientCode }) => ({
        url: "users/confirm-changed-password",
        method: "POST",
        body: { forgotToken, clientCode },
        credentials: "include",
      }),
    }),

    logout: builder.mutation({
      query: ({ accessToken }) => ({
        url: "users/logout",
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error) {
          console.error(error);
        }
      },
    }),

    socialAuth: builder.mutation({
      invalidatesTags: ["Users"],
      query: (data) => ({
        url: "users/social-auth",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              token: result.data.accessToken,
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

export const {
  useRegisterMutation,
  useVerificationMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useConfirmChangedPasswordMutation,
  useLogoutMutation,
  useSocialAuthMutation,
} = authApi;
