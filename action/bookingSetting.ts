"use server";

import { getBookingById } from "@/data/getBooking";
import { db } from "@/lib/db";
import { BookingSettingSchema } from "@/schemas";

import { IdCardIcon } from "@radix-ui/react-icons";
import * as z from "zod";

export const bookingSetting = async (
  Id: string,
  values: z.infer<typeof BookingSettingSchema>,
) => {
  const booking = await getBookingById(Id);
  try {
    if (!booking) {
      return { error: "No Booking found!" };
    }

    await db.booking.update({
      where: { id: Id },
      data: {
        ...values,
      },
    });

    return { success: "Booking details updated" };
  } catch (e) {
    console.error(e);
  }
};
