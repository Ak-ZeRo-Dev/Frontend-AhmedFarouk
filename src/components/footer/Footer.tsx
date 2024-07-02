"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaAngleDoubleLeft, FaMapMarkerAlt, FaRegClock } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectInfo } from "../../store/features/layout/layoutSlice";
import { selectIsSmall } from "../../store/features/user/userSlice";
import { selectIsOpen } from "../../store/slices/sidebarSlice";
import { IInfo } from "../../types/layout";
import Logo from "../../utils/Logo";
import Social from "../../utils/Social";

const Information: React.FC<{ info: IInfo }> = ({ info }) => {
  const {
    address,
    phoneNumbers,
    workHours: { from, to },
  } = info;

  return (
    <ul className="flex flex-col  max-md:w-full max-md:items-center  gap-4">
      <li className="flex items-center gap-2 flex-wrap border-b border-b-slate-300 pb-3">
        <FaMapMarkerAlt className="text-[#4285f4] text-xl" />
        {address}
      </li>
      <li className="flex items-center gap-2 flex-wrap border-b border-b-slate-300 pb-3">
        <FaRegClock className="text-[#4285f4] text-xl" />
        ساعات العمل: من {from} الي {to}
      </li>
      <li className="flex items-center gap-2 flex-wrap pb-3 ">
        <BiSolidPhoneCall className="text-[#4285f4] text-xl" />
        <div className="grid grid-rows-2 grid-flow-col gap-x-5">
          {phoneNumbers.map((number: string, index: number) => {
            return number.includes("+") ? (
              <p key={index} className="flex items-center">
                {number.slice(number.indexOf("+") + 1)}
                <span>{number.charAt(number.indexOf("+"))}</span>{" "}
              </p>
            ) : (
              <p key={index}>{number}</p>
            );
          })}
        </div>
      </li>
    </ul>
  );
};

const Support: React.FC = () => {
  const list = [
    {
      title: "من نحن",
      route: "/about",
    },
    {
      title: "اتصل بنا",
      route: "/contact-us",
    },
    {
      title: "أسئلة مكررة",
      route: "/faq",
    },
  ];
  return (
    <ul className="flex flex-col gap-4 w-[10%] max-md:w-full max-md:items-center">
      {list.map((ele) => (
        <li
          key={ele.title}
          className="flex items-center gap-2 border-b border-b-slate-300 pb-3 hover:pr-4 hover:text-[#4285f4] transition-all"
        >
          <FaAngleDoubleLeft className="text-[#4285f4]" />
          <Link href={ele.route}>{ele.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default function Footer({ sidebar = false }: { sidebar?: boolean }) {
  const date: number = new Date(Date.now()).getFullYear();

  const info: IInfo = useSelector(selectInfo);
  const small = useSelector(selectIsSmall);
  const open = useSelector(selectIsOpen);

  const [contentMargin, setContentMargin] = useState<string>("");
  const [client, setClient] = useState<boolean>(false);

  useEffect(() => {
    setClient(true);
  }, []);
  useEffect(() => {
    if (sidebar) {
      setContentMargin(
        !small && open ? "mr-[250px]" : !small || small ? "mr-[60px]" : ""
      );
    }
  }, [open, sidebar, small]);

  return (
    <footer
      className={`pt-5 z-10 bg-secondaryLight dark:bg-fifth transition-all duration-300 ${contentMargin} }`}
    >
      <div className="flex flex-wrap  max-md:justify-center  justify-around  items-center max-md:gap-10">
        <div className="flex flex-col gap-5 items-center max-lg:justify-center ">
          <Logo />
          <Social style="bg-seventh text-xl w-10 h-10" />
        </div>
        {client && info && <Information info={info} />}

        <Support />
      </div>

      <div className="flex justify-center items-center h-12 border-t border-slate-300">
        <p>
          جميع الحقوق محفوظة &copy; {date === 2024 ? date : date + "-" + 2024}{" "}
          <span className="text-main">Ahmed Store</span>
        </p>
      </div>
    </footer>
  );
}
