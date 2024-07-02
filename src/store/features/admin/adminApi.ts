import { apiSlice } from "../api/apiSlice";
import { setUserData } from "./adminSlice";

const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ token, limit = 20, page = 1, search }) => ({
        url: "users/admin/get-all-users",
        params: {
          limit,
          page,
          search,
        },
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getUser: builder.query({
      query: ({ token, userId }) => ({
        url: `users/admin/get-user/${userId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled;
        dispatch(setUserData(res.data.user));
      },
    }),
    block: builder.mutation({
      query: ({ token, userId, reason }) => ({
        url: `users/admin/block/${userId}`,
        method: "PATCH",
        body: { reason },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    unblock: builder.mutation({
      query: ({ token, userId }) => ({
        url: `users/admin/unblock/${userId}`,
        method: "PATCH",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateRole: builder.mutation({
      query: ({ token, userId, role }) => ({
        url: `users/admin/update-role/${userId}`,
        method: "PATCH",
        body: {
          role,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateUserEmail: builder.mutation({
      query: ({ token, userId, email, reason }) => ({
        url: `users/admin/update-user-email/${userId}`,
        method: "PATCH",
        body: { email, reason },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    verifyUpdateUserEmail: builder.mutation({
      query: ({ token, VerificationToken }) => ({
        url: `users/admin/verification`,
        method: "PATCH",
        body: { VerificationToken },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ token, userId, reason }) => {
        return {
          url: `users/admin/delete-user/${userId}`,
          method: "DELETE",
          body: { reason },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useBlockMutation,
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateRoleMutation,
  useUnblockMutation,
  useUpdateUserEmailMutation,
  useVerifyUpdateUserEmailMutation,
} = adminApi;
