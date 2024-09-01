"use client";
import React, { useEffect, useState, useTransition } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TService, TServiceItem } from "@/lib/type";
import { getProduct, getServiceItem } from "@/data/getProduct";
import { useSearchParams } from "next/navigation";
import { Booking } from "@prisma/client";
import { getBookingByDate } from "@/data/getBookingByDate";
import AdminCalendar from "../../_components/AdminCalendar";

const BookingTablePage = () => {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const year = Number(searchParams.get("year"));
  const month = Number(searchParams.get("month"));
  const date = Number(searchParams.get("date"));

  useEffect(() => {
    (async () => {
      const data = await getBookingByDate(year, month, date);
      if (data) {
        setBookings(data);
      }
    })();
  }, [searchParams]);

  return (
    <>
      <div className="flex flex-col items-center justify-between">
        <div className="flex justify-start">
          <AdminCalendar />
        </div>
        <div className="container mx-auto w-4/5 bg-zinc-50 pb-20 sm:py-10">
          {bookings && <DataTable columns={columns} data={bookings} />}
        </div>
      </div>
    </>
  );
};

export default BookingTablePage;
