"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useWindowSize } from "react-use";
import { getClientWidth } from "../store/features/user/userSlice";

export default function GetClientWidth() {
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClientWidth(width));
  }, [dispatch, width]);
  return null;
}
