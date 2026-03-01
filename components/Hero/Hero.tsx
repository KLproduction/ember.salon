"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Link } from "react-scroll";

const Hero = () => {
  return (
    <div className="home relative mt-16 flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      <HeroBackdrop />

      <svg
        className="absolute left-1/2 top-1/3 z-10 -translate-x-1/2 -translate-y-1/2"
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
      <div className="absolute left-1/2 top-1/3 z-20 h-80 w-80 -translate-x-1/2 -translate-y-1/2 text-3xl font-black">
        <div className="relative h-full w-full text-orange-500">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl tracking-widest [text-shadow:0_0_30px_rgba(249,115,22,0.25)]"
          >
            SALON
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 10 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute right-[6%] top-[49%] text-3xl tracking-widest text-zinc-200 [text-shadow:0_0_24px_rgba(255,255,255,0.12)]"
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
        className="absolute left-1/2 top-2/3 z-20 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="rounded-[32px] border border-amber-200/10 bg-black/25 px-6 py-5 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.9)] backdrop-blur-md">
          <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
          <Link to="appointment" smooth>
            <Button className="border border-amber-200/30 bg-gradient-to-b from-amber-500 to-orange-600 p-5 text-3xl text-black shadow-[0_12px_36px_-18px_rgba(180,83,9,0.95)] transition-all duration-300 hover:-translate-y-1 hover:from-amber-400 hover:to-orange-500 hover:shadow-[0_20px_44px_-18px_rgba(217,119,6,0.95)] active:translate-y-0 active:scale-[0.98]">
              BOOK NOW
            </Button>
          </Link>
          <Link to="about-us" smooth>
            <Button
              className="border-amber-200/40 bg-transparent p-5 text-3xl text-amber-50 transition-all duration-300 hover:-translate-y-1 hover:border-amber-100/70 hover:bg-amber-50/10 hover:text-amber-100 hover:shadow-[0_18px_40px_-24px_rgba(251,191,36,0.55)] active:translate-y-0 active:scale-[0.98]"
              variant={"outline"}
            >
              ABOUT US
            </Button>
          </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

function HeroBackdrop() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(251,191,36,0.2),transparent_22%),radial-gradient(circle_at_18%_18%,rgba(245,158,11,0.14),transparent_30%),radial-gradient(circle_at_82%_74%,rgba(146,64,14,0.18),transparent_30%),linear-gradient(135deg,rgba(3,3,3,0.98),rgba(24,24,27,0.84)_40%,rgba(67,32,11,0.78)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,251,235,0.05),transparent_18%,transparent_72%,rgba(0,0,0,0.45)),linear-gradient(120deg,rgba(0,0,0,0.78),transparent_42%,rgba(120,53,15,0.18)_78%,rgba(0,0,0,0.84))]" />
      <motion.div
        initial={{ opacity: 0.35, scale: 0.95 }}
        animate={{ opacity: 0.6, scale: 1.05 }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.22),rgba(217,119,6,0.12)_38%,rgba(120,53,15,0.05)_58%,transparent_72%)] blur-3xl"
      />
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />
    </>
  );
}

export default Hero;
