"use server";

import { db } from "@/lib/db";

export const setIsRead = async (ids: string[]) => {
  try {
    await db.booking.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        isRead: true,
      },
    });

    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};
