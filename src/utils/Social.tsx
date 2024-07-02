"use client";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { RiTwitterXLine } from "react-icons/ri";
import getLayout from "../lib/getLayout";
import { getSocial, selectSocial } from "../store/features/layout/layoutSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

type Props = {
  style?: string;
  socialTypes?: string[] | "all";
};

export const getSocialIconColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "facebook":
    case "linkedin":
      return "hover:bg-[#1877f2]";
    case "youtube":
      return "hover:bg-red-800";
    case "twitter":
      return "hover:bg-black";
    case "instagram":
      return "hover:bg-instagram";
    case "whatsapp":
      return "hover:bg-[#3FE05C]";
    default:
      return "hover:bg-[#1877f2]";
  }
};

export const getSocialIcon = (type: string) => {
  switch (type) {
    case "facebook":
      return <FaFacebookF />;
    case "gmail":
      return <BiLogoGmail className="gmail-icon" />;
    case "twitter":
      return <RiTwitterXLine />;
    case "linkedin":
      return <FaLinkedin />;
    case "youtube":
      return <FaYoutube />;
    case "instagram":
      return <FaInstagram />;
    case "whatsapp":
      return <FaWhatsapp />;
    default:
      return null;
  }
};

export default function Social({ style = "", socialTypes = "all" }: Props) {
  const social = useSelector(selectSocial);

  return (
    <ul className="text-white flex justify-center items-center gap-3 ">
      {social.map((ele: any) => {
        if (socialTypes.includes(ele.type) || socialTypes === "all") {
          return (
            <li key={ele._id}>
              <Link
                href={ele.url}
                className={`${style} transition-colors flex justify-center items-center ${getSocialIconColor(
                  ele.type
                )}`}
              >
                {getSocialIcon(ele.type)}
              </Link>
            </li>
          );
        }
      })}
    </ul>
  );
}
