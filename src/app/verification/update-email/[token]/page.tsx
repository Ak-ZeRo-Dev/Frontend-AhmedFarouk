"use client";
import React, { useEffect } from "react";
import { useVerifyUpdateUserEmailMutation } from "../../../../store/features/admin/adminApi";
import { useSelector } from "react-redux";
import { selectToken } from "../../../../store/features/auth/authSlice";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

type Props = {
  params: { token: string };
};
const MySwal = withReactContent(Swal);
export default function Page({ params: { token: VerificationToken } }: Props) {
  const router = useRouter();
  const token = useSelector(selectToken);
  const [verifyUpdateUserEmail, { isSuccess, isError, error }] =
    useVerifyUpdateUserEmailMutation();

  useEffect(() => {
    if (VerificationToken) {
      verifyUpdateUserEmail({ token, VerificationToken });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [VerificationToken]);

  useEffect(() => {
    let timeout: any;
    if (isSuccess) {
      MySwal.fire({
        title: "تم تغير البريد الألكتروني",
        icon: "success",
        confirmButtonText: "الصفحة الرئسية",
      }).then((res) => {
        if (res && res.isConfirmed) {
          router.push("/");
        }
      });

      timeout = setTimeout(() => {
        router.push("/");
      }, 5 * 60 * 1000);
    }

    return () => clearTimeout(timeout);
  }, [isSuccess, router]);

  useEffect(() => {
    let timeout: any;
    if (isError) {
      MySwal.fire({
        title: "حدث خطأ!",
        text:
          (error as any).data.message || "حدث خطأ ما! برجاء المحاولة لاحقا.",
        icon: "error",
        iconColor: "red",
        confirmButtonText: "الصفحة الرئسية",
        cancelButtonText: "حاول مرة اخرى",
        showCancelButton: true,
      }).then((res) => {
        if (res && res.isConfirmed) {
          router.push("/");
        }
        if (res.isDismissed) {
          router.refresh();
        }
      });
      timeout = setTimeout(() => {
        window.close();
      }, 5 * 60 * 1000);
    }
    return () => clearTimeout(timeout);
  }, [error, isError, router]);

  return <div></div>;
}
