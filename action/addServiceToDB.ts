"use server";

import { db } from "@/lib/db";
import { ServiceItem } from "@prisma/client";

export const addServiceToDB = async (values: ServiceItem) => {
  if (!values) {
    return { success: false, message: "Invalid input data provided." };
  }

  try {
    const category = await db.category.findFirst({
      where: {
        ServiceCategory: values.categoryName,
      },
    });

    if (!category) {
      return { success: false, message: "Category not found." };
    }

    await db.serviceItem.create({
      data: {
        name: values.name,
        serviceStatus: values.serviceStatus,
        price: values.price,
        categoryName: values.categoryName,
        categoryId: category.id,
      },
    });

    return { success: true, message: "Product added successfully." };
  } catch (error) {
    console.error("Error when adding service item:", error);

    return {
      success: false,
      message:
        "Something went wrong. Please check for duplicate product names and other issues.",
    };
  }
};
