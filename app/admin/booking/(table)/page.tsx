"use client";
import React, { useEffect, useState, useTransition } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TService, TServiceItem } from "@/lib/type";
import { getProduct, getServiceItem } from "@/data/getProduct";
import { useRouter, useSearchParams } from "next/navigation";
import { Booking } from "@prisma/client";
import { getBookingByDate } from "@/data/getBookingByDate";
import AdminCalendar from "../../_components/AdminCalendar";
import BookingDialog from "../../_components/BookingDialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ShowBookingGrid from "../../_components/ShowBookingGrid";

const BookingTablePage = () => {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const year = Number(searchParams.get("year"));
  const month = Number(searchParams.get("month"));
  const date = Number(searchParams.get("date"));
  const route = useRouter();

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
        <div className="mt-20 flex w-full items-center justify-between sm:px-20">
          <Button
            variant={"ghost"}
            onClick={() =>
              route.push(
                `/admin/booking?year=${year}&month=${month}&date=${date - 1}`,
              )
            }
          >
            <ChevronLeft className="text-zinc-500" />
          </Button>
          <div className="flex flex-col">
            <div className="">
              <h1 className="text-4xl text-zinc-700">{` ${year}-${month}-${date}`}</h1>
            </div>

            <div>
              <AdminCalendar />
            </div>
          </div>
          <Button
            variant={"ghost"}
            onClick={() =>
              route.push(
                `/admin/booking?year=${year}&month=${month}&date=${date + 1}`,
              )
            }
          >
            <ChevronRight className="text-zinc-500" />
          </Button>
        </div>
        <div className="container mt-20 w-full bg-white pb-20 md:w-4/6 lg:w-4/5 xl:w-full">
          {/* {bookings && <DataTable columns={columns} data={bookings} />} */}
          <ShowBookingGrid />
        </div>
      </div>
    </>
  );
};

export default BookingTablePage;
