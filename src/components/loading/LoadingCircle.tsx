import React from "react";
import styles from "../../styles/loading.module.css";

export default function LoadingCircle() {
  const dot = [1, 2, 3, 4, 5, 6, 7, 8].map((_ele, index) => (
    <div
      key={index}
      className={`${styles.dot} before:bg-dark dark:before:bg-white`}
    ></div>
  ));

  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className={`${styles.container} `}>
        <div className={`${styles.dot} before:bg-dark dark:before:bg-white`}>
          {dot}
        </div>
      </div>
    </div>
  );
}
