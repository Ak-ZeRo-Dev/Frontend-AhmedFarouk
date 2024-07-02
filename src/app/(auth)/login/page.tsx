import type { Metadata } from "next";
import Login from "../../../components/auth/Login";

export const metadata: Metadata = {
  title: "Login",
};

export default async function page() {
  return <Login />;
}
