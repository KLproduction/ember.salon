"use client";

import { Card, CardContent } from "@/components/ui/card";
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

import Image from "next/image";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import BookingDialog from "../BookingDialog";

type DashboardUpcomingBookingCardProps = {
  service: TService[];
  todayBooking: Booking[];
};

const DashboardUpcomingBookingCard = ({
  service,
  todayBooking,
}: DashboardUpcomingBookingCardProps) => {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const upcomingBooking = todayBooking.filter((booking) => {
    const bookingDateTime = new Date(`${today}T${booking.timeSlot}:00`);
    return bookingDateTime > now;
  });
  return (
    <>
      {upcomingBooking && upcomingBooking.length > 0 ? (
        <div className="flex w-full min-w-[265px] items-center justify-center sm:flex-row">
          <Dialog>
            <DialogTrigger>
              <Card className="mx-auto min-h-[165px] bg-red-200 p-4 pb-0 text-zinc-700">
                <CardContent>
                  <h2 className="text-md mb-4 text-center font-black">
                    UPCOMING <br /> BOOKING:
                  </h2>

                  <div className="flex items-center justify-center gap-5">
                    <h1 className="text-6xl">{upcomingBooking[0].timeSlot}</h1>
                    {service.map((serviceItem) =>
                      serviceItem.serviceItem.some(
                        (serviceItem) =>
                          serviceItem.name === upcomingBooking[0].service,
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
              <BookingDialog booking={upcomingBooking[0]} />
            </DialogContent>
          </Dialog>
          {/* {todayBooking && todayBooking.length > 0 ? (
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

        )} */}
        </div>
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
