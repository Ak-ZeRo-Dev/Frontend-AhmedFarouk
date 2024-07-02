import { url } from "inspector";
import { apiSlice } from "../api/apiSlice";
import { userDeleteAccount, userUpdateEmail } from "./userSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: ({ avatar, token }) => {
        const formData = new FormData();
        formData.append("avatar", avatar);

        return {
          url: "users/me/update-avatar",
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    updateInfo: builder.mutation({
      query: ({ values, token }) => ({
        url: "users/me/update-info",
        method: "PATCH",
        body: values,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateEmail: builder.mutation({
      query: ({ values, token }) => ({
        url: "users/me/update-email",
        method: "PATCH",
        body: values,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        dispatch(userUpdateEmail({ token: result.data.verificationToken }));
      },
    }),
    verifiedEmail: builder.mutation({
      query: ({ data, token }) => ({
        url: "users/me/verify-email",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ values, token }) => ({
        url: "users/me/update-password",
        method: "PATCH",
        body: values,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteAccount: builder.query({
      query: (token) => ({
        url: "users/me/delete-account",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const result = await queryFulfilled;
        dispatch(userDeleteAccount({ token: result.data.verificationToken }));
      },
    }),
    confirmDelete: builder.mutation({
      query: ({ data, token }) => ({
        url: "users/me/confirm-delete",
        method: "DELETE",
        body: data,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    addLove: builder.mutation({
      invalidatesTags: ["Users"],
      query: ({ productId, token }) => ({
        url: `users/me/add-love/${productId}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    removeLove: builder.mutation({
      invalidatesTags: ["Users"],
      query: ({ productId, token }) => ({
        url: `users/me/remove-love/${productId}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useUpdateInfoMutation,
  useUpdateEmailMutation,
  useVerifiedEmailMutation,
  useUpdatePasswordMutation,
  useDeleteAccountQuery,
  useConfirmDeleteMutation,
  useAddLoveMutation,
  useRemoveLoveMutation,
} = userApi;
