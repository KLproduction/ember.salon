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
import { AiFillBell } from "react-icons/ai";
import Image from "next/image";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import BookingDialog from "../BookingDialog";
import Link from "next/link";
import { ResponsiveContainer } from "recharts";
import { CalendarIcon } from "lucide-react";

type DashboardTodayBookingCardProps = {
  todayBooking: Booking[];
};

const DashboardTodayBookingCard = ({
  todayBooking,
}: DashboardTodayBookingCardProps) => {
  const now = new Date();
  return (
    <>
      <Card>
        <Link
          href={`/admin/booking?year=${now.getFullYear()}&month=${now.getMonth() + 1}&date=${now.getDate()}`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today Bookings
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="mt-5 text-6xl font-bold">{todayBooking.length}</div>
          </CardContent>
        </Link>
      </Card>
    </>
  );
};

export default DashboardTodayBookingCard;
