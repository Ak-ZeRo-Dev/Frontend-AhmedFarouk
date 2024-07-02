"use client";

import { Button, MenuItem, Select } from "@mui/material";
import { useFormik } from "formik";
import Image from "next/image";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { IoCameraOutline } from "react-icons/io5";
import * as Yup from "yup";
import {
  useUpdateAvatarMutation,
  useUpdateInfoMutation,
} from "../../store/features/user/userApi";
import { def, inputError } from "../../styles/styles";
import LoadingCircle from "../loading/LoadingCircle";

type Props = {
  user: IUser;
  token: string | null;
  refetch: any;
  isLoading: any;
  background: string;
};

type IInitialValues = {
  name: string;
  phone: string;
  gender: string;
};

const validationSchema = Yup.object({
  name: Yup.string().min(2, "يجب أن يكون الإسم حرفين علي الأقل"),
  phone: Yup.string().test(
    "phone-or-none",
    "يجب أن يتكون رقم الهاتف من 11 رقم على الأقل.",
    (value: string | undefined) =>
      value === "" ||
      value === undefined ||
      value === "لا يوجد" ||
      /^(\+?)[0-9]{11,}$/.test(value || "")
  ),
});

export default function EditInfo({
  user,
  token,
  refetch,
  isLoading,
  background,
}: Props) {
  const { name, phone, gender } = user;

  const [updateInfo, { isSuccess, isError, error }] = useUpdateInfoMutation();

  const initialValues: IInitialValues = {
    name: name || "لا يوجد",
    phone: phone || "لا يوجد",
    gender: gender || "none",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (
        values.phone === "لا يوجد" ||
        !values.phone?.trim() ||
        values.phone === undefined
      ) {
        values.phone = "";
      }
      updateInfo({ values, token });
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
    if (isError) {
      toast.error(
        (error as any).data.message || "حدث خطأ ما، يرجى المحاولة مرة أخرى."
      );
    }
  }, [error, isError, isSuccess, refetch]);

  if (isLoading) {
    return <LoadingCircle />;
  }

  const canSend = () => {
    const fields: Array<keyof IInitialValues> = ["name", "phone", "gender"];
    const hasChanged = fields.some(
      (field) => values[field] !== initialValues[field]
    );
    const hasErrors = fields.some((field) => errors[field]);
    const isTouched = fields.some((field) => touched[field]);

    return !(hasChanged && !hasErrors && isTouched);
  };

  return (
    <>
      <Images
        user={user}
        background={background}
        token={token as string}
        refetch={refetch}
        isLoading={isLoading}
      />
      <form
        onSubmit={handleSubmit}
        className="w-full flex justify-center pt-14 max-md:pt-16 max-md:w-[90%] max-md:pr-3"
      >
        <div className="lg:w-[40%]  max-lg:w-[80%] max-md:w-[90%] max-sm:w-[95%] flex flex-col gap-5">
          <InputField
            label="الأسم"
            name="name"
            value={values.name}
            error={Boolean(errors.gender && touched.gender)}
            errorMsg={errors.name || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <InputField
            label="رقم التلفون"
            name="phone"
            value={values.phone}
            error={Boolean(errors.gender && touched.gender)}
            errorMsg={errors.phone || ""}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div className="w-fit flex justify-center items-center gap-5">
            <label htmlFor="gender" className="block mb-2 text-lg font-bold">
              الجنس:
            </label>
            <SelectField
              name="gender"
              value={values.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.gender && touched.gender)}
            />
            {errors.gender && touched.gender && (
              <div className="text-error">{errors.gender}</div>
            )}
          </div>
          <div className="flex justify-center mt-5">
            <Button
              type="submit"
              variant="contained"
              className="w-1/2 dark:disabled:text-white disabled:!bg-[#285aab76]"
              disabled={canSend()}
            >
              حفظ
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

const Images: React.FC<{
  user: IUser;
  token: string;
  refetch: any;
  isLoading: any;
  background: string;
}> = ({ user, token, refetch, isLoading, background }) => {
  const avatar: any = user.avatar.url || user.avatar;

  const [updateAvatar, { isSuccess, isError, error }] =
    useUpdateAvatarMutation();

  const handelChange = (e: any) => {
    const avatar = e.target.files[0];
    updateAvatar({ avatar, token });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
    if (isError) {
      toast.error(
        (error as any).data.message || "حدث خطأ ما، يرجى المحاولة مرة أخرى."
      );
    }
  }, [error, isError, isSuccess, refetch]);

  if (isLoading) {
    return <LoadingCircle />;
  }

  return (
    <div className="relative">
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
      </div>

      <div className="absolute z-10 top-44 left-1/2 transform -translate-x-1/2">
        <div className="relative">
          <Image
            src={avatar}
            alt="avatar"
            width={1000}
            height={1000}
            className="w-28 h-28 rounded-full border-4 border-dark dark:border-secondary"
            priority
          />
          <div className="absolute z-30 bottom-0 right-0">
            <label
              htmlFor="avatar"
              className="cursor-pointer bg-black bg-opacity-90 p-2 rounded-full w-fit h-fit block"
            >
              <IoCameraOutline className="text-white w-5 h-5" />
            </label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="sr-only"
              accept=".jpg,.jpeg,.png"
              onChange={handelChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  error: boolean;
  errorMsg: string;
  onChange: any;
  onBlur: any;
}> = ({ label, name, value, error, errorMsg, onChange, onBlur }) => (
  <div>
    <label htmlFor={name} className="block mb-2 text-lg font-bold">
      {label}
    </label>
    <input
      type="text"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={value}
      className={`w-full border border-gray-300 rounded p-2 focus:border-main bg-transparent ${
        error && inputError
      }`}
    />
    {error && <div className="text-error">{errorMsg}</div>}
  </div>
);

const SelectField: React.FC<{
  name: string;
  value: string;
  onChange: any;
  onBlur: any;
  error: boolean;
}> = ({ name, value, onChange, onBlur, error }) => (
  <Select
    name={name}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    displayEmpty
    className={`w-fit border border-gray-300 rounded focus:border-main bg-transparent ${def.text}`}
    MenuProps={{
      PaperProps: {
        sx: {
          bgcolor: "#262626",
          color: "white",
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
    }}
  >
    <MenuItem value="none">لا يوجد</MenuItem>
    <MenuItem value="male">ذكر</MenuItem>
    <MenuItem value="female">أنثى</MenuItem>
  </Select>
);
