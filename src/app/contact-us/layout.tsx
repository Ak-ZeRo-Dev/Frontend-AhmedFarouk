import type { Metadata } from "next";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "محل لصناعة المطابخ والشبابيك الالمنيوم",
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
