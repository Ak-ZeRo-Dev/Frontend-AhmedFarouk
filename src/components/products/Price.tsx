import React, { useState } from "react";
import Slider from "react-slider";
import "./style.css";

type Props = {};

export default function Price({}: Props) {
  const [low, setLow] = useState<number>(0);
  const [high, setHigh] = useState<number>(10000);
  const [values, setValues] = useState<number[]>([low, high]);

  return (
    <div className="w-full">
      <h3>السعر</h3>
      <div className="flex w-full gap-1 py-2">
        <input
          type="number"
          id="min"
          value={values[0]}
          onChange={(e) => {
            setValues([parseInt(e.target.value), values[1]]);
          }}
          className="w-full text-center py-1 font-bold"
        />
        <span className="font-bold text-2xl">-</span>
        <input
          type="number"
          id="max"
          value={values[1]}
          onChange={(e) => {
            setValues([values[0], parseInt(e.target.value)]);
          }}
          className="w-full text-center py-1 font-bold"
        />
      </div>

      <div>
        <Slider
          value={values}
          min={low}
          max={high}
          onChange={setValues}
          className="bg-dark dark:bg-fourth w-full h-1 relative mt-4 rounded-sm slider"
          thumbClassName="w-7 h-7 rounded-full cursor-grab bg-main  before:w-1/2 before:h-1/2 before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-fourth before:rounded-full -top-3 outline-none"
          thumbActiveClassName="bg-third outline-none"
          withTracks={true}
          step={1}
          invert
          minDistance={1000}
        />
      </div>
    </div>
  );
}
