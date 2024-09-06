import React from "react";
import AdminBooking from "./_components/AdminBooking";

import { getBookingByDate } from "@/data/getBookingByDate";
import { getProduct } from "@/data/getProduct";
import DashboardUpcomingBookingCard from "./_components/dashboard/DashboardUpcomingBookingCard copy";
import DashboardTodayBookingCard from "./_components/dashboard/DashboardTodayBookingCard";
import DashboardTomorrowBookingCard from "./_components/dashboard/DashboardTomorrowBookingCard ";

const AdminPage = async () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const nextDate = now.getDate() + 1;
  const todayBooking = await getBookingByDate(year, month, date);
  const service = await getProduct();
  const tomorrowBooking = await getBookingByDate(year, month, nextDate);
  return (
    <div className="container mx-auto space-y-6 p-4">
      {/* <div className="flex max-w-[1280px] flex-col items-center justify-center gap-10"> */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="transition-transform duration-200 hover:scale-105">
          <DashboardUpcomingBookingCard
            service={service!}
            todayBooking={todayBooking}
          />
        </div>
        <div className="transition-transform duration-200 hover:scale-105">
          <DashboardTodayBookingCard todayBooking={todayBooking} />
        </div>
        <div className="transition-transform duration-200 hover:scale-105">
          <DashboardTomorrowBookingCard tomorrowBooking={tomorrowBooking} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
