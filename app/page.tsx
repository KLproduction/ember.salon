"use client";

import Showcase from "@/components/Showcase";
import Image from "next/image";
import { motion, useInView, useScroll } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OurService from "@/components/OurService";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import NewHero from "@/components/newHero";
import Map from "@/components/map";
import Contact from "@/components/Contact";
import { useCurrentUser } from "@/hooks/use-current-user";
import SignOutBtn from "@/components/auth/SignOutBtn";
import Link from "next/link";

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
  const user = useCurrentUser();

  return (
    <>
      <main className="flex min-h-full flex-col items-center">
        <Navbar />
        <div
          className="home flex h-[100vh] w-full items-center justify-center"
          ref={ref1}
        >
          <Hero />
        </div>

        <div className="services flex min-h-[100vh] w-full flex-col" ref={ref2}>
          <OurService />
        </div>

        <div className="gallery top-0 h-[700vh] w-full items-center justify-center">
          <Showcase />
        </div>

        <div className="appointment flex h-full w-full" ref={ref3}>
          <h1>
            <BookingForm />
          </h1>
        </div>
        <div className="contact h-full min-h-dvh w-screen overflow-hidden">
          <Contact />
        </div>
        <div>
          <Footer />
        </div>
        <div>
          {user ? (
            <div>
              <SignOutBtn />
            </div>
          ) : (
            <div>
              <Link href={"/auth/login"}>Login</Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
