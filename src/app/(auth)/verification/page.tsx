import type { Metadata } from "next";
import Verification from "../../../components/auth/Verification";

export const metadata: Metadata = {
  title: "Verification",
};

type Props = {};

export default async function page({}: Props) {
  return <Verification />;
}
