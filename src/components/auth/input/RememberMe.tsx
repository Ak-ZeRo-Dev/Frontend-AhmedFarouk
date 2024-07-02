import { useState } from "react";

export default function RememberMe() {
  const [isRemember, setIsRemember] = useState<boolean>(true);
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        name="remember-me"
        id="remember-me"
        onClick={() => {
          setIsRemember((prev) => !prev);
          localStorage.setItem("isRemember", JSON.stringify(isRemember));
          if (isRemember === false) localStorage.removeItem("isRemember");
        }}
        className={`text-white outline-none  checked:!bg-main dark:checked:!bg-main dark:text-white w-5 h-5`}
      />
      <label
        htmlFor="remember-me"
        className="text-black dark:text-white text-xl pr-2 "
      >
        تذكرنى
      </label>
    </div>
  );
}
