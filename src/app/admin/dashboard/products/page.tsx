import React from "react";
import AdminProducts from "../../../../components/admin/products/AdminProducts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Products",
};

export default function page() {
  return <AdminProducts />;
}
