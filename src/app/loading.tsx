import React from "react";
import LoadingCircle from "../components/loading/LoadingCircle";
// import LoadingWord from "../components/loading/LoadingWord";

export default function LoadingPage() {
  const word = "Loading";
  return (
    <section className="min-h-screen w-screen overflow-hidden flex justify-center items-center bg-white dark:bg-dark m-0 font-Roboto">
      {/* <LoadingWord word={word} /> */}
      <LoadingCircle />
    </section>
  );
}
