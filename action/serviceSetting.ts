"use server";

import { getProductByID } from "@/data/getProduct";
import { db } from "@/lib/db";
import { ServiceSettingSchema } from "@/schemas";
import { IdCardIcon } from "@radix-ui/react-icons";
import * as z from "zod";

export const serviceSetting = async (
  Id: string,
  values: z.infer<typeof ServiceSettingSchema>,
) => {
  const product = await getProductByID(Id);
  try {
    if (!product) {
      return { error: "No product found!" };
    }

    await db.serviceItem.update({
      where: { id: Id },
      data: {
        ...values,
      },
    });

    return { success: "Product details updated" };
  } catch (e) {
    console.error(e);
  }
};
