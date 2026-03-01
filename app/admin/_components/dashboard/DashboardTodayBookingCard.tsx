"use client";

import { CalendarIcon } from "lucide-react";
import { AiOutlineLoading } from "react-icons/ai";

import { useTodayBooking } from "@/hooks/dashboard";
import { AdminMetricCard } from "../AdminShell";

const DashboardTodayBookingCard = () => {
  const now = new Date();
  const { data, isFetching } = useTodayBooking();
  const todayBookingCount = data?.todayBookingCount;

  return (
    <AdminMetricCard
      label="Today bookings"
      value={
        isFetching ? (
          <AiOutlineLoading
            className="animate-spin text-4xl text-amber-600"
            aria-label="Loading"
            role="status"
          />
        ) : (
          todayBookingCount ?? 0
        )
      }
      hint="Open the day view to check arrivals and outstanding booking details."
      icon={<CalendarIcon className="h-5 w-5" />}
      href={`/admin/booking?year=${now.getFullYear()}&month=${now.getMonth() + 1}&date=${now.getDate()}`}
      accent="gold"
    />
  );
};

export default DashboardTodayBookingCard;
