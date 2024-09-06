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
      <div className="relative flex w-full flex-col items-center justify-between">
        <div className="absolute left-[15%]">
          <AdminCalendar />
        </div>
        <div className="mt-10">
          <h1 className="text-4xl text-zinc-700">{`Date: ${year}-${month}-${date}`}</h1>
        </div>
        <div className="container w-full bg-white pb-20 md:w-4/6 lg:w-4/5 xl:w-full">
          {bookings && <DataTable columns={columns} data={bookings} />}
        </div>
      </div>
    </>
  );
};

export default BookingTablePage;
