"use client";

import { Button } from "@mui/material";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import * as Yup from "yup";
import { useUpdatePasswordMutation } from "../../store/features/user/userApi";
import LoadingCircle from "../loading/LoadingCircle";

type Props = {
  token: string;
  refetch: any;
  isLoading: any;
};

type IInitialValues = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword?: string;
};

const initialValues: IInitialValues = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const validationSchema = Yup.object({
  oldPassword: Yup.string()
    .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\\!@#$%^&*()_+=/|-]).{8,24}$/,
      {
        message:
          "يجب أن تكون كلمة المرور 8 أحرف على الأقل. يتضمن حرفًا كبيرًا وحرفًا صغيرًا وحرفًا خاصًا.",
      }
    ),
  newPassword: Yup.string()
    .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\\!@#$%^&*()_+=/|-]).{8,24}$/,
      {
        message:
          "يجب أن تكون كلمة المرور 8 أحرف على الأقل. يتضمن حرفًا كبيرًا وحرفًا صغيرًا وحرفًا خاصًا.",
      }
    ),
  confirmNewPassword: Yup.string().oneOf(
    [Yup.ref("newPassword")],
    "كلمة المرور غير متطابقة."
  ),
});

type FieldProps = {
  label: string;
  name: string;
  value: string;
  error: boolean;
  handleChange: any;
  handleBlur: any;
  isVisible: boolean;
  toggleVisibility: () => void;
};

const PasswordField = ({
  label,
  name,
  value,
  error,
  handleChange,
  handleBlur,
  isVisible,
  toggleVisibility,
}: FieldProps) => (
  <div>
    <label htmlFor={name} className="block mb-2 text-lg font-bold">
      {label}
    </label>
    <div className="relative">
      <input
        type={isVisible ? "text" : "password"}
        name={name}
        id={name}
        placeholder="********"
        value={value}
        className="w-full border border-gray-300 rounded p-2 focus:border-main bg-transparent"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <span
        className="absolute left-3 top-1/2 -translate-y-1/2 text-xl cursor-pointer"
        onClick={toggleVisibility}
      >
        {isVisible ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
    {error && <div className="text-error">{error}</div>}
  </div>
);

export default function EditPassword({ token, refetch, isLoading }: Props) {
  const [isOldPassword, setIsOldPassword] = useState<boolean>(true);
  const [isNewPassword, setIsNewPassword] = useState<boolean>(true);
  const [isConfirmNewPassword, setIsConfirmNewPassword] =
    useState<boolean>(true);

  const [updatePassword, { isSuccess, isError, error }] =
    useUpdatePasswordMutation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      delete values.confirmNewPassword;
      updatePassword({ values, token });
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

  const canSubmit = !(
    errors.oldPassword ||
    !values.oldPassword ||
    errors.newPassword ||
    !values.newPassword ||
    errors.confirmNewPassword ||
    !values.confirmNewPassword
  );

  return (
    <div className="w-full max-md:w-[90%] max-md:mr-4 h-screen flex justify-center items-center -mt-7">
      <div className="lg:w-[45%] max-lg:w-[80%] max-md:w-[90%] max-sm:w-[95%] flex flex-col gap-5 bg-white bg-opacity-20 backdrop-blur-md dark:bg-black dark:bg-opacity-60 dark:backdrop-blur-sm rounded-xl p-10 max-md:p-5 border border-[#ffffffb4] dark:border-[#1c223f] shadow-md">
        <header className="w-full flex flex-col items-center justify-center gap-5">
          <h1 className="text-4xl max-md:text-3xl font-bold text-[#4285f4] block">
            Ahmed Store
          </h1>
          <h2 className="text-3xl max-md:text-2xl font-bold block">
            تغير كلمة المرور
          </h2>
        </header>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <PasswordField
            label="كلمة المرور القديمة"
            name="oldPassword"
            value={values.oldPassword}
            error={Boolean(errors.oldPassword && touched.oldPassword)}
            handleChange={handleChange}
            handleBlur={handleBlur}
            isVisible={isOldPassword}
            toggleVisibility={() => setIsOldPassword((prev) => !prev)}
          />
          <PasswordField
            label="كلمة المرور الجديدة"
            name="newPassword"
            value={values.newPassword}
            error={Boolean(errors.newPassword && touched.newPassword)}
            handleChange={handleChange}
            handleBlur={handleBlur}
            isVisible={isNewPassword}
            toggleVisibility={() => setIsNewPassword((prev) => !prev)}
          />
          <PasswordField
            label="تأكيد كلمة المرور الجديدة"
            name="confirmNewPassword"
            value={values.confirmNewPassword as string}
            error={Boolean(
              errors.confirmNewPassword && touched.confirmNewPassword
            )}
            handleChange={handleChange}
            handleBlur={handleBlur}
            isVisible={isConfirmNewPassword}
            toggleVisibility={() => setIsConfirmNewPassword((prev) => !prev)}
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              className="w-1/2 disabled:!bg-[#285aab76]"
              disabled={!canSubmit}
            >
              حفظ
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
