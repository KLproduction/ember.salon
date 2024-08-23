"use client";

import Showcase from "@/components/Showcase";
import Image from "next/image";
import { motion, useInView, useScroll } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OurService from "@/components/OurService";

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
      <main className="flex min-h-full flex-col items-center gap-10">
        <Navbar />
        <div
          className="home flex h-[100vh] w-full items-center justify-center"
          ref={ref1}
        >
          <Hero />
        </div>

        <div className="services flex min-h-dvh w-full flex-col" ref={ref2}>
          <OurService />
        </div>

        <div className="gallery h-[700vh] w-full items-center justify-center">
          <Showcase />
        </div>

        <div
          className="pricing flex h-[100vh] w-full items-center justify-center bg-green-300"
          ref={ref3}
        >
          <h1>P3</h1>
        </div>
      </main>
    </>
  );
}
