"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";

export default function NotFound() {
  const router = useRouter();
  return (
    <section className="w-screen h-screen flex justify-center items-center">
      <div className="flex justify-center items-center flex-col gap-5 text-dark dark:text-white leading-normal">
        <div className="flex justify-center items-center flex-col h-72">
          <h3 className="text-base font-bold font-Rubik  pl-10 -mb-24">
            الصفحة غير موجودة !
          </h3>
          <h1 className="font-Montserrat text-[250px] font-black uppercase tracking-[-40px] -ml-5">
            {[4, 0, 4].map((num) => (
              <span
                key={num}
                className="drop-shadow-offset-light dark:drop-shadow-offset-dark"
              >
                {num}
              </span>
            ))}
          </h1>
          <h3 className="text-base font-bold font-Rubik -mt-16">
            نحن آسفون، ولكن الصفحة التي طلبتها لم يتم العثور عليها
          </h3>
        </div>
        <div className="flex justify-between gap-16">
          <button
            onClick={() => router.back()}
            className="flex justify-center items-center text-main font-bold text-base hover:text-fourth transition-colors duration-300"
          >
            <IoIosArrowForward fontSize={20} />
            <span className="text-lg font-bold pb-2">رجوع</span>
          </button>
          <Link
            href={"/"}
            className="bg-main font-bold text-lg hover:bg-secondary transition-colors duration-300 p-4 rounded-[2rem]"
          >
            الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </section>
  );
}
