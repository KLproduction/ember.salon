"use server";

import { db } from "@/lib/db";

export const onLoadThumbnail = async () => {
  const thumbnail = await db.thumbnail.findMany({
    orderBy: {
      id: "desc",
    },
  });
  if (thumbnail) {
    return {
      thumbnail,
      status: 200,
    };
  }

  return {
    status: 404,
  };
};
