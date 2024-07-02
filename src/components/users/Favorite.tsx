import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useGetAllProductsQuery } from "../../store/features/products/productApi";
import { IProduct } from "../../types/product";
import Products from "../products/Products";

type Props = {
  user: IUser;
};

const PAGE_SIZE = 20;

export default function Favorite({ user }: Props) {
  const { love } = user;

  // Fetch products using query
  const { data, error, isLoading, refetch, isSuccess, isError } =
    useGetAllProductsQuery({});

  // Filter products based on user's favorites
  const favoriteProducts =
    data?.products.filter((product: IProduct) => love.includes(product._id)) ||
    [];

  // Calculate total pages for pagination
  const totalPages = Math.ceil(favoriteProducts.length / PAGE_SIZE) || 1;

  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      {/* Render products if available */}
      {favoriteProducts.length > 0 ? (
        <>
          <Products
            products={favoriteProducts}
            error={error}
            isLoading={isLoading}
            refetchProducts={refetch}
            isSuccess={isSuccess}
            isError={isError}
          />
          {/* Render pagination */}
          <Stack spacing={2}>
            <Pagination count={totalPages} color="primary" />
          </Stack>
        </>
      ) : (
        // Render message when no favorite products found
        <p className="w-full h-full grid place-content-center text-xl font-Rubik font-bold">
          لا يوجد منتجات
        </p>
      )}
    </div>
  );
}
