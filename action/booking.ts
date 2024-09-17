"use server";

import { getProductByID } from "@/data/getProduct";
import { db } from "@/lib/db";
import { sendConfirmationEmail } from "@/lib/mail";
import { BookingFormSchema } from "@/schemas";
import { IdCardIcon } from "@radix-ui/react-icons";
import * as z from "zod";

export const addBooking = async (values: z.infer<typeof BookingFormSchema>) => {
  try {
    const dateWithoutTime = new Date(
      Date.UTC(
        values.date.getFullYear(),
        values.date.getMonth(),
        values.date.getDate(),
      ),
    );
    console.log("Saving booking for:", { dateWithoutTime });
    await db.booking.create({
      data: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        service: values.services,
        timeSlot: values.time,
        date: dateWithoutTime,
        message: values.message || null,
      },
    });
    await sendConfirmationEmail(
      values.email,
      values.phone,
      values.date,
      values.time,
      values.services,
    );
    return { success: true };
  } catch (e) {
    console.error("Fail to book:", e);
    return { success: false };
  }
};
