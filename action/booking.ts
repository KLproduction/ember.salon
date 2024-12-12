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

    const booking = await db.booking.create({
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
    if (booking) {
      await sendConfirmationEmail(
        values.email,
        values.phone,
        values.date,
        values.time,
        values.services,
        values.message,
      );

      return {
        booking,
        status: 200,
        message: "Booking confirmed. Check your email for confirmation",
      };
    }
  } catch (e) {
    console.error("Fail to book:", e);
    return { status: 400, message: "Something went wrong, fail to book." };
  }
};

export const onLoadUpcomingBookings = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingBookings = await db.booking.findMany({
      where: {
        date: {
          gte: today,
        },
      },
    });
    if (upcomingBookings && upcomingBookings.length > 0) {
      const now = new Date();

      // Filter and adjust booking times
      const futureBookings = upcomingBookings
        .map((booking) => {
          const [hour, minute] = booking.timeSlot.split(":").map(Number);
          const bookingDateTime = new Date(booking.date);
          bookingDateTime.setHours(hour, minute, 0, 0); // Set hours and minutes

          return { ...booking, bookingDateTime }; // Attach adjusted DateTime
        })
        .filter((booking) => booking.bookingDateTime > now); // Filter past bookings

      if (futureBookings.length > 0) {
        // Find the most upcoming booking
        const mostUpcomingBooking = futureBookings.reduce((closest, booking) =>
          booking.bookingDateTime < closest.bookingDateTime ? booking : closest,
        );

        return {
          mostUpcomingBooking,
          status: 200,
        };
      }
    }
    return {
      status: 404,
    };
  } catch (e) {
    return {
      status: 400,
    };
  }
};

export const onLoadTodayBooking = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const todayBookingCount = await db.booking.count({
      where: {
        date: {
          gte: today,
          lt: tomorrow,
        },
      },
    });
    if (todayBookingCount) {
      return {
        todayBookingCount,
        status: 200,
      };
    }
    return {
      todayBookingCount: 0,
      status: 200,
    };
  } catch {
    return {
      status: 400,
    };
  }
};

export const onLoadTomorrowBooing = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(today.getDate() + 2);
    dayAfterTomorrow.setHours(0, 0, 0, 0);

    const tomorrowBookingCount = await db.booking.count({
      where: {
        date: {
          gte: tomorrow,
          lt: dayAfterTomorrow,
        },
      },
    });
    if (tomorrowBookingCount) {
      return {
        tomorrowBookingCount,
        status: 200,
      };
    }
    return {
      tomorrowBookingCount: 0,

      status: 200,
    };
  } catch {
    return {
      status: 400,
    };
  }
};

export const onLoadCategoryData = async () => {
  try {
    // Fetch all bookings grouped by service name
    const bookings = await db.booking.groupBy({
      by: ["service"],
      _count: {
        service: true, // Count how many times each service appears
      },
    });

    // Fetch all service categories with their items
    const categories = await db.category.findMany({
      include: {
        serviceItem: true, // Include associated service items
      },
    });

    // Combine bookings with service categories
    const bookingForCategory = categories.map((category) => {
      const itemsWithCounts = category.serviceItem.map((serviceItem) => {
        const bookingCount =
          bookings.find((booking) => booking.service === serviceItem.name)
            ?._count.service || 0;

        return {
          name: serviceItem.name,
          count: bookingCount,
        };
      });

      return {
        categoryName: category.name,
        items: itemsWithCounts,
      };
    });

    // Calculate total bookings for each category
    const totalBookingForCategory = bookingForCategory.map((cat) => {
      const totalBooking = cat.items.reduce((acc, item) => acc + item.count, 0);

      return {
        categoryName: cat.categoryName,
        totalBookings: totalBooking,
      };
    });

    return { totalBookingForCategory };
  } catch (error) {
    console.error("Error fetching booking data:", error);
    throw new Error("Failed to fetch booking data.");
  }
};
