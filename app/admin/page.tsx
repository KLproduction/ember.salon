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
    <div className="flex max-w-[1280px] flex-col items-center justify-center gap-10">
      <div className="mb-5 flex flex-col items-center justify-between gap-5 sm:flex-row">
        <DashboardUpcomingBookingCard
          service={service!}
          todayBooking={todayBooking}
        />
        <DashboardTodayBookingCard todayBooking={todayBooking} />
        <DashboardTomorrowBookingCard tomorrowBooking={tomorrowBooking} />
      </div>
    </div>
  );
};

export default AdminPage;
