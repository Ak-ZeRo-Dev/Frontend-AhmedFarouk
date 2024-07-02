import React from "react";
import { contactInput, form, inputError, spanError } from "../../styles/styles";

type Props = {
  error: string | undefined;
  value: string | undefined;
  touched: boolean | undefined;
  handleChange: any;
  handleBlur: any;
};

export default function PhoneContact({
  error,
  value,
  touched,
  handleChange,
  handleBlur,
}: Props) {
  return (
    <div className="flex flex-col h-[4.5rem]  w-[70%]">
      <label htmlFor="phoneNumber" className="mb-2 text-lg text-white">
        رقم التليفون
      </label>
      <input
        type="text"
        inputMode="numeric"
        id="phoneNumber"
        className={`w-1/2 max-lg:w-[90%] h-8 ${contactInput} text-white ${
          error && touched ? inputError : null
        }`}
        autoSave="true"
        autoComplete="true"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
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
