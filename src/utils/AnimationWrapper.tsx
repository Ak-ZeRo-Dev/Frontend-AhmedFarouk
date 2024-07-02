"use client";

import { AnimatePresence, easeInOut, motion } from "framer-motion";
import React, { ElementType, ReactNode } from "react";

type Props = {
  container: ElementType;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
};

export default function AnimationWrapper({
  container,
  className = "",
  style = {},
  children,
}: Props) {
  const MotionContainer = motion(container);

  return (
    <AnimatePresence>
      <MotionContainer
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.3,
          },
        }}
        exit={{
          opacity: 0,
          y: 50,
          transition: {
            duration: 0.3,
          },
        }}
        className={className}
        style={style}
      >
        {children}
      </MotionContainer>
    </AnimatePresence>
  );
}
