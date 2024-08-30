"use server";

import { db } from "@/lib/db";

export const checkFreeTimeSlot = async (
  date: Date | undefined,
  timeSlot: string,
) => {
  if (!date) {
    console.error("Date is undefined, cannot check free time slot.");
    return 0; // Or handle the error appropriately
  }
  const normalizedDate = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1),
  );

  console.log("Checking slot for:", { normalizedDate, timeSlot });
  const count = await db.booking.count({
    where: {
      date: normalizedDate,
      timeSlot: timeSlot,
    },
  });
  return count;
};
