"use server";

import { db } from "@/lib/db";

export const getProduct = async () => {
  try {
    const products = await db.category.findMany({
      include: {
        serviceItem: true,
      },
    });
    return products;
  } catch (e) {
    console.error(e);
  }
};
export const getServiceItem = async () => {
  try {
    const products = await db.serviceItem.findMany();
    return products;
  } catch (e) {
    console.error(e);
  }
};

export const getProductByID = async (id: string) => {
  try {
    const products = await db.serviceItem.findUnique({
      where: { id: id },
    });
    return products;
  } catch (e) {
    console.error(e);
  }
};
