"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaRegCircleXmark } from "react-icons/fa6";

type Props = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center flex flex-col justify-center items-center"
      >
        <h1 className="text-6xl font-bold mb-6">عذرًا!</h1>
        <p className="text-xl mb-8">{error.message}</p>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={reset}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md"
          >
            حاول مرة أخرى
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md"
          >
            <Link href="/">العودة إلى الصفحة الرئيسية</Link>
          </motion.button>
        </div>
      </motion.div>
      <motion.div
        className="mt-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <FaRegCircleXmark className="text-[10rem]" />
      </motion.div>
    </main>
  );
}
