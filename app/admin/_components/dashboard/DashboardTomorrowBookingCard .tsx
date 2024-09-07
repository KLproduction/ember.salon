"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Booking } from "@prisma/client";

import React, { useState } from "react";

import Link from "next/link";
import { AiOutlineScissor } from "react-icons/ai";
import { ResponsiveContainer } from "recharts";
import { CalendarIcon } from "lucide-react";

type DashboardTomorrowBookingCardProps = {
  tomorrowBooking: Booking[];
};

const DashboardTomorrowBookingCard = ({
  tomorrowBooking,
}: DashboardTomorrowBookingCardProps) => {
  const now = new Date();
  return (
    <>
      <Card>
        <Link
          href={`/admin/booking?year=${now.getFullYear()}&month=${now.getMonth() + 1}&date=${now.getDate() + 1}`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tomorrow's Bookings
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="mt-5 text-6xl font-bold">
              {tomorrowBooking.length}
            </div>
          </CardContent>
        </Link>
      </Card>
    </>
  );
};

export default DashboardTomorrowBookingCard;
