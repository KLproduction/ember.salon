"use server";

import { db } from "@/lib/db";

export const getBookingByDate = async (
  year: number,
  month: number,
  day: number,
) => {
  const date = new Date(year, month, day);
  const startDate = new Date(Date.UTC(year, month - 1, day));
  const endDate = new Date(Date.UTC(year, month - 1, day + 1));
  const booking = await db.booking.findMany({
    where: {
      date: {
        gte: startDate,
        lt: endDate,
      },
    },
  });

  return booking;
};
