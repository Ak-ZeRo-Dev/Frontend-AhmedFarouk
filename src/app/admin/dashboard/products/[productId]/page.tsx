"use client";
import { useSelector } from "react-redux";
import { selectToken } from "../../../../../store/features/auth/authSlice";
import { useGetProductQuery } from "../../../../../store/features/products/productApi";
import Heading from "../../../../../utils/Heading";
import AdminProduct from "../../../../../components/admin/products/AdminProduct";

type Props = {
  params: {
    productId: string;
  };
};

export default function Page({ params: { productId } }: Props) {
  const token: string = useSelector(selectToken);
  const { data, refetch } = useGetProductQuery({ productId });
  return (
    <>
      <Heading title={data?.product.title} description={""} keywords={""} />
      {data && (
        <AdminProduct product={data?.product} token={token} refetch={refetch} />
      )}
    </>
  );
}
