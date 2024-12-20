"use server";

import { db } from "@/lib/db";

export const addAdminMessage = async (bookingId: string) => {
  try {
    await db.adminMessage.create({
      data: {
        bookingId,
      },
    });
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};
