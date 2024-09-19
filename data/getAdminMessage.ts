"use server";

import { db } from "@/lib/db";

export const getAdminMessage = async () => {
  const data = await db.adminMessage.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};
