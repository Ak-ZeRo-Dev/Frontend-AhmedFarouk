import React from "react";

type Props = {
  word: string;
};

export default function LoadingWord({ word }: Props) {
  return (
    <div className="relative scale-[0.725] md:scale-[0.725rem] lg:scale-[0.85]">
      <p
        aria-label="Loading"
        className="relative text-[3.75rem] font-light m-0 whitespace-nowrap before:absolute before:content-[''] before:z-10 before:top-[40px] before:left-[115px] before:w-[6px] before:h-[6px] before:bg-dark dark:before:bg-white before:rounded-full before:animate-dotMove flex flex-row-reverse"
      >
        {word.split("").map((letter, index) => (
          <span
            key={letter}
            aria-hidden="true"
            className={`inline-block relative text-dark dark:text-white tracking-[24px]
            ${
              index === 0
                ? "origin-loading scale-x-[1] scale-y-[1.275] before:absolute before:content-[''] before:top-[22px] before:left-0 before:w-[14px] before:h-[36px] before:bg-white before:dark:bg-dark before:origin-first before:animate-lineStretch"
                : index === 4
                ? "origin-loading animate-letterStretch before:absolute before:content-[''] before:top-[16px] before:left-[2px]  before:w-[9px] before:h-[16.5px] before:bg-white dark:before:bg-dark"
                : null
            } `}
          >
            {letter}
          </span>
        ))}
      </p>
    </div>
  );
}
