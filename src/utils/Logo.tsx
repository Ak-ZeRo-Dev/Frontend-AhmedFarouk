"use client";
import { Typography } from "@mui/material";
import { Dispatch } from "@reduxjs/toolkit";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getLogo, selectLogo } from "../store/features/layout/layoutSlice";
import { useEffect } from "react";

type Props = {
  className?: string;
};

export default function Logo({ className = "" }: Props) {
  const logo = useSelector(selectLogo);

  if (logo) {
    const { text, image } = logo;
    if (text) {
      return (
        <Typography
          variant="h5"
          className={className ? className : "text-main !font-bold"}
        >
          <Link href={"/"}>{text}</Link>
        </Typography>
      );
    }

    if (image) {
      return (
        <Link href={"/"}>
          <Image src={image.url} alt="logo-image" fill={true} />
        </Link>
      );
    }
  }

  if (!logo) {
    return (
      <Typography
        variant="h5"
        className={className ? className : "text-main !font-bold"}
      >
        <Link href={"/"}>Ahmed Store</Link>
      </Typography>
    );
  }

  return null;
}
