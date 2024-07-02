"use client";
import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as Yup from "yup";
import {
  useBlockMutation,
  useDeleteUserMutation,
  useUnblockMutation,
  useUpdateRoleMutation,
  useUpdateUserEmailMutation,
} from "../../../store/features/admin/adminApi";
import { selectUserBackground } from "../../../store/features/layout/layoutSlice";
import { def, form, inputError, section } from "../../../styles/styles";
import { selectUser } from "../../../store/features/auth/authSlice";
import AdminSidebar from "../AdminSidebar";
import { selectIsSmall } from "../../../store/features/user/userSlice";
import { useTheme } from "next-themes";
import LoadingCircle from "../../loading/LoadingCircle";
import { ClipLoader } from "react-spinners";
import LoadingContent from "../../loading/LoadingContent";

type Props = {
  user: IUser;
  token: string;
  refetch: any;
};

type InitialValues = {
  email: string;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("بريد إلكتروني خاطئ.")
    .required("البريد الإلكتروني مطلوب.")
    .matches(/^[^\s@]+@[^\s@].[^\s@]+$/, {
      message: "تنسيق البريد الإلكتروني غير صالح.",
    }),
});

const MySwal = withReactContent(Swal);

export default function AdminUser({ user, token, refetch }: Props) {
  const { avatar } = user;
  const image: string = (avatar.url || avatar) as string;
  const background = useSelector(selectUserBackground);
  const admin = useSelector(selectUser);
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
      error: deleteError,
    },
  ] = useDeleteUserMutation();

  const [
    block,
    {
      isSuccess: isBlockSuccess,
      isLoading: isBlockLoading,
      isError: isBlockError,
      error: blockError,
    },
  ] = useBlockMutation();

  const [
    unblock,
    {
      isSuccess: isUnblockSuccess,
      isLoading: isUnblockLoading,
      isError: isUnblockError,
      error: unblockError,
    },
  ] = useUnblockMutation();

  const [
    updateUserEmail,
    {
      isSuccess: isEmailSuccess,
      isLoading: isEmailLoading,
      isError: isEmailError,
      error: emailError,
    },
  ] = useUpdateUserEmailMutation();

  const [
    updateRole,
    {
      isSuccess: isRoleSuccess,
      isLoading: isRoleLoading,
      isError: isRoleError,
      error: roleError,
    },
  ] = useUpdateRoleMutation();

  const isLoading =
    isEmailLoading ||
    isDeleteLoading ||
    isBlockLoading ||
    isUnblockLoading ||
    isRoleLoading;

  useEffect(() => {
    if (
      isDeleteSuccess ||
      isBlockSuccess ||
      isUnblockSuccess ||
      isEmailSuccess ||
      isRoleSuccess
    ) {
      refetch();
    }
  }, [
    isDeleteSuccess,
    isBlockSuccess,
    isUnblockSuccess,
    isEmailSuccess,
    isRoleSuccess,
    refetch,
  ]);

  useEffect(() => {
    if (isDeleteError) {
      toast.error(
        (deleteError as any).data.message || "حدث خطأ ما! برجاء المحاولة لاحقا."
      );
    }
    if (isBlockError) {
      toast.error(
        (blockError as any).data.message || "حدث خطأ ما! برجاء المحاولة لاحقا."
      );
    }
    if (isUnblockError) {
      toast.error(
        (unblockError as any).data.message ||
          "حدث خطأ ما! برجاء المحاولة لاحقا."
      );
    }
    if (isEmailError) {
      toast.error(
        (emailError as any).data.message || "حدث خطأ ما! برجاء المحاولة لاحقا."
      );
    }
    if (isRoleError) {
      toast.error(
        (roleError as any).data.message || "حدث خطأ ما! برجاء المحاولة لاحقا."
      );
    }
  }, [
    blockError,
    deleteError,
    emailError,
    isBlockError,
    isDeleteError,
    isEmailError,
    isRoleError,
    isUnblockError,
    roleError,
    unblockError,
  ]);

  return (
    <>
      <section className="min-h-screen pt-8 container pb-10">
        <AdminSidebar small={small} user={user} setOpen={setOpen} open={open} />
        <div className={`${contentMargin} ${section.admin}`}>
          {isLoading && <LoadingContent isLoading={isLoading} />}

          <div className="relative">
            <Image
              src={background}
              alt="background"
              width={5000}
              height={5000}
              className="w-full h-60 object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <Image
              src={image}
              alt="avatar"
              width={5000}
              height={5000}
              sizes="w-full h-full"
              className="w-28 h-28 rounded-full absolute -bottom-12 left-1/2 transform -translate-x-1/2 border-4 border-dark dark:border-secondary"
              priority
            />
          </div>

          <div
            className={`relative mt-10 px-10 max-md:px-0 flex flex-col gap-5 ${def.text} `}
          >
            <Fields user={user} />
            <Email
              user={user}
              token={token}
              updateUserEmail={updateUserEmail}
              isEmailSuccess={isEmailSuccess}
            />
            {admin?.role === "master" && (
              <Role user={user} token={token} updateRole={updateRole} />
            )}

            {admin?.role === "master" && (
              <Delete
                user={user}
                token={token}
                deleteUser={deleteUser}
                isDeleteSuccess={isDeleteSuccess}
              />
            )}
            <Block_Unblock
              user={user}
              token={token}
              block={block}
              unblock={unblock}
              isBlockSuccess={isBlockSuccess}
              isUnblockSuccess={isUnblockSuccess}
            />
          </div>
        </div>
      </section>
    </>
  );
}

const Fields: React.FC<{ user: IUser }> = ({ user }) => {
  const {
    _id,
    blockCount,
    gender,
    isBlocked,
    name,
    phone,
    createdProducts,
    role,
  } = user;

  const isAdmin =
    role.toLowerCase() === "admin" || role.toLowerCase() === "master";

  const fields: any = [
    {
      title: "ID:",
      data: _id,
      type: "_id",
      order: "order-1",
    },
    {
      title: "الإسم:",
      data: name,
      type: "name",
      order: "order-2",
    },
    {
      title: "الجنس:",
      data: gender ? gender : "لا يوجد",
      type: "gender",
      order: "order-5",
    },

    {
      title: "رقم التلفون:",
      data: phone ? phone : "لا يوجد",
      type: "phone",
      order: "order-6",
    },
    {
      title: "محظور:",
      data: isBlocked ? "نعم" : "لا",
      type: "isBlocked",
      order: "order-7",
    },
    {
      title: "عدد مرات الحظر:",
      data: blockCount ? blockCount : 0,
      type: "blockCount",
      order: "order-8",
    },

    {
      title: "المنتجات التي تم إنشاؤها",
      data: isAdmin ? createdProducts : null,
      type: "createdProducts",
      order: "order-9",
    },
  ];

  return fields.map((field: any) => {
    if (field.type === "createdProducts") {
      if (isAdmin) {
        return (
          <div key={field.type} className={`flex gap-2 text-lg ${field.order}`}>
            <p>{field.title}:</p>
            {field.data.length > 0 ? (
              <div>
                {field.data.map((ele: any) => (
                  <p key={ele._id}>{ele}</p>
                ))}
              </div>
            ) : (
              <p>لا يوجد</p>
            )}
          </div>
        );
      }
    } else {
      return (
        <div key={field.type} className={`flex gap-2 text-lg ${field.order}`}>
          <p>{field.title}</p>
          <p>{field.data}</p>
        </div>
      );
    }
  });
};

const Role: React.FC<{ user: IUser; token: string; updateRole: any }> = ({
  user,
  token,
  updateRole,
}) => {
  const { role, name, _id: userId } = user;
  const { theme, setTheme } = useTheme();

  const handelChange = (e: SelectChangeEvent<string>) => {
    const role = e.target.value;

    MySwal.fire({
      title: `هل انت متأكد من جعل ${name}: ${role}`,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم, متأكد!",
      cancelButtonText: "الغاء",
    }).then(async (res) => {
      if (res && res.isConfirmed && res.value) {
        await updateRole({ token, userId, role });
      }
    });
  };

  return (
    <div className="flex gap-5 items-center order-4">
      <p>الدور:</p>
      <Select
        name={role}
        value={role}
        onChange={handelChange}
        displayEmpty
        className={`w-fit border border-gray-300 rounded focus:border-main bg-transparent ${def.text}`}
        MenuProps={{
          PaperProps: {
            sx: {
              bgcolor: theme === "dark" ? "#262626" : "#fff",
              color: theme === "dark" ? "#fff" : "#262626",
            },
          },
        }}
        sx={{
          "& .MuiSelect-select": {
            paddingLeft: "2rem",
          },
          "& .MuiSelect-icon": {
            right: "auto",
            left: "8px",
          },
          "& .MuiSvgIcon-root": {
            color: theme === "dark" ? "#fff" : "#262626",
          },
        }}
      >
        <MenuItem value="user">مستخدم</MenuItem>
        <MenuItem value="admin">مسؤول</MenuItem>
      </Select>
    </div>
  );
};

const Email: React.FC<{
  user: IUser;
  token: string;
  updateUserEmail: any;
  isEmailSuccess: any;
}> = ({ user, token, updateUserEmail, isEmailSuccess }) => {
  const { name, email, _id } = user;

  const onSubmit = (values: InitialValues) => {
    MySwal.fire({
      title: `هل انت متأكد من تغير البريد الألكتروني الخاص بـ${name}؟`,
      text: `سيتم تغير البريد الألكتروني من ${email} إلى ${values.email} ولن تستطيع الرجوع عن هذه الخطوة.`,
      icon: "warning",
      iconColor: "orange",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم, متأكد!",
      cancelButtonText: "الغاء",
    })
      .then((result) => {
        if (result.isConfirmed) {
          return MySwal.fire({
            text: "ما هو سبب تغير البريد الألكتروني؟",
            input: "text",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "تغير",
            cancelButtonText: "الغاء",
          });
        }
      })
      .then(async (res) => {
        if (res && res.isConfirmed && res.value) {
          await updateUserEmail({
            token,
            userId: _id,
            email: values.email,
            reason: res.value,
          });
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      email: user.email,
    },
    validationSchema,
    onSubmit,
  });
  const { touched, errors, values, handleChange, handleBlur, handleSubmit } =
    formik;

  useEffect(() => {
    if (isEmailSuccess) {
      MySwal.fire({
        title: "تم تغير البريد الألكتروني",
        text: `برجاء فحص البريد الألكتروني الجديد: ${values.email} لتفعيل الحساب`,
        icon: "success",
        confirmButtonText: "تم",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmailSuccess]);

  return (
    <form onSubmit={handleSubmit} className="order-3 h-[3.5rem]">
      <div className="flex gap-5 items-center">
        <label htmlFor="email" className="block mb-2 text-lg">
          البريد الالكتروني:
        </label>
        <div className="relative w-1/4">
          <input
            type="text"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${errors.email && touched.email && "inputError"}
              w-full border border-gray-300 rounded p-2 focus:border-main bg-transparent`}
          />
          {errors.email && touched.email && (
            <div className="text-error absolute bottom-[-1.6rem] right-1">
              {errors.email}
            </div>
          )}
        </div>
        <Button
          variant="contained"
          type="submit"
          className="disabled:!bg-[#285aab76] dark:!text-white !text-black"
          disabled={
            errors.email || !values.email || values.email === email
              ? true
              : false
          }
        >
          تغير
        </Button>
      </div>
    </form>
  );
};

const Delete: React.FC<{
  user: IUser;
  token: string;
  deleteUser: any;
  isDeleteSuccess: any;
}> = ({ user, token, deleteUser, isDeleteSuccess }) => {
  const { name, email, _id } = user;
  const handleDelete = (name: string, email: string, _id: string) => {
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
  };

  return (
    <Button
      variant="contained"
      color="error"
      className="order-11 w-28 !absolute top-24  left-10"
      onClick={() => handleDelete(name, email, _id)}
    >
      حذف الحساب
    </Button>
  );
};

const Block_Unblock: React.FC<{
  user: IUser;
  token: string;
  block: any;
  isBlockSuccess: any;
  unblock: any;
  isUnblockSuccess: any;
}> = ({ user, token, block, isBlockSuccess, unblock, isUnblockSuccess }) => {
  const { name, email, _id } = user;

  const handleBlock = (name: string, email: string, _id: string) => {
    MySwal.fire({
      title: `هل انت متأكد من حظر ${name}؟`,
      text: `سيتم حظر حساب ${email}.`,
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
  };

  const handleUnblock = (name: string, email: string, _id: string) => {
    MySwal.fire({
      title: `هل انت متأكد من حظر ${name}؟`,
      text: `سيتم فك حظر حساب ${email}.`,
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
  };

  return user.isBlocked ? (
    <Button
      variant="contained"
      color="warning"
      className="w-28 !absolute top-6  left-10"
      onClick={() => handleUnblock(name, email, _id)}
    >
      فك الحظر
    </Button>
  ) : (
    <Button
      variant="contained"
      color="warning"
      className="w-28 !absolute top-6 left-10"
      onClick={() => handleBlock(name, email, _id)}
    >
      حظر
    </Button>
  );
};
