"use client";
import { AnimatePresence, Variants, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { useSelector } from "react-redux";

import { selectUser } from "../../store/features/auth/authSlice";
import { def, navBarIcons } from "../../styles/styles";
import Logout from "../auth/Logout";
import DashboardNav from "./DashboardNav";

type Props = {
  isSmall: boolean;
};

const loggedInMenu = [
  { name: "الصفحة الشخصية", url: "/profile" },
  { name: "تسجيل الخروج", url: "/logout" },
];

const defaultMenu = [
  { name: "تسجيل الدخول", url: "/login" },
  { name: "إنشاء حساب", url: "/register" },
];

const containerVariants: Variants = {
  hidden: {
    clipPath: "inset(10% 50% 90% 50% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3,
    },
  },
  open: {
    clipPath: "inset(0% 0% 0% 0% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: "inset(10% 50% 90% 50% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const MenuItem = ({ item }: any) => {
  return (
    <motion.li variants={itemVariants} className="w-full">
      {item.url === "/logout" ? (
        <Logout
          name={item.name}
          className={`hover:bg-fifth transition-colors p-2 flex items-center ${def.text} rounded-md w-full`}
        />
      ) : (
        <Link
          href={item.url}
          className={`hover:bg-fifth transition-colors p-2 flex items-center ${def.text} rounded-md w-full`}
        >
          {item.name}
        </Link>
      )}
    </motion.li>
  );
};

export default function UserState({ isSmall }: Props) {
  const user = useSelector(selectUser);
  const avatar: any = user?.avatar.url || user?.avatar;

  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isClient, setClient] = useState(false);

  const menuRef = useRef<HTMLUListElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setClient(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !toggleButtonRef.current?.contains(event.target as Node)
      ) {
        setMenuVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, toggleButtonRef]);

  const menuItems = user ? loggedInMenu : defaultMenu;

  return (
    <>
      <button
        ref={toggleButtonRef}
        className="relative"
        onClick={() => setMenuVisible((prev) => !prev)}
      >
        {isClient && avatar ? (
          <Image
            src={avatar}
            alt="avatar"
            width={100}
            height={100}
            className="w-9 h-9 cursor-pointer rounded-full"
            priority
          />
        ) : (
          <div className={navBarIcons}>
            <LuUserCircle2 />
          </div>
        )}
      </button>
      <AnimatePresence>
        {isMenuVisible && (
          <motion.ul
            ref={menuRef}
            variants={containerVariants}
            initial="hidden"
            animate="open"
            exit="closed"
            className={`h-fit flex flex-col p-2 absolute top-12 z-40 left-0 ${
              def.background
            } text-white rounded-md shadow-sm ${
              user ? "w-[10rem]" : "w-[9rem]"
            }`}
          >
            {menuItems.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
            {isSmall && (user?.role === "admin" || user?.role === "master") && (
              <DashboardNav />
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
}
