"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { focusInput, form, inputError } from "../../../styles/styles";

type Props = {
  error: string | undefined;
  value: string | undefined;
  touched: boolean | undefined;
  handleChange: any;
  handleBlur: any;
};

export default function PasswordForm({
  error,
  value,
  touched,
  handleChange,
  handleBlur,
}: Props) {
  const [isPassword, setIsPassword] = useState<boolean>(true);

  return (
    <div className="w-full h-20 flex justify-center items-start flex-col">
      <div className="w-full relative group">
        <label
          htmlFor="password"
          className={` ${form.label} ${value ? focusInput : null} ${
            error && touched ? inputError : null
          }`}
        >
          كلمة المرور
        </label>
        <input
          type={isPassword ? "password" : "text"}
          name="password"
          id="password"
          autoSave="true"
          autoComplete="true"
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          className={`${form.input}
          ${touched && error ? `${inputError}` : null}`}
        />
        <span
          className=" absolute left-3 top-1/2 -translate-y-1/2 text-xl cursor-pointer"
          onClick={() => setIsPassword((prev) => !prev)}
        >
          {isPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>
      {touched && error ? (
        <span
          className={`
          ${form.span}
          ${touched && error ? "visible" : "invisible"}`}
        >
          {error}
        </span>
      ) : null}
    </div>
  );
}
