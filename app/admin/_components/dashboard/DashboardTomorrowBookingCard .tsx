"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { CalendarIcon } from "lucide-react";
import { useTomorrowBooking } from "@/hooks/dashboard";
import { AiOutlineLoading } from "react-icons/ai";

const DashboardTomorrowBookingCard = () => {
  const now = new Date();
  const { data, isFetching } = useTomorrowBooking();
  const tomorrowBookingCount = data?.tomorrowBookingCount;

  return (
    <>
      <Card>
        <Link
          href={`/admin/booking?year=${now.getFullYear()}&month=${now.getMonth() + 1}&date=${now.getDate() + 1}`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tomorrow Bookings
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            {isFetching ? (
              <div className="flex h-full w-full items-center justify-center">
                <AiOutlineLoading
                  className="animate-spin text-6xl text-yellow-500"
                  aria-label="Loading"
                  role="status"
                />
              </div>
            ) : (
              <div className="mt-5 text-6xl font-bold">
                {tomorrowBookingCount}
              </div>
            )}
          </CardContent>
        </Link>
      </Card>
    </>
  );
};

export default DashboardTomorrowBookingCard;
