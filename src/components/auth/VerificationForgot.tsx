"use client";
import { Dispatch } from "@reduxjs/toolkit";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Dispatch as Dis,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import OtpInput from "react-otp-input";
import toast from "react-hot-toast";
import { verificationStyle, def } from "../../styles/styles";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/features/auth/authSlice";
import { useConfirmChangedPasswordMutation } from "../../store/features/auth/authApi";
import { Button } from "@mui/material";
import Image from "next/image";
import { selectVerificationImage } from "../../store/features/layout/layoutSlice";

type Props = {
  setRoute: Dis<SetStateAction<string>>;
};

export default function VerificationForgot({ setRoute }: Props) {
  const router = useRouter();
  const image = useSelector(selectVerificationImage);
  const [clientCode, setClientCode] = useState("");
  const [isClient, setIsClient] = useState<boolean>(false);

  const forgotToken = useSelector(selectToken);

  const [confirmChangedPassword, { isSuccess, isError, error }] =
    useConfirmChangedPasswordMutation();

  const handelSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await confirmChangedPassword({
      forgotToken,
      clientCode,
    });
  };

  useEffect(() => {
    const time = 5 * 60 * 1000;
    const convert = setTimeout(() => {
      setRoute("forgot-password");

      if (sessionStorage.getItem("verificationRoute")) {
        sessionStorage.removeItem("verificationRoute");
      }
    }, time);
    return () => clearTimeout(convert);
  }, [setRoute]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
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
    <section className="w-screen h-screen flex justify-center items-center">
      {isClient && image && (
        <Image
          src={image}
          alt="background form image."
          width={0}
          height={0}
          sizes="100vw"
          priority
          className="h-screen w-screen"
        />
      )}
      <motion.div
        animate={{
          translate: "1, 2",
        }}
        className={`${verificationStyle.verifyContainer}`}
      >
        <div className={`${verificationStyle.secondVerifyContainer}`}>
          <header className={`${verificationStyle.header}`}>
            <h1 className={`${verificationStyle.logo}`}>Ahmed Store</h1>
            <h2 className={`${verificationStyle.title}`}>تفعيل الحساب</h2>
          </header>
          <p className={`${verificationStyle.message}`}>
            لقد أرسلنا OTP إلى عنوان بريدك الإلكتروني. الرجاء إدخال OTP أدناه.
          </p>
          <form onSubmit={handelSubmit} className={`${verificationStyle.form}`}>
            <OtpInput
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
                onClick={() => setRoute("forgot-password")}
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
      </motion.div>
    </section>
  );
}
