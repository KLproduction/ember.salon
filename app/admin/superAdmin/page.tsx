"use client";

import { Button } from "@/components/ui/button";
import { createDummyBooking } from "./_components/createDummyBooking";
import { startTransition } from "react";
import { addBooking } from "@/action/booking";
import bookingChartData from "@/data/bookingChartData";

const SuperAdminPage = () => {
  const onClick = () => {
    startTransition(async () => {
      const booking = createDummyBooking();
      await addBooking(booking);
    });
  };
  const getData = () => {
    startTransition(async () => {
      await bookingChartData();
    });
  };
  return (
    <div className="h-screen w-screen bg-zinc-900 text-zinc-50">
      <div>
        <Button onClick={() => onClick()}>Dummy Booking</Button>
      </div>
      <div>
        <Button onClick={() => getData()}>ChartData</Button>
      </div>
    </div>
  );
};

export default SuperAdminPage;
