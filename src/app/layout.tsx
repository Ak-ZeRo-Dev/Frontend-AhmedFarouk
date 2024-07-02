import type { Metadata } from "next";

import StoreProvider from "../utils/StoreProvider";
import ThemeProvider from "../utils/ThemeProvider";

import { Lemonada, Reem_Kufi, Rubik } from "next/font/google";

import { def } from "../styles/styles";
import "./globals.css";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
// import "react-hot-toast/dist/react-hot-toast.css";
import getLayout from "../lib/getLayout";
import "../styles/react-hot-toast.css";
import AuthProvider from "../utils/AuthProvider";
import GetClientWidth from "../utils/GetClientWidth";
import GetLayout from "../utils/GetLayout";

export const metadata: Metadata = {
  title: "Ahmed Store",
  description: "محل لصناعة المطابخ والشبابيك الالمنيوم",
};

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rubik",
});

const lemonada = Lemonada({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-lemonada",
});
const reem_kufi = Reem_Kufi({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-reem_kufi",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const layout = await getLayout();
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`relative ${rubik.variable} ${lemonada.variable} ${reem_kufi.variable} ${def.background} ${def.text}`}
      >
        <StoreProvider>
          <GetClientWidth />
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem={true}
            >
              <GetLayout layout={layout} />
              {children}
              <Toaster
                position="bottom-center"
                containerStyle={{
                  width: "fit",
                }}
              />
            </ThemeProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
