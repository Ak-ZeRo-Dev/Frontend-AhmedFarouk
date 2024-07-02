import { apiSlice } from "../api/apiSlice";
import { setProductsResults, setSearch } from "./productSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ limit = 20, page = 1, search }) => ({
        url: "products/get-all-products",
        method: "GET",
        params: {
          limit,
          page,
          search,
        },
        cache: "no-store",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (arg.search) {
            dispatch(setProductsResults(data.products));
            dispatch(setSearch(arg.search));
          }
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      },
    }),
    getProduct: builder.query({
      query: ({ productId }) => ({
        url: `products/get-product/${productId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    addProduct: builder.mutation({
      invalidatesTags: ["Products"],
      query: ({ data, token }) => ({
        url: "products/add-product",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }),
    }),
    editProduct: builder.mutation({
      invalidatesTags: ["Products"],
      query: ({ productId, data, token }) => ({
        url: "products/edit-product",
        params: productId,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }),
    }),
    deleteProduct: builder.mutation({
      invalidatesTags: ["Products"],
      query: ({
        token,
        products,
      }: {
        token: string;
        products: { _id: string }[];
      }) => ({
        url: "products/delete-products",
        method: "DELETE",
        body: { products },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} = productApi;
