"use client";

import { useSelector } from "react-redux";
import {
  selectToken,
  selectUser,
} from "../../../store/features/auth/authSlice";
import { selectIsSmall } from "../../../store/features/user/userSlice";
import AdminSidebar from "../AdminSidebar";
import AdminTable from "../AdminTable";
import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { CgUnblock } from "react-icons/cg";
import Link from "next/link";
import BlockIcon from "@mui/icons-material/Block";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { selectAllProducts } from "../../../store/features/products/productSlice";
import { IProduct } from "../../../types/product";
import { useTheme } from "@emotion/react";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../../store/features/products/productApi";
import { Typography } from "@mui/material";
import LoadingCircle from "../../loading/LoadingCircle";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import toast from "react-hot-toast";
import LoadingContent from "../../loading/LoadingContent";
import { section } from "../../../styles/styles";
const MySwal = withReactContent(Swal);

export default function AdminProducts() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(30);

  const user = useSelector(selectUser) as IUser;
  const token = useSelector(selectToken);
  const small = useSelector(selectIsSmall);
  const [open, setOpen] = useState<boolean>(true);

  const contentMargin =
    !small && open ? "mr-[250px]" : !small || small ? "mr-[60px]" : null;

  const [
    deleteProduct,
    {
      isSuccess: isDeleteSuccess,
      isLoading: isDeleteLoading,
      isError: isDeleteError,
      error: deleteError,
    },
  ] = useDeleteProductMutation();

  const { data, isError, error, isLoading, refetch } = useGetAllProductsQuery({
    limit: pageSize,
    page: page + 1,
  });

  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      flex: 2,
      display: "flex",
      align: "center",
      resizable: false,
      minWidth: small ? 200 : 0,
    },
    {
      field: "title",
      headerName: "العنوان",
      flex: 3,
      display: "flex",
      align: "center",
      minWidth: small ? 200 : 0,
      renderCell: (params) => {
        return (
          <div title={params.row.title}>
            <span>...</span>
            <span>{params.row.title.slice(0, 30)}</span>
          </div>
        );
      },
    },

    {
      field: "description",
      headerName: "الوصف",
      flex: 4,
      display: "flex",
      align: "center",
      minWidth: small ? 200 : 0,
      renderCell: (params) => {
        return (
          <div title={params.row.description}>
            <span>...</span>
            <span>{params.row.description.slice(0, 50)}</span>
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "السعر",
      flex: 1,
      display: "flex",
      align: "center",
      resizable: false,
      minWidth: small ? 100 : 0,
      renderCell: (params) => {
        const price = params.row.price;
        return (
          <div>
            <span>{price && price > 0 ? price : "لا يوجد"}</span>
            <span className="ml-1">£</span>
          </div>
        );
      },
    },
    {
      field: "edit",
      headerName: "تعديل",
      flex: 0.5,
      display: "flex",
      align: "center",
      resizable: false,
      filterable: false,
      minWidth: small ? 100 : 0,
      renderCell: (params) => (
        <Link href={`products/${params.row._id}`}>
          <AppRegistrationIcon />
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "حذف",
      flex: 0.5,
      display: "flex",
      align: "center",
      resizable: false,
      filterable: false,
      minWidth: small ? 100 : 0,
      renderCell: (params) => (
        <button onClick={() => handleDelete(params.row.title, params.row._id)}>
          <DeleteForeverIcon />
        </button>
      ),
    },
  ];

  const handleDelete = (title: string, _id: string) => {
    MySwal.fire({
      title: `هل انت متأكد من حذف ${title}؟`,
      text: `سيتم حذف ${title} ولن تستطيع الرجوع عن هذه الخطوة.`,
      icon: "warning",
      iconColor: "red",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم, متأكد!",
      cancelButtonText: "الغاء",
    }).then(async (res) => {
      if (res && res.isConfirmed) {
        const products = [{ _id }];
        await deleteProduct({ token, products });
        if (isDeleteSuccess) {
          MySwal.fire({
            title: "تم الحذف!",
            text: `تم حذف ${title}`,
            icon: "success",
            confirmButtonText: "تم",
          });
        }
      }
    });
  };

  useEffect(() => {
    refetch();
  }, [page, refetch, pageSize, isDeleteSuccess]);

  useEffect(() => {
    if (isDeleteError) {
      MySwal.fire({
        title: "خطأ",
        text:
          (deleteError as any).data.message ||
          "حدث خطأ! رجاءا حاول مرة اخري لاحقا.",
        icon: "error",
        confirmButtonText: "خروج",
      });
    }
  }, [deleteError, isDeleteError]);

  useEffect(() => {
    if (isError) {
      toast.error(
        (error as any).data.message || "حدث خطأ! رجاءا حاول مرة اخري لاحقا."
      );
    }
  }, [error, isError]);

  return (
    <section className="relative pt-main h-screen dark:bg-secondaryDark">
      <AdminSidebar small={small} user={user} setOpen={setOpen} open={open} />
      <div className={`${contentMargin} ${section.admin}`}>
        {isDeleteLoading && <LoadingContent isLoading={isDeleteLoading} />}
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <LoadingCircle />
          </div>
        ) : isError ? (
          <div className="w-full h-full flex justify-center items-center">
            <Typography variant="h5">
              {(error as any).data.message || "لا توجد بيانات."}
            </Typography>
          </div>
        ) : (
          data && (
            <AdminTable
              columns={columns}
              small={small}
              data={data?.products}
              rowCount={data?.totalCount}
              page={page}
              setPage={setPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
            />
          )
        )}
      </div>
    </section>
  );
}
