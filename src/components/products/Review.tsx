import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

type Props = {};

export default function Review({}: Props) {
  return (
    <div>
      <h3>مراجعة العميل</h3>
      <div className="flex flex-col-reverse gap-1">
        {[1, 2, 3, 4].map((rating, index) => (
          <div className="flex items-center text-xl " key={index}>
            <input type="checkbox" id={`${index}`} className="w-4 h-4 ml-2" />
            {[...Array(5)].map((_, starIndex) => (
              <label htmlFor={`${index}`} key={starIndex}>
                {starIndex < rating ? (
                  <FaStar fill="#fca01c" />
                ) : (
                  <FaRegStar fill="#fca01c" />
                )}
              </label>
            ))}
            <span className="text-center pr-1 ">&أعلي</span>
          </div>
        ))}
      </div>
    </div>
  );
}
