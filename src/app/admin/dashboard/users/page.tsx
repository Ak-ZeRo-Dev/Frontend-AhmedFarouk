import React from "react";
import AdminUsers from "../../../../components/admin/users/AdminUsers";
import DashboardSidebar from "../../../../components/admin/AdminSidebar";
import Heading from "../../../../utils/Heading";
import type { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "Admin - Users",
};

export default function page({}: Props) {
  return (
    <>
      <AdminUsers />
    </>
  );
}
