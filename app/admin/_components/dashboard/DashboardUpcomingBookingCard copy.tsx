"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogTrigger, Dialog, DialogContent } from "@/components/ui/dialog";
import { getBookingByDate } from "@/data/getBookingByDate";
import { TService } from "@/lib/type";
import { Booking } from "@prisma/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { format } from "date-fns";

import Image from "next/image";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import BookingDialog from "../BookingDialog";
import { ResponsiveContainer } from "recharts";
import { CalendarIcon } from "lucide-react";

type DashboardUpcomingBookingCardProps = {
  service: TService[];
  booking: Booking[];
};

const DashboardUpcomingBookingCard = ({
  service,
  booking,
}: DashboardUpcomingBookingCardProps) => {
  function getFullBookingDateTime(bookingDate: Date, timeSlot: string): Date {
    const [hours, minutes] = timeSlot.split(":").map(Number);
    const date = new Date(bookingDate);
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  function isBookingUpcoming(booking: Booking): boolean {
    const now = new Date();
    const bookingDateTime = getFullBookingDateTime(
      booking.date,
      booking.timeSlot,
    );
    return bookingDateTime > now;
  }

  function sortBookingsByDate(a: Booking, b: Booking): number {
    const dateA = getFullBookingDateTime(a.date, a.timeSlot);
    const dateB = getFullBookingDateTime(b.date, b.timeSlot);
    return dateA.getTime() - dateB.getTime();
  }
  const upcomingBookings = booking
    .filter(isBookingUpcoming)
    .sort(sortBookingsByDate);

  const nextBooking = upcomingBookings[0];

  return (
    <>
      {nextBooking ? (
        <Card>
          <Dialog>
            <DialogTrigger className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Upcoming Bookings
                </CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-center justify-center gap-5">
                  <h1 className="text-6xl">{nextBooking.timeSlot}</h1>
                  {service.map((serviceItem) =>
                    serviceItem.serviceItem.some(
                      (serviceItem) => serviceItem.name === nextBooking.service,
                    ) ? (
                      <img
                        src={serviceItem.image}
                        alt=""
                        className="h-10 w-10"
                        key={serviceItem.id}
                      />
                    ) : null,
                  )}
                </div>
                <div>{`Date: ${format(nextBooking.date, "yyyy MMM dd")}`}</div>
              </CardContent>
            </DialogTrigger>
            <DialogContent className="flex items-center justify-center">
              <BookingDialog booking={nextBooking} />
            </DialogContent>
          </Dialog>
        </Card>
      ) : (
        <Card className="mx-auto flex min-h-[165px] min-w-[265px] max-w-[265px] justify-center text-zinc-500">
          <CardContent>
            <h1 className="mt-14 p-1 text-lg">No bookings for today.</h1>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default DashboardUpcomingBookingCard;

{
  /* {todayBooking && todayBooking.length > 0 ? (
          <div className="flex justify-center">
            <>
              <Carousel className="hidden sm:flex sm:w-[full] md:w-[full] lg:w-[full]">
                <CarouselContent className="-ml-1">
                  {upcomingBooking.map((item, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-1 sm:basis-full md:basis-1/2 lg:basis-1/3 xl:flex xl:justify-between"
                    >
                      <Dialog>
                        <DialogTrigger>
                          <Card className="mx-3 bg-zinc-100 p-4 pb-0 text-zinc-500">
                            <CardContent>
                              <h3 className="text-md mb-4 text-center font-bold">
                                Upcoming Bookings:
                              </h3>
                              <div className="flex items-center justify-center gap-5">
                                <h1 className="text-6xl">{item.timeSlot}</h1>
                                {service.map((serviceItem) =>
                                  serviceItem.serviceItem.some(
                                    (serviceItem) =>
                                      serviceItem.name === item.service,
                                  ) ? (
                                    <img
                                      src={serviceItem.image}
                                      alt=""
                                      className="h-10 w-10"
                                      key={serviceItem.id}
                                    />
                                  ) : null,
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </DialogTrigger>
                        <DialogContent>
                          <BookingDialog booking={item} />
                        </DialogContent>
                      </Dialog>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </>
          </div>
        ) : (

        )} */
}
