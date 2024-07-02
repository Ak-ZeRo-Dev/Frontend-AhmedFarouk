"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import { navBarIcons } from "../styles/styles";
import { useDispatch } from "react-redux";
import { getTheme } from "../store/features/user/userSlice";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      dispatch(getTheme(theme));
    }
  }, [dispatch, mounted, theme]);

  !mounted && null;
  return (
    <div className={`${navBarIcons}`}>
      {theme === "light" ? (
        <BiMoon onClick={() => setTheme("dark")} />
      ) : (
        <BiSun onClick={() => setTheme("light")} />
      )}
    </div>
  );
}
