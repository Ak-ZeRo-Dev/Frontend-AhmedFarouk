"use client";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../../store/features/auth/authApi";
import { selectToken } from "../../store/features/auth/authSlice";
import { IconType } from "react-icons/lib";

type Props = {
  Icon?: IconType;
  name: string;
  className?: string;
  style?: React.CSSProperties;
  iconStyle?: string;
};

export default function Logout({
  name,
  Icon,
  className,
  style,
  iconStyle,
}: Props) {
  const router = useRouter();
  const accessToken = useSelector(selectToken);
  const [logout, { isSuccess }] = useLogoutMutation();

  const handleLogout = async () => {
    if (localStorage.getItem("isRemember")) {
      localStorage.removeItem("isRemember");
    }
    await signOut({ redirect: true, callbackUrl: "/" });
    logout({ accessToken });
  };

  return (
    <button className={className} onClick={handleLogout} style={style}>
      {Icon && (
        <span>
          <Icon className={iconStyle} />
        </span>
      )}
      {name && name}
    </button>
  );
}
