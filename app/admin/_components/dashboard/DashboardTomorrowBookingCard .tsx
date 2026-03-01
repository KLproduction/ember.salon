"use client";

import { CalendarIcon } from "lucide-react";
import { useTomorrowBooking } from "@/hooks/dashboard";
import { AiOutlineLoading } from "react-icons/ai";
import { AdminMetricCard } from "../AdminShell";

const DashboardTomorrowBookingCard = () => {
  const now = new Date();
  const { data, isFetching } = useTomorrowBooking();
  const tomorrowBookingCount = data?.tomorrowBookingCount;

  return (
    <AdminMetricCard
      label="Tomorrow bookings"
      value={
        isFetching ? (
          <AiOutlineLoading
            className="animate-spin text-4xl text-amber-600"
            aria-label="Loading"
            role="status"
          />
        ) : (
          tomorrowBookingCount ?? 0
        )
      }
      hint="A quick read on tomorrow's workload before the team opens."
      icon={<CalendarIcon className="h-5 w-5" />}
      href={`/admin/booking?year=${now.getFullYear()}&month=${now.getMonth() + 1}&date=${now.getDate() + 1}`}
      accent="gold"
    />
  );
};

export default DashboardTomorrowBookingCard;
