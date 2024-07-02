import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { def } from "../../styles/styles";

type Props = {
  setIsSent: Dispatch<SetStateAction<boolean>>;
};

export default function Reply({ setIsSent }: Props) {
  return (
    <div className="h-fit p-10 flex flex-col justify-center items-center gap-10 ">
      <h1 className="text-3xl font-bold font-['Reem_Kufi'] text-white">
        تم إرسال رسالتك وسنتواصل معك في أقرب وقت ممكن
      </h1>
      <div className="flex gap-3 flex-wrap">
        <Link href={"/"} className={`${def.button} block`}>
          الصفحة الرئيسية
        </Link>
        <Link
          href={"/contact-us"}
          onClick={() => setIsSent(false)}
          className={`${def.button} block bg-error hover:bg-error`}
        >
          تواصل معنا
        </Link>
      </div>
    </div>
  );
}
