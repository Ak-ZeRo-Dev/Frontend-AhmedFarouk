"use client";

import { Button } from "@mui/material";
import { useFormik } from "formik";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import {
  useUpdateEmailMutation,
  useVerifiedEmailMutation,
} from "../../store/features/user/userApi";
import { selectVerifiedToken } from "../../store/features/user/userSlice";
import { verificationStyle } from "../../styles/styles";

type Props = {
  user: IUser;
  token: string;
  refetch: any;
  isLoading: any;
};

type IUpdate = {
  email: string;
  token: string;
  setRoute: Dispatch<SetStateAction<string>>;
};
type IVerify = {
  token: string;
  refetch: any;
  setRoute: Dispatch<SetStateAction<string>>;
};

export default function EditEmail({ user, token, refetch, isLoading }: Props) {
  const { email } = user;
  const [route, setRoute] = useState<string>("update");

  const renderContent = () => {
    switch (route) {
      case "update":
        return <Update token={token} email={email} setRoute={setRoute} />;
      case "verify":
        return <Verify token={token} setRoute={setRoute} refetch={refetch} />;
      default:
        return null;
    }
  };

  return renderContent();
}

const Update: React.FC<IUpdate> = ({ token, email, setRoute }) => {
  const [updateEmail, { isSuccess, isError, error }] = useUpdateEmailMutation();
  const formik = useFormik({
    initialValues: {
      email,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("بريد إلكتروني خاطئ.")
        .matches(/^[^\s@]+@[^\s@].[^\s@]+$/, {
          message: "تنسيق البريد الإلكتروني غير صالح.",
        }),
    }),
    onSubmit: (values) => {
      updateEmail({ values, token });
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  useEffect(() => {
    if (isSuccess) {
      setRoute("verify");
    }
    if (isError) {
      toast.error(
        (error as any).data.message || "حدث خطأ ما، يرجى المحاولة مرة أخرى."
      );
    }
  }, [error, isError, isSuccess, setRoute]);

  return (
    <div className="w-full h-full flex justify-center items-center pt-14">
      <div className="lg:w-[45%] max-lg:w-[80%] max-md:w-[90%] max-sm:w-[95%] flex flex-col gap-5 bg-white bg-opacity-20 backdrop-blur-md dark:bg-black dark:bg-opacity-60 dark:backdrop-blur-sm rounded-xl p-10 max-md:p-5 border border-[#ffffffb4] dark:border-[#1c223f] shadow-md">
        <header className="w-full flex flex-col items-center justify-center gap-5 mb-5">
          <h1 className="text-4xl max-md:text-3xl font-bold text-[#4285f4] block">
            Ahmed Store
          </h1>
          <h2 className="text-3xl max-md:text-2xl font-bold block">
            تغير البريد الألكتروني
          </h2>
        </header>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label htmlFor="email" className="block mb-2 text-lg font-bold">
            البريد الألكتروني
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className="w-full border border-gray-300 rounded p-2 focus:border-main bg-transparent"
          />
          {errors.email && touched.email && (
            <div className="text-error">{errors.email}</div>
          )}
          <div className="flex justify-center mt-5">
            <Button
              type="submit"
              variant="contained"
              className="w-1/2 disabled:!bg-[#285aab76]"
              disabled={
                !errors.email || !values.email || values.email === email
              }
            >
              التالي
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Verify: React.FC<IVerify> = ({ token, setRoute, refetch }) => {
  const [verifiedEmail, { isSuccess, isError, error }] =
    useVerifiedEmailMutation();
  const verificationToken = useSelector(selectVerifiedToken);
  const [clientCode, setClientCode] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      verificationToken,
      clientCode,
    };
    await verifiedEmail({ data, token });
  };

  useEffect(() => {
    if (isSuccess) {
      setRoute("update");
      refetch();
    }
    if (isError) {
      toast.error(
        (error as any).data.message || "حدث خطأ ما، يرجى المحاولة مرة أخرى."
      );
    }
  }, [error, isError, isSuccess, refetch, setRoute]);

  useEffect(() => {
    const time = 5 * 60 * 1000;
    const convert = setTimeout(() => {
      setRoute("update");
    }, time);
    return () => clearTimeout(convert);
  }, [setRoute]);

  return (
    <section className={`${verificationStyle.mainContainer}`}>
      <div className={`${verificationStyle.secondaryContainer}`}>
        <header className={`${verificationStyle.header}`}>
          <h1 className={`${verificationStyle.logo}`}>Ahmed Store</h1>
          <h2 className={`${verificationStyle.title}`}>
            تغير البريد الألكتروني
          </h2>
        </header>
        <p className={`${verificationStyle.message}`}>
          لقد أرسلنا OTP إلى عنوان بريدك الإلكتروني. الرجاء إدخال OTP أدناه.
        </p>
        <form onSubmit={handleSubmit} className={`${verificationStyle.form}`}>
          <OTPInput
            value={clientCode}
            onChange={setClientCode}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            inputStyle={`${verificationStyle.input}`}
            containerStyle={`${verificationStyle.otpContainer}`}
            shouldAutoFocus={true}
            skipDefaultStyles={true}
          />
          <div className={`${verificationStyle.btnContainer}`}>
            <Button
              variant="contained"
              className={`${verificationStyle.back}`}
              onClick={() => setRoute("update")}
            >
              رجوع
            </Button>
            <Button
              type="submit"
              variant="contained"
              className={`${verificationStyle.submit}`}
              disabled={clientCode.length < 6}
            >
              حفظ
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
