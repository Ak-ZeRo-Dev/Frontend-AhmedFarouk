"use client";
import { useSelector } from "react-redux";
import AdminUser from "../../../../../components/admin/users/AdminUser";
import { useGetUserQuery } from "../../../../../store/features/admin/adminApi";
import { selectToken } from "../../../../../store/features/auth/authSlice";
import Heading from "../../../../../utils/Heading";

type Props = {
  params: {
    userId: string;
  };
};

export default function Page({ params: { userId } }: Props) {
  const token = useSelector(selectToken);
  const { data, refetch } = useGetUserQuery({ token, userId });
  return (
    <>
      <Heading title={data?.user.name} description={""} keywords={""} />
      {data && <AdminUser user={data?.user} token={token} refetch={refetch} />}
    </>
  );
}
