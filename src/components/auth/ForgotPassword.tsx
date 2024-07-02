"use client";
import { useState } from "react";
import ForgotForm from "./ForgotForm";
import VerificationForgot from "./VerificationForgot";

export default function ForgotPassword() {
  const [route, setRoute] = useState<string>(
    () => sessionStorage.getItem("verificationRoute") || "forgot-password"
  );

  return (
    <section
      className={`flex flex-col gap-5 justify-center items-center h-screen w-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1`}
    >
      {route === "forgot-password" && <ForgotForm setRoute={setRoute} />}

      {route === "verification" && <VerificationForgot setRoute={setRoute} />}
    </section>
  );
}
