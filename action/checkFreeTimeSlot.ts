"use server";

import { db } from "@/lib/db";

export const checkFreeTimeSlot = async (date: Date, timeSlot: string) => {
  const count = await db.booking.count({
    where: {
      date: date,
      timeSlot: timeSlot,
    },
  });
  return count;
};
