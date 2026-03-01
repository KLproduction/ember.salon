import Navbar from "@/components/Navbar";
import OurService from "@/components/OurService";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

import { getProduct } from "@/data/getProduct";

import AdminBar from "@/components/AdminBar/AdminBar";

import ThumbnailSlider from "@/components/thumbnial";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { onLoadBooking } from "@/data/getBooking";
import Hero from "@/components/Hero/Hero";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
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
