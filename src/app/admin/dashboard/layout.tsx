import type { Metadata } from "next";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import Protected from "../../../hooks/useProtected";
import ProtectedAdmin from "../../../hooks/useProtectedAdmin";
import { store } from "../../../store/store";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "محل لصناعة المطابخ والشبابيك الالمنيوم",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Protected>
        <ProtectedAdmin>
          <Navbar />
          {children}
        </ProtectedAdmin>
      </Protected>
    </>
  );
}
