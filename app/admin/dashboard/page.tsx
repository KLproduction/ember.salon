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
  onLoadCategoryData,
  onLoadTodayBooking,
  onLoadTomorrowBooing,
  onLoadUpcomingBookings,
} from "@/action/booking";
import DashboardUpcomingBookingCard from "../_components/dashboard/DashboardUpcomingBookingCard";

const AdminPage = async () => {
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ["service"],
  //   queryFn: () => getProduct(),
  // });

  await queryClient.prefetchQuery({
    queryKey: ["chartData"],
    queryFn: () => bookingChartData(),
    staleTime: 60 * 1000 * 60,
  });
  // await queryClient.prefetchQuery({
  //   queryKey: ["booking"],
  //   queryFn: () => getAllBooking(),
  // });

  // await queryClient.prefetchQuery({
  //   queryKey: ["upcoming-Booking"],
  //   queryFn: () => onLoadUpcomingBookings(),
  // });

  // await queryClient.prefetchQuery({
  //   queryKey: ["tomorrow-Booking"],
  //   queryFn: () => onLoadTomorrowBooing(),
  // });

  // await queryClient.prefetchQuery({
  //   queryKey: ["today-Booking"],
  //   queryFn: () => onLoadTodayBooking(),
  // });

  // await queryClient.prefetchQuery({
  //   queryKey: ["category-Data"],
  //   queryFn: () => onLoadCategoryData(),
  // });

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

        <BookingChart />

        {/* Footer - Service Categories Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Service Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryData />
          </CardContent>
        </Card>
      </div>
    </HydrationBoundary>
  );
};

export default AdminPage;
