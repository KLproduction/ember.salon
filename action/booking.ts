"use server";

import { getProductByID } from "@/data/getProduct";
import { db } from "@/lib/db";
import { BookingFormSchema } from "@/schemas";
import { IdCardIcon } from "@radix-ui/react-icons";
import * as z from "zod";

export const addBooking = async (values: z.infer<typeof BookingFormSchema>) => {
  try {
    await db.booking.create({
      data: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        service: values.services,
        timeSlot: values.time,
        date: values.date,
        message: values.message || null,
      },
    });
    return { success: true };
  } catch (e) {
    console.error("Fail to book:", e);
    return { success: false };
  }
};
