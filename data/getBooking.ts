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
export const getBookingById = async (id: string) => {
  const booking = await db.booking.findUnique({
    where: {
      id: id,
    },
  });

  return booking;
};
