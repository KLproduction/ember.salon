import { useRef } from "react";
import Navbar from "@/components/Navbar";
import OurService from "@/components/OurService";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import Map from "@/components/map";
import Contact from "@/components/Contact";

import { currentUser } from "@/lib/auth";
import { getProduct } from "@/data/getProduct";

import AdminBar from "@/components/AdminBar/AdminBar";

import ThumbnailSlider from "@/components/thumbnial";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import { onLoadThumbnail } from "@/action/thumbnail";
import { onLoadBooking } from "@/data/getBooking";
import TestHero from "@/components/Hero/Hero";
import Hero from "@/components/Hero/Hero";

export default async function Home() {
  const user = await currentUser();
  // const service = await getProduct();
  const queryClient = new QueryClient();

  const service = await queryClient.prefetchQuery({
    queryKey: ["service"],
    queryFn: () => getProduct(),
    staleTime: 1000 * 60 * 60,
  });
  // await queryClient.prefetchQuery({
  //   queryKey: ["thumbnail"],
  //   queryFn: () => onLoadThumbnail(),
  //   staleTime: 1000 * 60 * 60,
  // });
  await queryClient.prefetchQuery({
    queryKey: ["booking"],
    queryFn: () => onLoadBooking(),
    staleTime: 1000 * 60 * 5,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex flex-col flex-nowrap items-center overflow-y-hidden">
        <Navbar />

        <Hero />
        <div className="about-us h-full w-full">
          <ThumbnailSlider />
        </div>

        <div className="pricing min-h-screen w-full lg:h-screen">
          <OurService />
        </div>

        <div className="appointment flex h-full w-full">
          <BookingForm />
        </div>
        <div className="contact h-full w-full overflow-hidden">
          <Contact />
        </div>
        <div>
          <Footer />
        </div>

        <div className="sticky bottom-0 left-0 h-12 min-w-[100vw]">
          <AdminBar />
        </div>
      </main>
    </HydrationBoundary>
  );
}

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
