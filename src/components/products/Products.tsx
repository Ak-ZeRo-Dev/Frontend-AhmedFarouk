"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

import { Pagination, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/navigation";
import { useLoadUserQuery } from "../../store/features/api/apiSlice";
import { selectToken, selectUser } from "../../store/features/auth/authSlice";
import "../../styles/products.css";
import { IProduct } from "../../types/product";
import ProductsCards from "../images/ProductsCards";
import LoadingCircle from "../loading/LoadingCircle";
import Love from "./Love";
import "./style.css";
import { useGetAllProductsQuery } from "../../store/features/products/productApi";
import LoadingContent from "../loading/LoadingContent";
import { useTheme } from "next-themes";
import { selectCategories } from "../../store/features/layout/layoutSlice";

type Props = {};
export default function Products({}: Props) {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const categories: string[] = useSelector(selectCategories);

  const { theme } = useTheme();

  const [limit, setLimit] = useState<number>(20);
  const [page, setPage] = useState<number>(1);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);

  const { refetch: refetchUser } = useLoadUserQuery(token);
  const {
    data,
    error,
    isSuccess,
    isLoading,
    isError,
    refetch: refetchProducts,
  } = useGetAllProductsQuery({
    limit,
    page,
  });

  const products = allProducts?.map((product: IProduct) => (
    <ProductCard
      product={product}
      user={user}
      token={token}
      refetchProducts={refetchProducts}
      refetchUser={refetchUser}
      key={product._id}
    />
  ));

  const productsStyle =
    products.length > 0
      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
      : "place-content-center";

  const handelClick = (category: string) => {
    const filteredProducts = data?.products.filter((product: IProduct) => {
      return product.categories.includes(category);
    });
    setAllProducts(filteredProducts);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    if (data) {
      setAllProducts(data.products);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error(
        (error as any).data.message || "حدث خطأ ما، يرجى المحاولة مرة أخرى."
      );
    }
  }, [isError, error]);
  return (
    <section className="container min-h-screen pt-20 relative px-10 w-full mb-2 mx-auto">
      {isLoading && <LoadingContent isLoading={isLoading} />}
      <nav className="mb-10">
        <ul className=" flex gap-5">
          {categories.map((ele) => (
            <li
              key={ele}
              onClick={() => handelClick(ele)}
              className="cursor-pointer"
            >
              {ele}
            </li>
          ))}
        </ul>
      </nav>
      {isSuccess && data && (
        <>
          <div
            className={`w-full min-h-[calc(100vh-165px)] grid ${productsStyle}`}
          >
            {products.length > 0 ? (
              products
            ) : (
              <Typography variant="h4" className="font-Rubik">
                لا توجد منتجات
              </Typography>
            )}
          </div>
          <Stack
            spacing={2}
            className="!w-full !grid !place-content-center mt-10"
          >
            <Pagination
              count={Math.ceil(data.totalCount / limit)}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              siblingCount={1}
              boundaryCount={1}
              sx={{
                "& .MuiPagination-ul": {
                  flexDirection: "row-reverse",
                  transform: "scaleX(-1)",
                },
                "& .MuiPagination-ul li button": {
                  color: theme === "dark" ? "white" : "black",
                },
                "& .MuiPagination-ul li .MuiPaginationItem-page": {
                  transform: "scaleX(-1)",
                },
              }}
            />
          </Stack>
        </>
      )}
    </section>
  );
}

const ProductCard: React.FC<{
  product: IProduct;
  user: IUser | null;
  token: string;
  refetchProducts: () => void;
  refetchUser: () => void;
}> = ({ product, user, token, refetchUser, refetchProducts }) => {
  const {
    _id,
    title,
    images,
    price,
    rating: { rate },
  } = product;
  return (
    <div className="w-full h-80 rounded-lg bg-fifth overflow-hidden relative shadow-md hover:-translate-y-2 hover:drop-shadow-xl transition-all duration-300">
      <Love
        user={user}
        token={token}
        productId={_id}
        refetchProducts={refetchProducts}
        refetchUser={refetchUser}
      />
      <ProductsCards images={images} title={title} />
      <div className="p-3">
        <h2 title={title} className="overflow-hidden h-6">
          <Link href={`products/${_id}`}>{title}</Link>
        </h2>
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-[0.25rem]">
            {rate > 0 &&
              Array.from({ length: Math.floor(rate) }).map((_, index) => (
                <FaStar fill="#fca01c" key={index} />
              ))}
            {+rate.toString().split(".")[1] > 5 && (
              <FaStarHalfAlt direction={"rtl"} fill="#fca01c" />
            )}
          </div>
          {price && <p>{price} £</p>}
        </div>
      </div>
    </div>
  );
};
