import { focusInput, form, inputError } from "../../../styles/styles";

type Props = {
  error: string | undefined;
  value: string | undefined;
  touched: boolean | undefined;
  handleChange: any;
  handleBlur: any;
};

export default function NameForm({
  error,
  value,
  touched,
  handleChange,
  handleBlur,
}: Props) {
  return (
    <div className="w-full h-[4.8rem] flex justify-center items-start flex-col">
      <div className="w-full relative group">
        <label
          htmlFor="name"
          className={` ${form.label} ${value ? focusInput : null} ${
            error && touched ? inputError : null
          }`}
        >
          الاسم
        </label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="true"
          autoSave="true"
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          className={`${form.input}
          ${touched && error ? `${inputError}` : null}`}
        />
      </div>
      {touched && error && (
        <div>
          <span
            className={`
              ${form.span}
              ${touched && error ? "visible" : "invisible"}`}
          >
            {error}
          </span>
        </div>
      )}
    </div>
  );
}
