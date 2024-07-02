"use client";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import UserNav from "./UserNav";
import NavbarMenu from "./NavbarMenu";
import Search from "../search/Search";
import ThemeSwitcher from "../../utils/ThemeSwitcher";
import DashboardNav from "./DashboardNav";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiOutlineXMark } from "react-icons/hi2";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/features/auth/authSlice";
import Logo from "../../utils/Logo";

export default function Navbar() {
  const user = useSelector(selectUser);

  const { width: windowWidth } = useWindowSize(0);
  const [isClient, setIsClient] = useState<boolean>(false);

  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <nav className="container">
      {isClient && (
        <div
          className={`flex justify-between items-center fixed z-50 w-full h-14 px-5 bg-main text-fourth`}
        >
          <div className="relative flex gap-5 items-center">
            <Logo className="text-white !font-bold" />
            <NavbarMenu isMenuVisible={isMenuVisible} />
          </div>

          <div className="flex items-center gap-2">
            {windowWidth > 1024 &&
              (user?.role === "admin" || user?.role === "master") && (
                <DashboardNav />
              )}

            <Search />
            <ThemeSwitcher />
            <UserNav isSmall={windowWidth < 1024} />

            {windowWidth < 1024 && (
              <button
                className="text-2xl font-bold"
                onClick={() => setIsMenuVisible((prev) => !prev)}
              >
                {!isMenuVisible ? <RxHamburgerMenu /> : <HiOutlineXMark />}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
