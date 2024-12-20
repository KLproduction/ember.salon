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

export const getAllBooking = async () => {
  const booking = await db.booking.findMany();
  return booking;
};

export const onLoadBooking = async () => {
  try {
    const booking = await db.adminMessage.findMany({
      include: {
        bookings: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (booking) {
      return {
        booking,
        status: 200,
      };
    }

    return {
      status: 404,
    };
  } catch {
    return {
      status: 400,
    };
  }
};
