import React from "react";
import AdminBooking from "../_components/AdminBooking";

import { getBookingByDate } from "@/data/getBookingByDate";
import { getProduct } from "@/data/getProduct";
import DashboardUpcomingBookingCard from "../_components/dashboard/DashboardUpcomingBookingCard copy";
import DashboardTodayBookingCard from "../_components/dashboard/DashboardTodayBookingCard";
import DashboardTomorrowBookingCard from "../_components/dashboard/DashboardTomorrowBookingCard ";
import BookingChart from "../_components/dashboard/BookingChart";
import bookingChartData from "@/data/bookingChartData";
import { getAllBooking, getBooking } from "@/data/getBooking";
import {
  CalendarIcon,
  ScissorsIcon,
  PaintbrushIcon,
  SparklesIcon,
  LeafIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryData from "../_components/dashboard/CategoryData";
import MySpinner from "@/components/MySpinner";

const AdminPage = async () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const nextDate = now.getDate() + 1;

  // Fetch all data in parallel
  const [todayBooking, service, tomorrowBooking, chartData, booking] =
    await Promise.all([
      getBookingByDate(year, month, date),
      getProduct(),
      getBookingByDate(year, month, nextDate),
      bookingChartData(),
      getAllBooking(),
    ]);

  const bookingName = booking.map((item) => item.service);
  const bookingForCategory = service?.map((serviceCategory) => {
    const itemsWithCounts = serviceCategory.serviceItem.map((serviceItem) => {
      const count = bookingName.reduce((acc, currentName) => {
        return acc + (currentName === serviceItem.name ? 1 : 0);
      }, 0);
      return {
        name: serviceItem.name,
        count: count,
      };
    });
    return {
      categoryName: serviceCategory.name,
      items: itemsWithCounts,
    };
  });

  const totalBookingForCategory = bookingForCategory?.map((cat) => {
    const totalBooking = cat.items.reduce((acc, booking) => {
      return acc + booking.count;
    }, 0);
    return {
      categoryName: cat.categoryName,
      totalBookings: totalBooking,
    };
  });

  return (
    <div className="container mx-auto space-y-6 bg-zinc-900 p-4">
      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="hover:scale-105 md:col-span-2">
          <DashboardUpcomingBookingCard service={service!} booking={booking} />
        </div>
        <DashboardTodayBookingCard todayBooking={todayBooking} />
        <DashboardTomorrowBookingCard tomorrowBooking={tomorrowBooking} />
      </div>

      {/* Monthly Booking Chart */}

      <BookingChart data={chartData} />

      {/* Footer - Service Categories Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Service Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoryData data={totalBookingForCategory!} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
