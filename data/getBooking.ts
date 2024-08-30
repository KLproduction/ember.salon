"use server";

import { db } from "@/lib/db";

export const getBooking = async () => {
  const readBooking = await db.booking.findMany({
    where: {
      isRead: true,
    },
  });
  const unReadBooking = await db.booking.findMany({
    where: {
      isRead: false,
    },
  });

  return { readBooking, unReadBooking };
};
