"use client";

import { Button } from "@/components/ui/button";
import { createDummyBooking } from "./_components/createDummyBooking";

const SuperAdminPage = () => {
  const onClick = () => {
    createDummyBooking();
  };
  return (
    <div className="h-screen w-screen bg-zinc-900 text-zinc-50">
      <div>
        <Button onClick={() => onClick()}>Dummy Booking</Button>
      </div>
    </div>
  );
};

export default SuperAdminPage;
