"use client";

import { Button } from "@/components/ui/button";
import { createDummyBooking } from "./_components/createDummyBooking";
import { startTransition, useTransition } from "react";
import { addBooking } from "@/action/booking";

const SuperAdminPage = () => {
  const [isPending, startTransition] = useTransition();
  const onClick = () => {
    startTransition(async () => {
      for (let i = 0; i < 10; i++) {
        const booking = createDummyBooking();
        await addBooking(booking);
      }
    });
  };

  return (
    <div className="h-screen w-screen bg-zinc-900 text-zinc-50">
      <div>
        <Button
          onClick={() => onClick()}
          disabled={isPending}
          className="bg-white text-black"
        >
          Dummy Booking
        </Button>
      </div>
    </div>
  );
};

export default SuperAdminPage;
