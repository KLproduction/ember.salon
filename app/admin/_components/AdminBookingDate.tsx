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
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AdminBookingDate = () => {
  const searchParams = useSearchParams();
  const year = Number(searchParams.get("year"));
  const month = Number(searchParams.get("month"));
  const date = Number(searchParams.get("date"));

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
      <div className="flex max-h-screen w-full flex-col items-center justify-center overflow-auto bg-zinc-50">
        <div className="sticky top-0 z-10 flex w-full justify-center border-b-2 border-b-zinc-200 bg-zinc-50/50 p-10 backdrop-blur-lg">
          <h1>{`Date:${year}-${month}-${date}`}</h1>
        </div>
        <div className="mt-20 pt-[700px]">
          {slots.map((item, index) => (
            <Card key={index} className="mx-10 w-full min-w-[full] p-10">
              <CardHeader>
                <Label>Time Slot:{item}</Label>
              </CardHeader>
              <CardContent>
                {bookings
                  ?.filter((data) => data.timeSlot === item)
                  .map((booking) => (
                    <>
                      {booking && (
                        <Card className="flex flex-col items-center justify-center md:flex-row">
                          <div>{booking.name}</div>
                          <div> {booking.phone}</div>
                          <div> {booking.service}</div>
                          <div className="my-3 w-full">{booking.email}</div>
                        </Card>
                      )}
                    </>
                  ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminBookingDate;
