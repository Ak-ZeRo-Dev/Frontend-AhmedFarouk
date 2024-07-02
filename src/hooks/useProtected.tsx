"use client";
import { useSelector } from "react-redux";
import { AuthRequired } from "../lib/exceptions";
import { selectToken, selectUser } from "../store/features/auth/authSlice";

export default function Protected({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  const isAuthenticated = user && token ? true : false;

  if (isAuthenticated) {
    return children;
  } else {
    throw new AuthRequired();
  }
}
