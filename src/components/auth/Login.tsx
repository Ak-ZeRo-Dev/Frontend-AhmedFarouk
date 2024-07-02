"use client";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useLoginMutation } from "../../store/features/auth/authApi";
import { def, formBg } from "../../styles/styles";
import SocialAuth from "./SocialAuth";
import EmailForm from "./input/EmailForm";
import PasswordForm from "./input/PasswordForm";
import RememberMe from "./input/RememberMe";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectLoginImage } from "../../store/features/layout/layoutSlice";

type InitialValues = {
  email: string;
  password: string;
};
const initialValues: InitialValues = {
  email: "",
  password: "",
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
});

export default function Login() {
  const router = useRouter();
  const image = useSelector(selectLoginImage);
  const [login, { isSuccess, isError, error }] = useLoginMutation();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    } else if (isError) {
      toast.error(
        (error as any).data.message || "حدث خطأ ما، يرجى المحاولة مرة أخرى."
      );
    }
  }, [error, isError, isSuccess, router]);

  const onSubmit = async (values: InitialValues) => {
    await login(values);

    if (isSuccess) {
      values.email = "";
      values.password = "";
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const { errors, touched, values, handleChange, handleBlur, handleSubmit } =
    formik;

  const form = () => {
    return (
      <div
        className={`w-full ${formBg}  max-sm:w-[95%] max-md:w-[80%] max-lg:w-[70%] max-lg:px-5 max-lg:py-8 max-lg:shadow-md max-lg:rounded-lg`}
      >
        <h2 className="text-2xl font-bold text-black dark:text-white font-Rubik text-center mb-8">
          تسجيل الدخول
        </h2>
        <div className="w-full flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 justify-center items-center w-[80%] max-lg:w-full  "
          >
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

            <div className="flex justify-between w-full">
              <RememberMe />
              <Link
                href={"/forgot-password"}
                className={`text-black dark:text-white text-lg hover:!text-main transition-colors `}
              >
                نسيت كلمة المرور؟
              </Link>
            </div>

            <button
              type="submit"
              disabled={
                !values.email ||
                !values.password ||
                errors.email ||
                errors.password
                  ? true
                  : false
              }
              className={`${def.button}`}
            >
              تسجيل
            </button>
          </form>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="block lg:flex flex-row-reverse items-center w-screen h-screen overflow-hidden ">
      {isClient && image && (
        <Image
          src={image}
          alt="background form image."
          width={0}
          height={0}
          sizes="100vw"
          priority
          className="h-screen lg:w-[60vw] xl:w-[80vw] w-screen"
        />
      )}
      <div className="flex flex-col gap-5 justify-center items-center h-screen w-[40vw]  max-lg:w-screen max-lg:absolute max-lg:top-1/2 max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:-translate-y-1/2">
        <header className="w-full flex flex-col items-center justify-center">
          <Link
            href="/"
            target="_self"
            className={`text-4xl font-bold text-main block`}
          >
            Ahmed Store
          </Link>
        </header>

        {/* Form */}

        {form()}

        {/* auth */}

        <SocialAuth />

        {/* Sign up */}

        <p className="text-sixth dark:text-white text-lg max-lg:text-white">
          لا تملك حساب؟{" "}
          <Link
            href={"/register"}
            className={`text-main  hover:text-secondary  transition-colors `}
          >
            إنشاء حساب
          </Link>
        </p>
      </div>
    </section>
  );
}
