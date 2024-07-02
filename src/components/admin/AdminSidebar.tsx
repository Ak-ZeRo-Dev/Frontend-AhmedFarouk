"use client";

import { Typography } from "@mui/material";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { useDispatch } from "react-redux";
import { getOpen } from "../../store/slices/sidebarSlice";
import "../../styles/sidebar.css";
import Logo from "../../utils/Logo";
import Logout from "../auth/Logout";
import {
  BarChartIcon,
  ConnectWithoutContactIcon,
  DashboardCustomizeIcon,
  DashboardIcon,
  FirstPageIcon,
  FitbitIcon,
  GroupsIcon,
  HomeOutlinedIcon,
  InfoOutlinedIcon,
  LastPageIcon,
  MoreVertIcon,
  QuizIcon,
  ReceiptOutlinedIcon,
  SettingsSuggestIcon,
  StorageIcon,
  WebIcon,
  WysiwygIcon,
} from "./icons";

interface Props {
  small: boolean;
  user: IUser;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const containerVariants: Variants = {
  hidden: {
    clipPath: "inset(50% 50% 80% 10% round 10px)",
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
    clipPath: "inset(50% 50% 80% 10% round 10px)",
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

export default function AdminSidebar({ user, small, setOpen, open }: Props) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const { name, email, avatar } = user;
  const url: any = avatar.url || avatar;
  const dispatch = useDispatch<any>();

  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setCollapsed(!collapsed);
    setOpen(!open);
    dispatch(getOpen(!open));
  };

  const handelUserMenu = () => {
    setShowUserMenu((prev) => !prev);
  };

  const userMenuRef = useRef<HTMLUListElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLHtmlElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node) &&
        !toggleButtonRef.current?.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuRef, toggleButtonRef]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setCollapsed(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  useMemo(() => {
    if (small) {
      setCollapsed(true);
    }
  }, [small]);

  return (
    <Sidebar
      ref={small ? sidebarRef : null}
      rtl={true}
      toggled={true}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        zIndex: 100,
        marginTop: "3.5rem",
        height: "calc(100vh - 3.5rem)",
        width: collapsed ? "0%" : "16%",
        overflowY: "auto",
        color: "#fff",
      }}
      collapsed={collapsed}
      collapsedWidth="60px"
      width="250px"
      backgroundColor="#2d3748"
    >
      <div className="h-full flex flex-col justify-between">
        <div>
          <div
            className={`${
              !collapsed && "flex justify-between px-2"
            } w-full text-center mb-5 pt-2`}
          >
            {!collapsed && <Logo />}
            <button onClick={handleToggle}>
              {collapsed ? (
                <FirstPageIcon className="!text-3xl" />
              ) : (
                <LastPageIcon className="!text-3xl" />
              )}
            </button>
          </div>

          {<NavMenu collapsed={collapsed} />}
        </div>

        {collapsed ? (
          <div className="relative w-full flex justify-center pb-3 bg-[#2d3748]">
            <button
              ref={toggleButtonRef}
              className="relative w-10 h-10 rounded-xl overflow-hidden"
              onClick={handelUserMenu}
            >
              <Image src={url} alt="avatar" fill />
            </button>
            <AnimatePresence>
              {showUserMenu && (
                <motion.ul
                  ref={userMenuRef}
                  variants={containerVariants}
                  initial="hidden"
                  animate="open"
                  exit="closed"
                  className="text-white rounded-md shadow-smh-fit flex flex-col p-2 absolute bottom-[3.5rem] right-6 !z-[100] bg-gray-800 w-32"
                >
                  <motion.li
                    variants={itemVariants}
                    initial="hidden"
                    animate="open"
                    exit="closed"
                    className={`hover:bg-fifth transition-colors p-2 flex items-center text-white rounded-md w-full`}
                  >
                    <button
                      onClick={() =>
                        sessionStorage.setItem("profile-route", "info")
                      }
                    >
                      <Link href={"/profile"}>الحساب</Link>
                    </button>
                  </motion.li>
                  <motion.li
                    variants={itemVariants}
                    initial="hidden"
                    animate="open"
                    exit="closed"
                    className={`hover:bg-fifth transition-colors p-2 flex items-center text-white rounded-md w-full`}
                  >
                    <Logout name="تسجيل الخروج" />
                  </motion.li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="relative flex items-center justify-between gap-2 px-1 py-3 border-t-2 border-gray-700 bg-[#2d3748]">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden">
              <Image src={url} alt="avatar" fill />
            </div>
            <div className="flex-1">
              <Typography variant="subtitle1">{name}</Typography>
              <Typography variant="subtitle2">{email}</Typography>
            </div>
            <div>
              <button
                ref={toggleButtonRef}
                className={`${
                  showUserMenu && "bg-gray-600"
                } w-7 h-7 flex justify-center items-center rounded-full hover:bg-gray-800`}
                onClick={handelUserMenu}
              >
                <MoreVertIcon className="cursor-pointer" fontSize="medium" />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.ul
                    ref={userMenuRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate="open"
                    exit="closed"
                    className="text-white rounded-md shadow-smh-fit flex flex-col p-2 absolute -top-20 left-1 z-20 bg-gray-800 w-32"
                  >
                    <motion.li
                      variants={itemVariants}
                      initial="hidden"
                      animate="open"
                      exit="closed"
                      className={`hover:bg-fifth transition-colors p-2 flex items-center text-white rounded-md w-full`}
                    >
                      <button
                        onClick={() =>
                          sessionStorage.setItem("profile-route", "info")
                        }
                      >
                        <Link href={"/profile"}>الحساب</Link>
                      </button>
                    </motion.li>
                    <motion.li
                      variants={itemVariants}
                      initial="hidden"
                      animate="open"
                      exit="closed"
                      className={`hover:bg-fifth transition-colors p-2 flex items-center text-white rounded-md w-full`}
                    >
                      <Logout name="تسجيل الخروج" />
                    </motion.li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
}

function NavMenu({ collapsed }: { collapsed: boolean }) {
  const items = [
    {
      title: "البيانات",
      Icon: StorageIcon,
      menu: [
        {
          title: "المستخدمين",
          route: "/admin/dashboard/users",
          Icon: GroupsIcon,
        },
        {
          title: "المنتجات",
          route: "/admin/dashboard/products",
          Icon: DashboardIcon,
        },
        {
          title: "اضافة منتج",
          route: "/admin/dashboard/create-products",
          Icon: DashboardCustomizeIcon,
        },
      ],
    },
    {
      title: "تخصيص",
      Icon: SettingsSuggestIcon,
      menu: [
        {
          title: "الشعار",
          route: "/admin/dashboard/logo",
          Icon: FitbitIcon,
        },
        {
          title: "الصور",
          route: "/admin/dashboard/images",
          Icon: WebIcon,
        },
        {
          title: "الفئات",
          route: "/admin/dashboard/categories",
          Icon: WysiwygIcon,
        },
        {
          title: "من نحن",
          route: "/admin/dashboard/about",
          Icon: ReceiptOutlinedIcon,
        },
        {
          title: "المعلومات",
          route: "/admin/dashboard/info",
          Icon: InfoOutlinedIcon,
        },

        {
          title: "وسائل التواصل",
          route: "/admin/dashboard/social",
          Icon: ConnectWithoutContactIcon,
        },

        {
          title: "الاسئلة الشائعة",
          route: "/admin/dashboard/faq",
          Icon: QuizIcon,
        },
      ],
    },
    {
      title: "تحليل",
      Icon: BarChartIcon,
      menu: [
        {
          title: "test",
          route: "/admin/dashboard/",
          Icon: WebIcon,
        },
      ],
    },
  ];

  const menu = items.map((item) => (
    <SubMenu
      key={item.title}
      label={item.title}
      icon={collapsed && <item.Icon />}
      defaultOpen={true}
    >
      {item.menu.map((ele) => (
        <MenuItem key={ele.title} icon={<ele.Icon />}>
          <Link href={ele.route}>{ele.title}</Link>
        </MenuItem>
      ))}
    </SubMenu>
  ));

  return (
    <Menu
      menuItemStyles={{
        root: {
          background: "#2d3748",
        },
        button: {
          gap: "3px",
          paddingRight: "13px",
          transition: "all 0.3s ease-in-out",
          ":hover": {
            backgroundColor: "rgb(55 65 81)",
            paddingRight: "17px",
            color: "#4285f4",
          },
        },
        icon: {
          marginLeft: 0,
        },
      }}
    >
      <MenuItem icon={<HomeOutlinedIcon />}>لوحة التحكم</MenuItem>
      {menu}
    </Menu>
  );
}
