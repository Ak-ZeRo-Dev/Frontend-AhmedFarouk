import { contactInput, form, inputError } from "../../styles/styles";

type Props = {
  error: string | undefined;
  value: string | undefined;
  touched: boolean | undefined;
  handleChange: any;
  handleBlur: any;
};

export default function EmailContact({
  error,
  value,
  touched,
  handleChange,
  handleBlur,
}: Props) {
  return (
    <div className="flex flex-col h-16  w-full">
      <label htmlFor="email" className="mb-2 text-lg text-white">
        البريد الألكتروني {<span className="text-error text-md">*</span>}
      </label>
      <input
        type="email"
        id="email"
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
