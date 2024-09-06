"use server";

import { db } from "@/lib/db";
import { TBookingChart } from "@/lib/type";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfDay,
} from "date-fns";

const bookingChartData = async () => {
  const getBookingByDate = async (date: Date) => {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    const isoDate = utcDate.toISOString();
    const dailyBooking = await db.booking.findMany({
      where: {
        date: isoDate,
      },
    });
    return dailyBooking.length;
  };

  const generateBookingChartData = async () => {
    const start = startOfMonth(new Date());
    const end = endOfMonth(new Date());
    const dateRange = eachDayOfInterval({ start, end });

    const data: TBookingChart[] = [];
    for (const date of dateRange) {
      const bookings = await getBookingByDate(date);
      data.push({
        date: date.getDate(),
        bookings,
      });
    }
    return data;
  };
  return generateBookingChartData();
};

export default bookingChartData;
