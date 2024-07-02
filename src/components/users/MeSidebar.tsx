"use client";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LastPageIcon from "@mui/icons-material/LastPage";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { Typography } from "@mui/material";
import { AnimatePresence, Variants, motion } from "framer-motion";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import "../../styles/sidebar.css";
import { def } from "../../styles/styles";
import Logo from "../../utils/Logo";
import Logout from "../auth/Logout";

interface Props {
  route: string;
  small: boolean;
  user: IUser;
  items?: any;
  setRoute: Dispatch<SetStateAction<string>>;
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

export default function MeSidebar({ user, small, route, setRoute }: Props) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const { name, email, avatar } = user;
  const url: any = avatar.url || avatar;

  const handleToggle = () => {
    setCollapsed(!collapsed);
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
      collapsed={collapsed}
      backgroundColor="#2d3748"
      collapsedWidth="60px"
      width="250px"
      className="max-md:!absolute max-md:!top-0 max-md:!right-0 max-md:!z-40 max-md:!pt-main min-h-screen !rounded-e-xl !border-none"
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

          {<NavMenu setRoute={setRoute} collapsed={collapsed} route={route} />}
        </div>

        {collapsed ? (
          <div className="relative w-full flex justify-center pb-3">
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
                    className={`hover:bg-fifth transition-colors p-2 flex items-center ${def.text} rounded-md w-full`}
                  >
                    <button onClick={() => setRoute("info")}>الحساب</button>
                  </motion.li>
                  <motion.li
                    variants={itemVariants}
                    initial="hidden"
                    animate="open"
                    exit="closed"
                    className={`hover:bg-fifth transition-colors p-2 flex items-center ${def.text} rounded-md w-full`}
                  >
                    <Logout name="تسجيل الخروج" />
                  </motion.li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="relative flex items-center justify-between gap-2 px-1 py-3 border-t-2 border-gray-700">
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
                      className={`hover:bg-fifth transition-colors p-2 flex items-center ${def.text} rounded-md w-full`}
                    >
                      <button onClick={() => setRoute("info")}>الحساب</button>
                    </motion.li>
                    <motion.li
                      variants={itemVariants}
                      initial="hidden"
                      animate="open"
                      exit="closed"
                      className={`hover:bg-fifth transition-colors p-2 flex items-center ${def.text} rounded-md w-full`}
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

function NavMenu({
  route,
  setRoute,
  collapsed,
}: {
  route: string;
  collapsed: boolean;
  setRoute: Dispatch<SetStateAction<string>>;
}) {
  const items = [
    {
      title: "الحساب",
      menu: [
        {
          title: "حسابي",
          route: "info",
          Icon: AccountCircleOutlinedIcon,
        },
        {
          title: "المفضلة",
          route: "favorite",
          Icon: FavoriteBorderOutlinedIcon,
        },
      ],
    },
    {
      title: "الاعدادت",
      menu: [
        {
          title: "تغير معلومات الحساب",
          route: "edit-info",
          Icon: InfoOutlinedIcon,
        },
        {
          title: "تغير البريد الألكتروني",
          route: "edit-email",
          Icon: EmailOutlinedIcon,
        },
        {
          title: "تغير كلمة المرور",
          route: "edit-password",
          Icon: LockOutlinedIcon,
        },
        {
          title: "حذف الحساب",
          route: "delete-account",
          Icon: PersonRemoveOutlinedIcon,
        },
      ],
    },
  ];

  const menu = items.map((item) => (
    <SubMenu key={item.title} label={item.title} defaultOpen={true}>
      {item.menu.map((ele) => (
        <MenuItem
          key={ele.title}
          icon={<ele.Icon />}
          onClick={() => setRoute(ele.route)}
          className={`${ele.route === route && "text-main"}`}
        >
          {ele.title}
        </MenuItem>
      ))}
    </SubMenu>
  ));

  const collapsedSidebar = items.map((item) =>
    item.menu.map((ele) => (
      <MenuItem
        key={ele.title}
        icon={<ele.Icon />}
        onClick={() => setRoute(ele.route)}
        className={`${ele.route === route && "text-main"}`}
      >
        {ele.title}
      </MenuItem>
    ))
  );

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
      {collapsed ? collapsedSidebar : menu}
    </Menu>
  );
}
