import Showcase from "@/components/Showcase";
import Image from "next/image";
import { motion, useInView, useScroll } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OurService from "@/components/OurService";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

import Map from "@/components/map";
import Contact from "@/components/Contact";

import SignOutBtn from "@/components/auth/SignOutBtn";
import Link from "next/link";
import { currentUser } from "@/lib/auth";
import { getProduct } from "@/data/getProduct";
import NewGallery from "@/components/NewGallery";
import AdminBar from "@/components/AdminBar";
import { cn } from "@/lib/utils";
import { getAdminMessage } from "@/data/getAdminMessage";
import { getAllBooking } from "@/data/getBooking";

export default async function Home() {
  // const ref1 = useRef<HTMLDivElement | null>(null);
  // const isRef1Inview = useInView(ref1, { margin: "-100px" });
  // const ref2 = useRef<HTMLDivElement | null>(null);
  // const isRef2Inview = useInView(ref2, { margin: "-100px" });
  // const ref3 = useRef<HTMLDivElement | null>(null);
  // const isRef3Inview = useInView(ref3, { margin: "100px" });
  // const ref4 = useRef<HTMLDivElement | null>(null);
  // const isRef4Inview = useInView(ref4);
  // const ref5 = useRef<HTMLDivElement | null>(null);
  // const isRef5Inview = useInView(ref5, { margin: "-100px" });
  const user = await currentUser();
  const service = await getProduct();
  const AdminMessage = await getAdminMessage();
  const bookings = await getAllBooking();

  return (
    <>
      <main className="flex min-h-full flex-col flex-nowrap items-center overflow-y-hidden">
        <Navbar />
        <div className="home flex w-full items-center justify-center">
          <Hero />
        </div>

        <div className="services w-full">
          <OurService service={service!} />
        </div>

        <div className="gallery min-h-[100vh] w-screen overflow-y-hidden">
          <NewGallery />
        </div>

        <div className="appointment flex h-full w-full" id="appointment">
          <h1>
            <BookingForm service={service!} />
          </h1>
        </div>
        <div className="contact h-full min-h-dvh w-screen overflow-hidden">
          <Contact />
        </div>
        <div className={cn(user ? "pb-12" : "")}>
          <Footer />
        </div>
        {user?.email && (
          <div className="fixed bottom-0 left-0 h-12 min-w-[100vw]">
            <AdminBar messages={AdminMessage} bookings={bookings} />
          </div>
        )}
      </main>
    </>
  );
}
