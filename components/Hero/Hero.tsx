"use client";

import "./heroStyle.css";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Link } from "react-scroll";

const Hero = () => {
  return (
    <div className="home relative mt-16 flex h-screen w-full items-center justify-center overflow-hidden">
      <svg
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
        width="320"
        height="320"
        viewBox="0 0 320 320"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          cx="160"
          cy="160"
          r="150"
          fill="none"
          stroke="#F97316"
          strokeWidth="8"
          strokeDasharray="942"
          strokeDashoffset="942"
          initial={{ opacity: 0 }}
          animate={{ strokeDashoffset: 0, opacity: 1 }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </svg>

      {/* Circular Content Reveal */}
      <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 -translate-y-1/2 text-3xl font-black">
        <div className="relative h-full w-full text-orange-500">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl tracking-widest"
          >
            SALON
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 500 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute right-[6%] top-[49%] text-3xl tracking-widest text-zinc-200"
          >
            SHIM
          </motion.span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: "1000px" }}
        animate={{ opacity: 1, x: "-50%" }}
        transition={{
          delay: 1,
          duration: 1.4,
          ease: "easeOut",
          type: "spring",
          bounce: 0.4,
        }}
        className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
          <Link to="appointment" smooth>
            <Button className="p-5 text-3xl">BOOK NOW</Button>
          </Link>
          <Link to="about-us" smooth>
            <Button className="bg-transparent p-5 text-3xl" variant={"outline"}>
              ABOUT US
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
