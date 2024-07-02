"use client";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useRegisterMutation } from "../../store/features/auth/authApi";
import { def, formBg } from "../../styles/styles";
import SocialAuth from "./SocialAuth";
import ConfirmPasswordForm from "./input/ConfirmPasswordForm";
import EmailForm from "./input/EmailForm";
import NameForm from "./input/NameForm";
import PasswordForm from "./input/PasswordForm";
import { selectRegisterImage } from "../../store/features/layout/layoutSlice";
import { useSelector } from "react-redux";
import Image from "next/image";

type InitialValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "يجب أن يكون الإسم حرفين علي الأقل")
    .required("الإسم مطلوب."),
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
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Login() {
  const router = useRouter();
  const image = useSelector(selectRegisterImage);
  const [register, { isSuccess, isError, error }] = useRegisterMutation();
  const [isClient, setIsClient] = useState<boolean>(false);

  const onSubmit = async (values: InitialValues) => {
    delete values.confirmPassword;

    await register(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const { values } = formik;
  useEffect(() => {
    if (isSuccess) {
      values.name = "";
      values.email = "";
      values.password = "";
      values.confirmPassword = "";
    }
  }, [isSuccess, values]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/verification");
    } else if (isError) {
      toast.error(
        (error as any).data.message || "حدث خطأ ما، يرجى المحاولة مرة أخرى."
      );
    }
  }, [error, isError, isSuccess, router]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="relative block lg:flex flex-row-reverse items-center w-screen h-screen overflow-hidden ">
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
      <div className="flex flex-col gap-2 max-md:gap-1 justify-start items-center h-screen w-[40vw]  max-lg:w-screen max-lg:absolute max-lg:top-1/2 max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 max-lg:justify-center">
        <header className="w-full flex justify-center mt-3 max-md:mt-1">
          <Link
            href="/"
            target="_self"
            className={`w-fit h-fit text-4xl max-md:text-3xl font-bold text-main block`}
          >
            Ahmed Store
          </Link>
        </header>

        {/* Form */}

        <Form formik={formik} />

        {/* auth */}

        <SocialAuth />

        {/* Sign up */}

        <p className="text-sixth dark:text-white text-lg max-lg:text-white">
          تملك حساب؟{" "}
          <Link
            href={"/login"}
            className={`text-main  hover:text-main  transition-colors `}
          >
            تسجيل
          </Link>
        </p>
      </div>
    </section>
  );
}

const Form: React.FC<{ formik: any }> = ({ formik }) => {
  const { errors, touched, values, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <div
      className={`w-full max-lg:bg-sixth max-sm:w-[95%] max-md:w-[80%] max-lg:w-[70%] max-lg:px-5 max-lg:py-4 max-lg:shadow-md max-lg:rounded-lg ${formBg}`}
    >
      <h2 className="text-2xl max-md:text-xl font-bold text-black dark:text-white font-Rubik text-center mb-5 max-md:mb-3">
        إنشاء حساب
      </h2>

      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col  justify-center items-center w-[80%] max-lg:w-full gap-5`}
        >
          <NameForm
            error={errors.name}
            value={values.name}
            touched={touched.name}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />

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

          <button
            type="submit"
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
            className={`${def.button}`}
          >
            إنشاء الحساب
          </button>
        </form>
      </div>
    </div>
  );
};
