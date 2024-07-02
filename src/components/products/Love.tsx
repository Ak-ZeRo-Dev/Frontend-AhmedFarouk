"use client";
import React, { useCallback, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  useAddLoveMutation,
  useRemoveLoveMutation,
} from "../../store/features/user/userApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../../styles/love.css";

type ILove = {
  user: IUser | null;
  token: string;
  productId: string;
  refetchProducts: () => void;
  refetchUser: () => void;
};

export default function Love({
  user,
  token,
  productId,
  refetchProducts,
  refetchUser,
}: ILove) {
  const router = useRouter();

  const [
    addLove,
    { isSuccess: isAdded, isError: isAddError, error: addError },
  ] = useAddLoveMutation();

  const [
    removeLove,
    { isSuccess: isRemoved, isError: isRemoveError, error: removeError },
  ] = useRemoveLoveMutation();

  useEffect(() => {
    if (isAdded || isRemoved) {
      refetchProducts();
      refetchUser();
    }
  }, [isAdded, isRemoved, refetchProducts, refetchUser]);

  useEffect(() => {
    if (isAddError) {
      toast.error((addError as any).data.message);
    }
    if (isRemoveError) {
      toast.error((removeError as any).data.message);
    }
  }, [isAddError, addError, isRemoveError, removeError]);

  const handleAddLove = useCallback(
    () => addLove({ productId, token }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [addLove]
  );

  const handleRemoveLove = useCallback(
    () => removeLove({ productId, token }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [removeLove]
  );

  const handelUnAuth = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "تم رفض الوصول",
      text: "الرجاء تسجيل الدخول للوصول إلى هذه الميزات.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "تسجيل الدخول",
      cancelButtonText: "إلغاء",
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        confirmButton: "custom-swal-confirm-button",
        cancelButton: "custom-swal-cancel-button",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/login");
      }
    });
  };

  return (
    <div className="absolute top-1 left-1 text-2xl text-red-500 font-bold z-20">
      {user ? (
        user.love.includes(productId) ? (
          <button onClick={handleRemoveLove}>
            <FaHeart fill="red" />
          </button>
        ) : (
          <button onClick={handleAddLove}>
            <FaRegHeart fill="red" />
          </button>
        )
      ) : (
        <button onClick={handelUnAuth}>
          <FaRegHeart fill="red" />
        </button>
      )}
    </div>
  );
}
