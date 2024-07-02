import React from "react";
import { contactInput, form, inputError, spanError } from "../../styles/styles";

type Props = {
  error: string | undefined;
  value: string | undefined;
  touched: boolean | undefined;
  handleChange: any;
  handleBlur: any;
};

export default function MessageContact({
  error,
  value,
  touched,
  handleChange,
  handleBlur,
}: Props) {
  return (
    <div className="flex flex-col  w-full   h-40">
      <label htmlFor="message" className="mb-2 text-lg text-white">
        رسالتك {<span className="text-error text-md">*</span>}
      </label>
      <textarea
        name="message"
        id="message"
        className={`${contactInput} h-28 text-white ${
          error && touched ? inputError : null
        }`}
        autoSave="true"
        autoComplete="true"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      ></textarea>
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
