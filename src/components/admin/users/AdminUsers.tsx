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
import { useTheme } from "next-themes";
import {
  useBlockMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUnblockMutation,
} from "../../../store/features/admin/adminApi";
import LoadingCircle from "../../loading/LoadingCircle";
import { Typography } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoadingContent from "../../loading/LoadingContent";
import { section } from "../../../styles/styles";

const MySwal = withReactContent(Swal);

export default function AdminUsers() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const user = useSelector(selectUser) as IUser;
  const token = useSelector(selectToken);
  const small = useSelector(selectIsSmall);
  const [open, setOpen] = useState<boolean>(true);

  const contentMargin =
    !small && open ? "mr-[250px]" : !small || small ? "mr-[60px]" : null;

  const [
    deleteUser,
    {
      isSuccess: isDeleteSuccess,
      isLoading: isDeleteLoading,
      isError: isDeleteError,
      error: DeleteError,
    },
  ] = useDeleteUserMutation();
  const [
    block,
    {
      isSuccess: isBlockSuccess,
      isLoading: isBlockLoading,
      isError: isBlockError,
      error: BlockError,
    },
  ] = useBlockMutation();

  const [
    unblock,
    {
      isSuccess: isUnblockSuccess,
      isLoading: isUnblockLoading,
      isError: isUnblockError,
      error: UnblockError,
    },
  ] = useUnblockMutation();

  const {
    data,
    isError,
    error,
    isLoading: isDataLoading,
    refetch,
  } = useGetAllUsersQuery({
    token,
    limit: pageSize,
    page: page + 1,
  });

  const isLoading = isDeleteLoading || isBlockLoading || isUnblockLoading;

  const handleBlock = (
    name: string,
    email: string,
    _id: string,
    role: string
  ) => {
    if (role === "master" || user.role === role) {
      toast.error("لا يمكنك حظر هذا الحساب!");
    } else {
      MySwal.fire({
        title: `هل انت متأكد من حظر ${name}؟`,
        text: `سيتم حظر حساب ${name}.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "نعم, متأكد!",
        cancelButtonText: "الغاء",
      })
        .then((result) => {
          if (result.isConfirmed) {
            return MySwal.fire({
              text: "ما هو سبب الحظر؟",
              input: "text",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              confirmButtonText: "حظر",
              cancelButtonText: "الغاء",
            });
          }
        })
        .then(async (res) => {
          if (res && res.isConfirmed) {
            await block({ token, userId: _id, reason: res.value });
            if (isBlockSuccess) {
              MySwal.fire({
                title: "تم الحظر!",
                text: `تم حظر ${name}`,
                icon: "success",
                confirmButtonText: "تم",
              });
            }
          }
        });
    }
  };

  const handleUnblock = (
    name: string,
    email: string,
    _id: string,
    role: string
  ) => {
    if (role === "master" || user.role === role) {
      toast.error("لا يمكنك فك حظر هذا الحساب!");
    } else {
      MySwal.fire({
        title: `هل انت متأكد من حظر ${name}؟`,
        text: `سيتم حظر حساب ${name}.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "نعم, متأكد!",
        cancelButtonText: "الغاء",
      }).then(async (res) => {
        if (res && res.isConfirmed) {
          await unblock({ token, userId: _id });
          if (isUnblockSuccess) {
            MySwal.fire({
              title: "تم فك الحظر!",
              text: `تم فك حظر ${name}`,
              icon: "success",
              confirmButtonText: "تم",
            });
          }
        }
      });
    }
  };

  const handleDelete = (
    name: string,
    email: string,
    _id: string,
    role: string
  ) => {
    if (role === "master" || user.role === role) {
      toast.error("لا يمكنك حذف هذا الحساب!");
    } else {
      MySwal.fire({
        title: `هل انت متأكد من حذف ${name}؟`,
        text: `سيتم حذف حساب ${email} ولن تستطيع الرجوع عن هذه الخطوة.`,
        icon: "warning",
        iconColor: "red",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "نعم, متأكد!",
        cancelButtonText: "الغاء",
      })
        .then((result) => {
          if (result.isConfirmed) {
            return MySwal.fire({
              text: "ما هو سبب الحذف؟",
              input: "text",
              icon: "warning",
              iconColor: "red",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              confirmButtonText: "حذف",
              cancelButtonText: "الغاء",
            });
          }
        })
        .then(async (res) => {
          if (res && res.isConfirmed && res.value) {
            const reason = res.value;
            console.log(reason);
            await deleteUser({ token, userId: _id, reason });
            if (isDeleteSuccess) {
              MySwal.fire({
                title: "تم الحذف!",
                text: `تم حذف حساب ${name}`,
                icon: "success",
                confirmButtonText: "تم",
              });
            }
          }
        });
    }
  };

  const columns: GridColDef[] = [
    {
      field: "avatar",
      headerName: "الصورة",
      flex: 0.5,
      minWidth: small ? 100 : 0,
      display: "flex",
      align: "center",
      filterable: false,
      resizable: false,
      renderCell: (params) => (
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={(params.value.url || params.value) as string}
            alt="avatar"
            fill
          />
        </div>
      ),
    },
    {
      field: "_id",
      headerName: "ID",
      flex: 2,
      minWidth: small ? 200 : 0,
      display: "flex",
      align: "center",
    },

    {
      field: "role",
      headerName: "الدور",
      flex: 0.5,
      minWidth: small ? 100 : 0,
      display: "flex",
      align: "center",
      resizable: false,
    },

    {
      field: "name",
      headerName: "الإسم",
      flex: 2,
      minWidth: small ? 150 : 0,
      display: "flex",
      align: "center",
    },

    {
      field: "email",
      headerName: "البريد الألكتروني",
      flex: 2,
      minWidth: small ? 200 : 0,
      display: "flex",
      align: "center",
    },

    {
      field: "isBlocked",
      headerName: "محظور",
      flex: 0.5,
      minWidth: small ? 100 : 0,
      display: "flex",
      align: "center",
      resizable: false,
      renderCell: (params) => (params.value ? "نعم" : "لا"),
    },
    {
      field: "blockCount",
      headerName: "عدد مرات الحظر",
      flex: 1,
      minWidth: small ? 120 : 0,
      display: "flex",
      align: "center",
      resizable: false,
    },
    {
      field: "edit",
      headerName: "تعديل",
      flex: 0.5,
      minWidth: small ? 70 : 0,
      display: "flex",
      align: "center",
      filterable: false,
      resizable: false,
      renderCell: (params) => {
        const handleClick = () => {
          if (params.row.role === "master" || user.role === params.row.role) {
            toast.error("لا يمكنك تعديل هذا الحساب!");
          } else {
            const href = `users/${params.row._id}`;
            router.push(href);
          }
        };
        return (
          <button onClick={handleClick}>
            <AppRegistrationIcon />
          </button>
        );
      },
    },

    {
      field: "block/unblock",
      headerName: "حظر / فك الحظر",
      flex: 1,
      minWidth: small ? 100 : 0,
      align: "center",
      filterable: false,
      resizable: false,
      renderCell: (params) => (
        <>
          {params.row.isBlocked ? (
            <button
              onClick={() =>
                handleUnblock(
                  params.row.name,
                  params.row.email,
                  params.row._id,
                  params.row.role
                )
              }
              className="flex justify-center items-center w-full h-full"
            >
              <CgUnblock size={27} />
            </button>
          ) : (
            <button
              onClick={() =>
                handleBlock(
                  params.row.name,
                  params.row.email,
                  params.row._id,
                  params.row.role
                )
              }
            >
              <BlockIcon />
            </button>
          )}
        </>
      ),
    },
    {
      field: "delete",
      headerName: "حذف",
      flex: 0.5,
      minWidth: small ? 100 : 0,
      display: "flex",
      align: "center",
      filterable: false,
      resizable: false,
      renderCell: (params) => (
        <button
          onClick={() =>
            handleDelete(
              params.row.name,
              params.row.email,
              params.row._id,
              params.row.role
            )
          }
        >
          <DeleteForeverIcon />
        </button>
      ),
    },
  ];

  useEffect(() => {
    refetch();
  }, [
    page,
    refetch,
    pageSize,
    isDeleteSuccess,
    isBlockSuccess,
    isUnblockSuccess,
  ]);

  useEffect(() => {
    if (isDeleteError) {
      toast.error(
        (DeleteError as any).data.message || "حدث خطأ ما! برجاء المحاولة لاحقا."
      );
    }
    if (isBlockError) {
      toast.error(
        (BlockError as any).data.message || "حدث خطأ ما! برجاء المحاولة لاحقا."
      );
    }
    if (isUnblockError) {
      toast.error(
        (UnblockError as any).data.message ||
          "حدث خطأ ما! برجاء المحاولة لاحقا."
      );
    }
  }, [
    BlockError,
    DeleteError,
    UnblockError,
    isBlockError,
    isDeleteError,
    isUnblockError,
  ]);
  return (
    <section className="relative pt-main h-screen dark:bg-secondaryDark">
      <AdminSidebar small={small} user={user} setOpen={setOpen} open={open} />
      <div className={`${contentMargin} ${section.admin}`}>
        {isLoading && <LoadingContent isLoading={isLoading} />}
        {isDataLoading ? (
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
              data={data?.users}
              rowCount={data?.totalCount}
              page={page}
              small={small}
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
