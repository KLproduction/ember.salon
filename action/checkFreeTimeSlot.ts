"use server";

import { db } from "@/lib/db";

export const checkFreeTimeSlot = async (
  date: Date | undefined,
  timeSlot: string,
) => {
  if (!date) {
    console.error("Date is undefined, cannot check free time slot.");
    return 0;
  }
  const normalizedDate = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1),
  );

  const count = await db.booking.count({
    where: {
      date: normalizedDate,
      timeSlot: timeSlot,
    },
  });
  return count;
};
