"use client";

import { Button } from "@/components/ui/button";
import { createDummyBooking } from "./_components/createDummyBooking";
import { useTransition } from "react";
import { addBooking } from "@/action/booking";
import { AdminPageShell, AdminPanel } from "../_components/AdminShell";

const SuperAdminPage = () => {
  const [isPending, startTransition] = useTransition();
  const onClick = () => {
    startTransition(async () => {
      for (let i = 0; i < 10; i++) {
        const booking = createDummyBooking();
        await addBooking(booking, true);
      }
    });
  };

  return (
    <AdminPageShell
      title="Super Admin"
      badge="Restricted"
      description="Internal utilities for seeding and admin-only maintenance tasks."
      breadcrumbs={[{ label: "Admin" }, { label: "Super Admin" }]}
    >
      <AdminPanel
        title="Seed tools"
        description="Use carefully. This action inserts multiple demo bookings."
        className="max-w-2xl"
      >
        <Button
          onClick={() => onClick()}
          disabled={isPending}
          className="rounded-2xl bg-zinc-900 text-white hover:bg-zinc-800"
        >
          {isPending ? "Creating..." : "Create Dummy Bookings"}
        </Button>
      </AdminPanel>
    </AdminPageShell>
  );
};

export default SuperAdminPage;
