"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSearchParams } from "next/navigation";
import AdminBooking from "../_components/AdminBooking";

const BookingDatePage = () => {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="h-full w-full">
        <AdminBooking />
      </div>
    </div>
  );
};

export default BookingDatePage;
