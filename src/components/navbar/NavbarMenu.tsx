"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
type Props = {
  isMenuVisible: boolean;
};

type MenuItem = {
  url: string;
  label: string;
};

const menuItems: MenuItem[] = [
  { url: "/", label: "الصفحة الرئيسية" },
  { url: "/products", label: "الأعمال" },
  { url: "/about", label: "من نحن" },
  { url: "/contact-us", label: "اتصل بنا" },
];

const getClassName = (isOpen: boolean) => {
  if (isOpen) {
    return "max-lg:opacity-100 max-lg:animate-menuGoDown";
  }
  return "max-lg:opacity-0 max-lg:pointer-events-none max-lg:animate-menuGoUp";
};

const getLinkClassName = (currentPage: string, url: string) => {
  if (currentPage === url) {
    return "before:!right-0 !text-secondary";
  }
  return null;
};

export default function NavbarMenu({ isMenuVisible }: Props) {
  const path = usePathname() as string;

  return (
    <ul
      className={`flex lg:gap-5 max-lg:flex-col max-lg:w-screen max-lg:absolute max-lg:top-[2.7rem] max-lg:-right-5  max-lg:bg-main ${getClassName(
        isMenuVisible
      )}`}
    >
      {menuItems.map((item, index) => (
        <li
          key={index}
          className="w-fit max-lg:w-full h-14 relative overflow-hidden max-lg:dark:border-b max-lg:dark:border-b-fifth"
        >
          <Link
            href={item.url}
            className={`w-full h-full text-lg flex justify-center max-lg:justify-start items-center px-2 hover:text-secondary transition-all duration-300 before:absolute lg:before:bottom-0 max-lg:before:bottom-0  before:-right-full hover:before:right-0 before:w-full before:h-1 before:bg-secondary before:transition-all before:duration-300 ${getLinkClassName(
              path,
              item.url
            )}  max-lg:pr-3 max-lg:hover:pr-7`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
