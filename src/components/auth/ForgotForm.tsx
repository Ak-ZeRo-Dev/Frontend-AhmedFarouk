"use client";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Dispatch as Dis, SetStateAction, useEffect } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useForgotPasswordMutation } from "../../store/features/auth/authApi";
import { def } from "../../styles/styles";
import ConfirmPasswordForm from "./input/ConfirmPasswordForm";
import EmailForm from "./input/EmailForm";
import PasswordForm from "./input/PasswordForm";

type Props = {
  setRoute: Dis<SetStateAction<string>>;
};

type InitialValues = {
  email: string;
  password: string;
  confirmPassword?: string;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("بريد إلكتروني خاطئ.")
    .required("البريد الإلكتروني مطلوب.")
    .matches(/^[^\s@]+@[^\s@].[^\s@]+$/, {
      message: "تنسيق البريد الإلكتروني غير صالح.",
    }),

  password: Yup.string()
    .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\\!@#$%^&*()_+=/|-]).{8,24}$/,
      {
        message:
          "يجب أن تكون كلمة المرور 8 أحرف على الأقل. يتضمن حرفًا كبيرًا وحرفًا صغيرًا وحرفًا خاصًا.",
      }
    )
    .required("كلمة المرور مطلوبة."),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "كلمة المرور غير متطابقة.")
    .required("تأكيد كلمة المرور مطلوب."),
});

const initialValues: InitialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const container = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
  },
};

export default function ForgotForm({ setRoute }: Props) {
  const router = useRouter();
  const [forgotPassword, { isSuccess, isError, error }] =
    useForgotPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      setRoute("verification");
    } else if (isError) {
      toast.error(
        (error as any).data.message || "حدث خطأ ما، يرجى المحاولة مرة أخرى."
      );
    }
  }, [error, isError, isSuccess, setRoute]);

  const onSubmit = async (values: InitialValues) => {
    await forgotPassword({
      email: values.email,
      newPassword: values.password,
    });
    sessionStorage.setItem("verificationRoute", "verification");
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const { errors, touched, values, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <motion.div
      variants={container}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`w-1/3 h-fit max-md:w-[80%] p-5 rounded-2xl shadow-md border border-solid !border-opacity-50 border-white  text-shadow-md !bg-opacity-20 bg-white   !backdrop-blur-md`}
    >
      <header className="w-full flex flex-col items-center justify-center gap-5 mb-5">
        <h1 className="text-4xl font-bold text-[#4285f4] block">Ahmed Store</h1>
        <h2 className="text-3xl font-bold  block">نسيت كلمة المرور</h2>
      </header>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
        <EmailForm
          error={errors.email}
          value={values.email}
          touched={touched.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <PasswordForm
          error={errors.password}
          value={values.password}
          touched={touched.password}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        <ConfirmPasswordForm
          error={errors.confirmPassword}
          value={values.confirmPassword}
          touched={touched.confirmPassword}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        <div className="flex justify-around">
          <button
            type="button"
            className={`${def.button}`}
            onClick={() => router.push("/login")}
          >
            رجوع
          </button>
          <button
            type="submit"
            className={`${def.button}`}
            disabled={
              !values.email ||
              !values.password ||
              !values.confirmPassword ||
              errors.email ||
              errors.password ||
              errors.confirmPassword
                ? true
                : false
            }
          >
            التالي
          </button>
        </div>
      </form>
    </motion.div>
  );
}
