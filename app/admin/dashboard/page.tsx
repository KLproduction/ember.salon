import React from "react";
import AdminBooking from "../_components/AdminBooking";

import { getBookingByDate } from "@/data/getBookingByDate";
import { getProduct } from "@/data/getProduct";

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
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {
  onLoadTodayBooking,
  onLoadTomorrowBooing,
  onLoadUpcomingBookings,
} from "@/action/booking";
import DashboardUpcomingBookingCard from "../_components/dashboard/DashboardUpcomingBookingCard";

const AdminPage = async () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const nextDate = now.getDate() + 1;

  // Fetch all data in parallel
  const [service, chartData, booking] = await Promise.all([
    getProduct(),
    bookingChartData(),
    getAllBooking(),
  ]);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["service"],
    queryFn: () => getProduct(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["chartData"],
    queryFn: () => bookingChartData(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["booking"],
    queryFn: () => getAllBooking(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["upcoming-Booking"],
    queryFn: () => onLoadUpcomingBookings(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["tomorrow-Booking"],
    queryFn: () => onLoadTomorrowBooing(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["today-Booking"],
    queryFn: () => onLoadTodayBooking(),
  });

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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container mx-auto space-y-6 p-4">
        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="md:col-span-2">
            <DashboardUpcomingBookingCard />
          </div>
          <DashboardTodayBookingCard />
          <DashboardTomorrowBookingCard />
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
    </HydrationBoundary>
  );
};

export default AdminPage;
