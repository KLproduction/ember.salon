"use client";

import Showcase from "@/components/Showcase";
import Image from "next/image";
import { motion, useInView, useScroll } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  const ref1 = useRef<HTMLDivElement | null>(null);
  const isRef1Inview = useInView(ref1, { margin: "-100px" });
  const ref2 = useRef<HTMLDivElement | null>(null);
  const isRef2Inview = useInView(ref2, { margin: "-100px" });
  const ref3 = useRef<HTMLDivElement | null>(null);
  const isRef3Inview = useInView(ref3, { margin: "100px" });
  const ref4 = useRef<HTMLDivElement | null>(null);
  const isRef4Inview = useInView(ref4);
  const ref5 = useRef<HTMLDivElement | null>(null);
  const isRef5Inview = useInView(ref5, { margin: "-100px" });
  return (
    <>
      <main className="flex h-[700vh] flex-col items-center">
        <Navbar />
        <div
          className="home flex h-[100vh] w-full items-center justify-center"
          ref={ref1}
        >
          <Hero />
        </div>
        <div
          className="services flex h-[100vh] w-full items-center justify-center bg-blue-300"
          ref={ref2}
        >
          <h1>P2</h1>
        </div>
        <div
          className="pricing flex h-[100vh] w-full items-center justify-center bg-green-300"
          ref={ref3}
        >
          <h1>P3</h1>
        </div>
        <div className="gallery">
          <Showcase />
        </div>
        <div
          className="P4 flex h-[100vh] w-full items-center justify-center bg-yellow-300"
          ref={ref4}
        >
          <h1>P4</h1>
        </div>
        <div
          className="P4 flex h-[100vh] w-full items-center justify-center bg-yellow-300"
          ref={ref4}
        >
          <h1>P5</h1>
        </div>
      </main>
    </>
  );
}
