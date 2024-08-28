"use server";

import { db } from "@/lib/db";

export const deleteService = async (id: string) => {
  try {
    await db.serviceItem.delete({
      where: { id },
    });

    return { success: true, message: "Item has been deleted" };
  } catch (e) {
    console.error("fail to delete service:", e);
    return {
      success: false,
      message: "Something went wrong, fail to delete item.",
    };
  }
};
