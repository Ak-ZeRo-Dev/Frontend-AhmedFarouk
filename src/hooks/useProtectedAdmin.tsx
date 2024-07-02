"use client";
import { useSelector } from "react-redux";
import { AdminRequired } from "../lib/exceptions";
import { selectToken, selectUser } from "../store/features/auth/authSlice";

export default function ProtectedAdmin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const isAuthenticated =
    user &&
    token &&
    (user.role.toLowerCase() === "admin" ||
      user.role.toLowerCase() === "master")
      ? true
      : false;

  if (isAuthenticated) {
    return children;
  } else {
    throw new AdminRequired();
  }
}
