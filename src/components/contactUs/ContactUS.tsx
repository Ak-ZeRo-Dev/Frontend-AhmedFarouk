"use client";
import { useFormik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import axios from "../../lib/axios";
import { selectUser } from "../../store/features/auth/authSlice";
import { selectContactUsImage } from "../../store/features/layout/layoutSlice";
import { center, def } from "../../styles/styles";
import EmailContact from "./EmailContact";
import MessageContact from "./MessageContact";
import NameContact from "./NameContact";
import PhoneContact from "./PhoneContact";
import Reply from "./Reply";

type InitialValues = {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
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
  phoneNumber: Yup.string().matches(/^(\+?)[0-9]{11,}$/, {
    message: "يجب أن يتكون رقم الهاتف من 11 رقم على الأقل.",
  }),
  message: Yup.string().required("الرسالة مطلوبة."),
});

export default function ContactUS() {
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const user = useSelector(selectUser);
  const image = useSelector(selectContactUsImage);
  const initialValues: InitialValues = {
    name: user?.name ? user.name : "",
    email: user?.email ? user.email : "",
    phoneNumber: user?.phone ? user.phone : "",
    message: "",
  };

  const onSubmit = async (values: InitialValues) => {
    try {
      const res = await axios.post("contact/send-message", values);
      setIsSent(true);
      values.message = "";
      toast.success(res.data.message);
    } catch (error: any) {
      const message = error.response.data.message;
      toast.error(message);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const { touched, errors, values, handleChange, handleBlur, handleSubmit } =
    formik;

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <section>
      {isClient && image && (
        <Image
          src={image}
          alt="background contact image."
          width={0}
          height={0}
          sizes="100vw"
          priority
          className="h-main w-screen absolute top-0 left-0 z-0"
        />
      )}
      <div className="h-main w-full flex justify-center items-center">
        <div
          className={`${def.bgBlurBlack} rounded-lg shadow-md w-1/2 max-lg:w-[90%] mt-10`}
        >
          {!isSent ? (
            <>
              <h1 className="font-Reem_Kufi text-4xl font-bold mb-2 mt-7 max-lg:mt-4 max-lg:mb-1 text-white text-center">
                تواصل معنا
              </h1>
              <p className="font-['Reem_Kufi'] mb-2 max-lg:mb-2 text-white text-center">
                برجاء ملء هذا النموذج، وسنتواصل معك قريبًا.
              </p>

              <form
                className="flex flex-col px-20 w-full h-full max-lg:px-5"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-6 ">
                  <NameContact
                    error={errors.name}
                    value={values.name}
                    touched={touched.name}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />

                  <PhoneContact
                    error={errors.phoneNumber}
                    value={values.phoneNumber}
                    touched={touched.phoneNumber}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />

                  <EmailContact
                    error={errors.email}
                    value={values.email}
                    touched={touched.email}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />

                  <MessageContact
                    error={errors.message}
                    value={values.message}
                    touched={touched.message}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </div>
                <div className={`w-full ${center.flex} mb-5`}>
                  <button
                    type="submit"
                    disabled={
                      !values.name ||
                      !values.email ||
                      !values.message ||
                      errors.name ||
                      errors.email ||
                      errors.message ||
                      errors.phoneNumber
                        ? true
                        : false
                    }
                    className={`${def.button} !w-36`}
                  >
                    أرسل
                  </button>
                </div>
              </form>
            </>
          ) : (
            <Reply setIsSent={setIsSent} />
          )}
        </div>
      </div>
    </section>
  );
}
