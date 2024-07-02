"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useSocialAuthMutation } from "../../store/features/auth/authApi";
import { selectUser } from "../../store/features/auth/authSlice";

export default function SocialAuth() {
  const router = useRouter();
  const { data } = useSession();
  const user = useSelector(selectUser);
  const [socialAuth, { isSuccess, isError, error }] = useSocialAuthMutation();

  useEffect(() => {
    if (!user) {
      if (data) {
        const userData = {
          name: data.user?.name as string,
          email: data.user?.email as string,
          avatar: data.user?.image as string,
        };
        socialAuth(userData);
      }
    }
  }, [data, socialAuth, user]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
    } else if (isError) {
      toast.error(
        (error as any).data.message || "حدث خطأ ما، يرجى المحاولة مرة أخرى."
      );
    }
  }, [error, isError, isSuccess, router]);

  return (
    <div className="text-center">
      <p className="text-sixth dark:text-white mb-5 max-md:mb-1 text-base max-lg:text-white">
        تسجيل الدخل بــ
      </p>
      <div className="flex gap-4 justify-center text-3xl">
        <FaXTwitter
          onClick={() => signIn("twitter")}
          className="text-black dark:text-white cursor-pointer"
        />
        <FaFacebook
          onClick={() => signIn("facebook")}
          className={`text-main cursor-pointer`}
        />
        <FcGoogle
          onClick={() => signIn("google")}
          className={`cursor-pointer`}
        />
      </div>
    </div>
  );
}
