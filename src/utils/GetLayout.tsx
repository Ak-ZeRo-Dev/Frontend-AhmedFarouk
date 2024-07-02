"use client";
import { Dispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setAbout,
  setCategories,
  setData,
  setImages,
  setInfo,
  setLogo,
  setSocial,
} from "../store/features/layout/layoutSlice";

export default function GetLayout({ layout }: { layout: any }) {
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    if (layout.layout.length > 0) {
      dispatch(setData(layout.layout));
    }
  }, [dispatch, layout]);

  useEffect(() => {
    dispatch(setLogo());
    dispatch(setCategories());
    dispatch(setSocial());
    dispatch(setImages());
    dispatch(setInfo());
    dispatch(setAbout());
  }, [dispatch]);
  return null;
}
