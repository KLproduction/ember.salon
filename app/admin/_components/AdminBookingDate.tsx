"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getBookingByDate } from "@/data/getBookingByDate";
import { Booking } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AdminCalendar from "./AdminCalendar";

const AdminBookingDate = () => {
  const searchParams = useSearchParams();
  const year = Number(searchParams.get("year"));
  const month = Number(searchParams.get("month"));
  const date = Number(searchParams.get("date"));
  const route = useRouter();
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const slots = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
  ];

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
      <div className="flex max-h-screen w-full flex-col items-center justify-center overflow-y-scroll bg-zinc-50">
        <div className="sticky top-0 z-10 flex w-full flex-col items-center justify-center gap-10 border-b-2 border-b-zinc-200 bg-zinc-50/50 p-10 backdrop-blur-lg">
          <div className="">
            <AdminCalendar />
          </div>
          <h1 className="flex-1 text-4xl">{`Date: ${year}-${month}-${date}`}</h1>
        </div>
        <div className="w-full overflow-y-scroll p-10">
          {slots.map((item, index) => (
            <Card key={index} className="m-10 w-full min-w-[800px]">
              <CardHeader>
                <Label>Time Slot: {item}</Label>
              </CardHeader>
              <CardContent>
                {bookings &&
                bookings.filter((data) => data.timeSlot === item).length > 0 ? (
                  bookings
                    .filter((data) => data.timeSlot === item)
                    .map((booking, index) => (
                      <Card
                        className="m-3 grid grid-cols-1 items-center justify-between gap-5 p-3 md:grid-cols-4"
                        key={index}
                      >
                        <div>{booking.service}</div>
                        <div>{booking.name}</div>
                        <div>{booking.phone}</div>
                        <div className="my-3 w-full">{booking.email}</div>
                      </Card>
                    ))
                ) : (
                  <div className="text-zinc-400">No booking</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminBookingDate;
