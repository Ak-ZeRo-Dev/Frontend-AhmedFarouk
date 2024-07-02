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

export default function ConfirmPasswordForm({
  error,
  value,
  touched,
  handleChange,
  handleBlur,
}: Props) {
  const [isConfirmPassword, setIsConfirmPassword] = useState<boolean>(true);

  return (
    <div className="w-full h-[4.8rem] flex justify-center items-start flex-col">
      <div className="w-full relative group">
        <label
          htmlFor="confirmPassword"
          className={` ${form.label} ${value ? focusInput : null} ${
            error && touched ? inputError : null
          }`}
        >
          تأكيد كلمة المرور
        </label>
        <input
          type={isConfirmPassword ? "password" : "text"}
          name="confirmPassword"
          id="confirmPassword"
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
          onClick={() => setIsConfirmPassword((prev) => !prev)}
        >
          {isConfirmPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>
      {touched && error && (
        <span
          className={`
          ${form.span}
          ${touched && error ? "visible" : "invisible"}`}
        >
          {error}
        </span>
      )}
    </div>
  );
}
