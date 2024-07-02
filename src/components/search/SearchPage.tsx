"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  selectProductsResults,
  selectSearch,
  setSearchResults,
  setSearch as setSearchReducer,
  selectTotalCount,
} from "../../store/features/products/productSlice";
import { useSelector } from "react-redux";
import { IProduct } from "../../types/product";
import { Button, Pagination, Stack, Typography } from "@mui/material";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import LoadingContent from "../loading/LoadingContent";
import getAllProducts from "../../lib/getProducts";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";

type ISearchInput = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  handleSearch: () => void;
};
type IResults = {
  products: IProduct[];
  count: number;
  limit: number;
  page: number;
  getProductsData: (page: number) => void;
  setPage: Dispatch<SetStateAction<number>>;
};

export default function SearchPage() {
  const limit = 5;
  const [page, setPage] = useState<number>(1);

  const dispatch = useDispatch<any>();
  const searchTerm = useSelector(selectSearch);
  const ProductsResults = useSelector(selectProductsResults);
  const totalCount = useSelector(selectTotalCount);

  const [search, setSearch] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [products, setProducts] = useState<IProduct[] | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getProductsData = async (page: number) => {
    setProducts(null);
    setLoading(true);
    try {
      const res = await getAllProducts(limit, page, search);
      const { products, totalCount } = res;
      if (!products) {
        return setError("لا توجد منتجات");
      }
      setProducts(products);
      setCount(totalCount);
      await dispatch(setSearchResults({ products, totalCount }));
      await dispatch(setSearchReducer(search));
    } catch (error: any) {
      setError(error.message || "حدث خطأ! ما برجاء المحاولة لاحقا.");
    } finally {
      setLoading(false);
    }
  };

  const resetData = async () => {
    setProducts(null);
    setCount(0);
    setSearch("");

    if (ProductsResults) {
      await dispatch(setSearchResults({ products: null, totalCount: null }));
    }
    if (searchTerm) {
      await dispatch(setSearchReducer(null));
    }
  };

  const handleSearch = () => {
    setError(null);
    setPage(1);
    if (search.trim()) {
      getProductsData(page);
    } else {
      resetData();
    }
  };

  useEffect(() => {
    if (searchTerm) {
      setPage(1);
      setSearch(searchTerm);
      getProductsData(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <section className="container pt-main min-h-screen mx-auto relative">
      <SearchInput
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading && <LoadingContent isLoading={loading} />}
      {error && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Typography variant="h4" className="font-Rubik !font-bold">
            {error}
          </Typography>
        </div>
      )}
      <div className="relative w-full mt-10">
        {products && products.length > 0 && (
          <Results
            products={products}
            count={count}
            limit={limit}
            page={page}
            setPage={setPage}
            getProductsData={getProductsData}
          />
        )}
      </div>
    </section>
  );
}

const SearchInput: React.FC<ISearchInput> = ({
  search,
  setSearch,
  handleSearch,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full h-11 mt-5 lg:px-10 flex items-center justify-between gap-3">
      <input
        ref={inputRef}
        type="text"
        value={search}
        autoFocus
        placeholder="بحث"
        autoComplete="true"
        autoSave="true"
        onKeyPress={handleKeyPress}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full h-full bg-transparent outline-none border border-secondaryLight dark:border-secondaryLight shadow-sm focus:border-main py-2 px-5 rounded-md "
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        className="!h-full !px-6 !rounded-md  !shadow-sm !border-main !text-lg !font-bold"
      >
        بحث
      </Button>
    </div>
  );
};

const Results: React.FC<IResults> = ({
  products,
  count,
  limit,
  page,
  setPage,
  getProductsData,
}) => {
  const { theme } = useTheme();
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    getProductsData(value);
  };
  return (
    <div className="w-full">
      <ul className="w-full min-h-[calc(100vh-250px)] flex flex-col gap-5 px-10">
        {products.map((product) => (
          <li
            key={product._id}
            className="flex gap-3 w-full items-center rounded-lg p-4 border border-secondaryLight dark:border-secondaryLight hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300 shadow-sm"
          >
            <div className="relative flex-[0.25] h-20 overflow-hidden rounded-lg">
              <Image src={product.images[0].url} alt={product.title} fill />
            </div>
            <div className="flex flex-col gap-1 flex-[4]">
              <Link
                href={`/products/${product._id}`}
                title={product.title}
                className="flex items-center gap-3 cursor-pointer hover:text-main transition-colors text-wrap text-base font-bold"
              >
                {product.title}
              </Link>
              <p title={product.description} className="text-wrap">
                {product.description.slice(0, 350)}...
              </p>
            </div>
          </li>
        ))}
      </ul>
      <Stack
        spacing={2}
        className="!w-full !grid !place-content-center mt-10 mb-4"
      >
        <Pagination
          count={Math.ceil(count / limit)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
          siblingCount={1}
          boundaryCount={1}
          onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
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
    </div>
  );
};
