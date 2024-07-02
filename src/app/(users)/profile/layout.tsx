import type { Metadata } from "next";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/navbar/Navbar";
import Protected from "../../../hooks/useProtected";

export const metadata: Metadata = {
  title: "Profile",
  description: "محل لصناعة المطابخ والشبابيك الالمنيوم",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Protected>
        <Navbar />
        {children}
        <Footer />
      </Protected>
    </>
  );
}
