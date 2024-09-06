import React from "react";
import AdminBooking from "./_components/AdminBooking";

import { getBookingByDate } from "@/data/getBookingByDate";
import { getProduct } from "@/data/getProduct";
import DashboardUpcomingBookingCard from "./_components/dashboard/DashboardUpcomingBookingCard copy";
import DashboardTodayBookingCard from "./_components/dashboard/DashboardTodayBookingCard";
import DashboardTomorrowBookingCard from "./_components/dashboard/DashboardTomorrowBookingCard ";
import BookingChart from "./_components/dashboard/BookingChart";
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

const AdminPage = async () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const nextDate = now.getDate() + 1;
  const todayBooking = await getBookingByDate(year, month, date);
  const service = await getProduct();
  const tomorrowBooking = await getBookingByDate(year, month, nextDate);
  const chartData = await bookingChartData();
  const booking = await getAllBooking();

  return (
    // <div className="container mx-auto space-y-6 p-4">

    //   <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
    //     <div className="transition-transform duration-200 hover:scale-105">
    //       <DashboardUpcomingBookingCard service={service!} booking={booking} />
    //     </div>
    //     <div className="transition-transform duration-200 hover:scale-105">
    //       <DashboardTodayBookingCard todayBooking={todayBooking} />
    //     </div>
    //     <div className="transition-transform duration-200 hover:scale-105">
    //       <DashboardTomorrowBookingCard tomorrowBooking={tomorrowBooking} />
    //     </div>
    //   </div>
    //   {/* Chart */}
    //   <div className="container w-[100%] overflow-scroll">
    //     <BookingChart data={chartData} />
    //   </div>
    // </div>
    <div className="container mx-auto space-y-6 p-4">
      {/* Header */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="md:col-span-2">
          <DashboardUpcomingBookingCard service={service!} booking={booking} />
        </div>
        <DashboardTodayBookingCard todayBooking={todayBooking} />
        <DashboardTomorrowBookingCard tomorrowBooking={tomorrowBooking} />
      </div>

      {/* Middle - Monthly Booking Chart */}

      <BookingChart data={chartData} />

      {/* Footer - Service Categories Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Service Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <ScissorsIcon className="h-8 w-8" />
              </div>
              <span className="mt-2 text-sm font-medium">Cutting</span>
              <span className="text-xs text-muted-foreground">40%</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <PaintbrushIcon className="h-8 w-8" />
              </div>
              <span className="mt-2 text-sm font-medium">Coloring</span>
              <span className="text-xs text-muted-foreground">30%</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <SparklesIcon className="h-8 w-8" />
              </div>
              <span className="mt-2 text-sm font-medium">Treatment</span>
              <span className="text-xs text-muted-foreground">20%</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <LeafIcon className="h-8 w-8" />
              </div>
              <span className="mt-2 text-sm font-medium">Perm</span>
              <span className="text-xs text-muted-foreground">10%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
