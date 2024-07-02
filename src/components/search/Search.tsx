"use client";
import { Button, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { LiaSearchSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import getAllProducts from "../../lib/getProducts";
import {
  selectProductsResults,
  selectSearch,
  setSearch as setSearchReducer,
  setSearchResults,
} from "../../store/features/products/productSlice";
import { center, def, navBarIcons } from "../../styles/styles";
import { IProduct } from "../../types/product";
import LoadingContent from "../loading/LoadingContent";

type ISearchInput = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setIsShow: Dispatch<SetStateAction<boolean>>;
  handleSearchPage: () => void;
  handleSearch: any;
};

const container = {
  initial: { opacity: 0, transition: { duration: 0.5 } },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

export default function Search() {
  const page = 1;
  const limit = 10;

  const router = useRouter();
  const SearchDivRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<any>();
  const searchTerm = useSelector(selectSearch);
  const ProductsResults = useSelector(selectProductsResults);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [count, setCount] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getProductsData = async () => {
    setProducts(null);
    setLoading(true);
    try {
      const res = await getAllProducts(limit, page, search);
      const { products, totalCount } = res;
      if (products && totalCount) {
        if (products.length === 0) {
          return setError("لا توجد منتجات");
        }

        setProducts(products);
        setCount(totalCount);
        await dispatch(setSearchReducer(search));
      }
    } catch (error: any) {
      setError(error.message || "حدث خطأ! ما برجاء المحاولة لاحقا.");
    } finally {
      setLoading(false);
    }
  };

  const resetData = async () => {
    setIsShow(false);
    setProducts(null);
    setCount(0);
    setSearch("");
    if (ProductsResults) {
      await dispatch(setSearchResults({ products: null, totalCount: null }));
    }
    if (searchTerm) {
      await dispatch(setSearchReducer(null));
    }

    router.push("/products/search-results");
  };

  const handleSearch = () => {
    setError(null);
    if (search.trim()) {
      getProductsData();
    } else {
      resetData();
    }
  };

  const handleSearchPage = () => {
    setIsShow(false);
    router.push("/products/search-results");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        SearchDivRef.current &&
        !SearchDivRef.current.contains(event.target as Node)
      ) {
        setIsShow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [SearchDivRef]);

  return (
    <>
      <button
        className={`${navBarIcons}`}
        onClick={() => setIsShow((prev) => !prev)}
      >
        <LiaSearchSolid />
      </button>
      <AnimatePresence>
        {isShow && (
          <motion.div
            variants={container}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`w-screen h-screen bg-black bg-opacity-70 backdrop-blur-sm absolute top-0 left-0 z-50 ${def.text}`}
          >
            <div
              ref={SearchDivRef}
              className={`${center.position} w-1/2 max-lg:w-[90%] flex flex-col gap-3 ${def.background} border border-sixth rounded-lg`}
            >
              <SearchInput
                search={search}
                setSearch={setSearch}
                setIsShow={setIsShow}
                handleSearch={handleSearch}
                handleSearchPage={handleSearchPage}
              />
              <div className="relative ">
                {loading && <LoadingContent isLoading={loading} />}
                {products && products.length > 0 && (
                  <Result
                    products={products}
                    count={count}
                    limit={limit}
                    handleSearchPage={handleSearchPage}
                    setIsShow={setIsShow}
                  />
                )}
                {error && (
                  <Typography
                    variant="h5"
                    className="font-Rubik w-full flex justify-center mb-5"
                  >
                    {error}
                  </Typography>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const SearchInput: React.FC<ISearchInput> = ({
  search,
  setSearch,
  setIsShow,
  handleSearch,
  handleSearchPage,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="flex justify-between border-b border-b-sixth w-full px-5 py-3">
        <p className="font-bold text-lg">بحث سريع</p>
        <Button
          variant="outlined"
          onClick={handleSearchPage}
          className="!text-lg !font-bold"
        >
          بحث متقدم
        </Button>
        <HiMiniXMark
          size={25}
          onClick={() => setIsShow((prev) => !prev)}
          className="cursor-pointer"
        />
      </div>
      <div className="w-full relative p-5">
        <input
          ref={inputRef}
          type="text"
          value={search}
          autoFocus
          placeholder="بحث"
          autoComplete="true"
          autoSave="true"
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full outline-none rounded-md py-3 px-5 border border-seventh"
        />
        <button
          onClick={handleSearch}
          className="absolute top-1/2 left-7 -translate-y-1/2 text-seventh cursor-pointer"
        >
          <IoSearch size={30} />
        </button>
      </div>
    </div>
  );
};

const Result: React.FC<{
  products: IProduct[];
  limit: number;
  count: number;
  handleSearchPage: () => void;
  setIsShow: Dispatch<SetStateAction<boolean>>;
}> = ({ products, count, limit, handleSearchPage, setIsShow }) => {
  return (
    <ul className="flex flex-col gap-2 mr-5 mb-3">
      {count > limit ? (
        <>
          {products.map((product) => (
            <li key={product._id} className="hover:text-main transition-colors">
              <Link
                href={`/products/${product._id}`}
                onClick={() => setIsShow(false)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className="relative w-9 h-9 overflow-hidden rounded-lg">
                  <Image src={product.images[0].url} alt={product.title} fill />
                </div>
                <span>{product.title}</span>
              </Link>
            </li>
          ))}
          <li className="w-full grid place-content-center">
            <Button
              variant="outlined"
              onClick={handleSearchPage}
              className="!text-lg !font-bold"
            >
              المزيد
            </Button>
          </li>
        </>
      ) : (
        products.map((product) => (
          <li key={product._id} className="hover:text-main transition-colors">
            <Link
              href={`/products/${product._id}`}
              onClick={() => setIsShow(false)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="relative w-9 h-9 overflow-hidden rounded-lg">
                <Image src={product.images[0].url} alt={product.title} fill />
              </div>
              <span>{product.title}</span>
            </Link>
          </li>
        ))
      )}
    </ul>
  );
};
