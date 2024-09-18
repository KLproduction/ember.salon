"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  startAnimation: shouldStartAnimation,
  className,
}: {
  words: string[];
  duration?: number;
  startAnimation: boolean;
  className?: string;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [index, setIndex] = useState(0);

  const startAnimation = useCallback(() => {
    const nextIndex = index + 1;
    if (nextIndex < words.length) {
      const word = words[nextIndex];
      setCurrentWord(word);
      setIndex(nextIndex);
    }
  }, [index, words]);

  useEffect(() => {
    if (shouldStartAnimation) {
      const timer = setTimeout(() => {
        startAnimation();
      }, duration);
      return () => clearTimeout(timer); // Cleanup the timer when component unmounts or updates.
    }
  }, [startAnimation, duration]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        // Animation complete logic can be handled here if needed
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: -40,
          filter: "blur(8px)",
          scale: 2,
          position: "absolute",
        }}
        className={cn(
          "relative z-10 inline-block px-2 text-left text-neutral-900 dark:text-neutral-100",
          className,
        )}
        key={currentWord}
      >
        {/* Splitting and animating each word and letter */}
        {currentWord.split(" ").map((word, wordIndex) => (
          <motion.span
            key={word + wordIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: wordIndex * 0.3,
              duration: 0.3,
            }}
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={word + letterIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: wordIndex * 0.3 + letterIndex * 0.05,
                  duration: 0.2,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
