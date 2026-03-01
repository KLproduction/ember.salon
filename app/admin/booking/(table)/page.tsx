"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Booking } from "@prisma/client";
import { getBookingByDate } from "@/data/getBookingByDate";
import AdminCalendar from "../../_components/AdminCalendar";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import ShowBookingGrid from "../../_components/ShowBookingGrid";
import { AdminPageShell, AdminPanel, AdminToolbar } from "../../_components/AdminShell";

const BookingTablePage = () => {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const searchParams = useSearchParams();
  const year = Number(searchParams.get("year"));
  const month = Number(searchParams.get("month"));
  const date = Number(searchParams.get("date"));
  const route = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getBookingByDate(year, month, date);
      if (data) {
        setBookings(data);
      }
    })();
  }, [date, month, searchParams, year]);

  // Helper to get previous/next day with month/year rollover
  const getPrevDay = () => {
    const prev = new Date(year, month - 1, date - 1);
    return {
      year: prev.getFullYear(),
      month: prev.getMonth() + 1,
      date: prev.getDate(),
    };
  };
  const getNextDay = () => {
    const next = new Date(year, month - 1, date + 1);
    return {
      year: next.getFullYear(),
      month: next.getMonth() + 1,
      date: next.getDate(),
    };
  };

  return (
    <AdminPageShell
      title="Bookings"
      badge="Schedule"
      description="Move through the day view, inspect each time block, and clear unread appointment requests quickly."
      breadcrumbs={[{ label: "Admin" }, { label: "Bookings" }]}
    >
      <AdminToolbar
        eyebrow="Daily view"
        title={`${year}-${month}-${date}`}
        description={`${bookings?.length ?? 0} bookings loaded for the selected date.`}
        actions={
          <>
            <Button
              variant="outline"
              className="rounded-2xl border-zinc-200 bg-white/80"
              onClick={() => {
                const prev = getPrevDay();
                route.push(
                  `/admin/booking?year=${prev.year}&month=${prev.month}&date=${prev.date}`,
                );
              }}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              className="rounded-2xl border-zinc-200 bg-white/80"
              onClick={() => {
                const next = getNextDay();
                route.push(
                  `/admin/booking?year=${next.year}&month=${next.month}&date=${next.date}`,
                );
              }}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
        <AdminPanel
          title="Calendar"
          description="Jump to another date and watch unread booking indicators."
          className="h-fit"
        >
          <div className="rounded-[22px] border border-amber-100 bg-[#fff9ef] p-4">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl border border-amber-200 bg-white p-3 text-amber-800">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900">Date picker</p>
                <p className="text-xs text-zinc-500">Unread days stay marked in green.</p>
              </div>
            </div>
            <AdminCalendar />
          </div>
        </AdminPanel>

        <AdminPanel
          title="Time slots"
          description="Open any block to view booking details and mark unread requests as reviewed."
          contentClassName="p-0"
        >
          <ShowBookingGrid />
        </AdminPanel>
      </div>
    </AdminPageShell>
  );
};

export default BookingTablePage;
