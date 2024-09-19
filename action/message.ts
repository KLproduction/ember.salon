"use server";

import { db } from "@/lib/db";

export const changeMessageIsRead = async (id: string) => {
  try {
    const existingMessage = await db.adminMessage.findUnique({
      where: { id },
    });
    if (existingMessage) {
      await db.adminMessage.update({
        where: {
          id,
        },
        data: {
          isMessageRead: !existingMessage?.isMessageRead,
        },
      });

      return { success: true };
    } else {
      console.error("ID not found");
    }
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

export const deleteMessage = async (id: string) => {
  try {
    await db.adminMessage.delete({
      where: { id },
    });
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};
