import React from "react";
import { contactInput, form, inputError, spanError } from "../../styles/styles";

type Props = {
  error: string | undefined;
  value: string | undefined;
  touched: boolean | undefined;
  handleChange: any;
  handleBlur: any;
};

export default function NameContact({
  error,
  value,
  touched,
  handleChange,
  handleBlur,
}: Props) {
  return (
    <div className="flex flex-col w-1/2 h-16 max-lg:w-full">
      <label htmlFor="name" className="mb-2 text-lg text-white">
        الأسم {<span className="text-error text-md">*</span>}
      </label>
      <input
        type="text"
        id="name"
        className={`w-[70%] max-lg:w-[50%] h-8 ${contactInput} text-white ${
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
