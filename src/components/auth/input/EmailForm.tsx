import { focusInput, form, inputError } from "../../../styles/styles";

type Props = {
  error: string | undefined;
  value: string | undefined;
  touched: boolean | undefined;
  handleChange: any;
  handleBlur: any;
};

export default function EmailForm({
  error,
  value,
  touched,
  handleChange,
  handleBlur,
}: Props) {
  return (
    <div className="w-full h-20 flex justify-center items-start flex-col">
      <div className="w-full relative group">
        <label
          htmlFor="email"
          className={` ${form.label} ${value ? focusInput : null} ${
            error && touched ? inputError : null
          }`}
        >
          البريد الإلكتروني
        </label>
        <input
          type="email"
          name="email"
          id="email"
          autoSave="true"
          autoComplete="true"
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          className={`${form.input}
            ${touched && error ? `${inputError}` : null}`}
        />
      </div>
      {touched && error ? (
        <div>
          <span
            className={`
                ${form.span}
                ${touched && error ? "visible" : "invisible"}`}
          >
            {error}
          </span>
        </div>
      ) : null}
    </div>
  );
}
