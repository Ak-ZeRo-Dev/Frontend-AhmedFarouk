import { Montserrat, Roboto } from "next/font/google";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      inset: {
        filter: "auto auto auto 0",
      },
      padding: {
        main: "3.5rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontFamily: {
        Rubik: ["var(--font-Rubik)"],
        Lemonada: ["var(--font-Lemonada)"],
        Reem_Kufi: ["var(--font-Reem_Kufi)"],
        Montserrat: ["var(--font-montserrat)"],
        Roboto: ["var(--font-roboto)"],
      },
      backgroundImage: {
        instagram:
          "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
      },
      height: {
        main: "calc(100vh + 1rem)",
        section: "calc(100vh - 3.5rem",
      },
      transformOrigin: {
        loading: "100% 70%",
        first: "100% 0",
      },
      dropShadow: {
        "offset-dark": "-8px 0 0 #262626",
        "offset-light": "-8px 0 0 white",
      },
      textColor: {
        main: "#4285f4",
        secondary: "#00215E",
        third: "#0E46A3",
        fourth: "#F6F5F2",
        secondaryLight: "#eff7fa",
        thirdLight: "#D0ECF7",
        subtitle: "#cbcbcb",
        fifth: "#0000004d",
        sixth: "#686868",
        seventh: "#313131",
        error: "#db2777",
        dark: "#19283f",
      },
      backgroundColor: {
        main: "#4285f4",
        secondary: "#00215E",
        third: "#0E46A3",
        fourth: "#F6F5F2",
        fifth: "#0000004d",
        sixth: "#686868",
        seventh: "#313131",
        dark: "#262626",
        secondaryDark: "#111827",
        error: "#db2777",
        secondaryLight: "#eff7fa",
        thirdLight: "#D0ECF7",
      },
      borderColor: {
        main: "#4285f4",
        secondary: "#00215E",
        third: "#0E46A3",
        fourth: "#F6F5F2",
        fifth: "#0000004d",
        sixth: "#686868",
        seventh: "#313131",
        dark: "#262626",
        error: "#db2777",
        secondaryLight: "#eff7fa",
        thirdLight: "#D0ECF7",
      },
      animation: {
        menuGoDown: "menuGoDown 0.5s linear",
        menuGoUp: "menuGoUp 0.3s linear",

        flashing: "flashing 0.7",
        dotMove: "dotMove 1800ms cubic-bezier(0.25,0.25,0.75,0.75) infinite",
        lineStretch:
          "lineStretch 1800ms cubic-bezier(0.25,0.25,0.75,0.75) infinite",
        letterStretch:
          "letterStretch 1800ms cubic-bezier(0.25,0.25,0.75,0.75) infinite",
      },
      keyframes: {
        menuGoDown: {
          "0%": { top: "1rem", opacity: "20%" },
          "100%": { top: "2.7rem", opacity: "100%" },
        },
        menuGoUp: {
          "0%": { top: "2.7rem", opacity: "100%" },
          "100%": { top: "1rem", opacity: "0%" },
        },

        flashing: {
          "0%, 40%": { opacity: "1" },
          "100%": {
            width: "200%",
            height: "200%",
            opacity: "0",
          },
        },
        dotMove: {
          "0%": {
            transform:
              "rotate(180deg) translate(-110px, -10px) rotate(-180deg)",
          },
          "50%": {
            transform: "rotate(0deg) translate(-111px, 10px) rotate(0deg)",
          },
          "100%": {
            transform:
              "rotate(180deg) translate(-110px, -10px) rotate(-180deg)",
          },
        },
        letterStretch: {
          "0%, 100%": {
            transform: "scale(1, 0.35)",
            transformOrigin: "100% 100%",
          },
          "8%, 28%": {
            transform: "scale(1, 2.125)",
            transformOrigin: "100% 79%",
          },
          "37%": {
            transform: "scale(1, 0.875)",
            transformOrigin: "100% 100%",
          },
          "46%": {
            transform: "scale(1, 1.03)",
            transformOrigin: "100% 100%",
          },
          "50%, 97%": {
            transform: "scale(1)",
            transformOrigin: "100% 100%",
          },
        },
        lineStretch: {
          "0%, 45%, 70%, 100%": {
            transform: "scaleY(0.125)",
          },
          "49%": {
            transform: "scaleY(0.75)",
          },
          "50%": {
            transform: "scaleY(0.875)",
          },
          "53%": {
            transform: "scaleY(0.5)",
          },
          "60%": {
            transform: "scaleY(0)",
          },
          "68%": {
            transform: "scaleY(0.18)",
          },
        },
      },
    },
  },

  plugins: [],
};
export default config;
