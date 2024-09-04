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
import { AiFillBell } from "react-icons/ai";
import Image from "next/image";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import BookingDialog from "../BookingDialog";
import Link from "next/link";

type DashboardTodayBookingCardProps = {
  todayBooking: Booking[];
};

const DashboardTodayBookingCard = ({
  todayBooking,
}: DashboardTodayBookingCardProps) => {
  const now = new Date();
  return (
    <>
      <div className="flex w-full items-center justify-center sm:flex-row">
        <Link
          href={`/admin/booking?year=${now.getFullYear()}&month=${now.getMonth() + 1}&date=${now.getDate()}`}
        >
          <Card className="mx-3 min-h-[165px] min-w-[270px] bg-zinc-100 p-4 pb-0 text-zinc-500 sm:min-w-0">
            <CardContent>
              <h2 className="text-md mb-4 text-center font-black">
                TODAY BOOKING:
              </h2>
              <div className="flex items-center justify-center gap-5">
                <div>
                  <AiFillBell className="h-10 w-10" />
                </div>
                <h1 className="text-6xl">{todayBooking.length}</h1>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </>
  );
};

export default DashboardTodayBookingCard;
