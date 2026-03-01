"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DialogTrigger, Dialog, DialogContent } from "@/components/ui/dialog";
import { format } from "date-fns";
import BookingDialog from "../BookingDialog";
import { CalendarClock } from "lucide-react";
import { useUpcomingBooking } from "@/hooks/dashboard";
import { AiOutlineLoading } from "react-icons/ai";

type DashboardUpcomingBookingCardProps = {};

const DashboardUpcomingBookingCard = () => {
  const { data: upcomingBooking, isFetching, isFetched } = useUpcomingBooking();
  const nextBooking = upcomingBooking?.mostUpcomingBooking;

  return (
    <>
      {nextBooking ? (
        <Card className="overflow-hidden rounded-[28px] border-amber-200/70 bg-gradient-to-br from-[#fff6e7] via-white to-[#f2e6d7] shadow-[0_18px_60px_-28px_rgba(120,53,15,0.35)]">
          <Dialog>
            <DialogTrigger className="w-full">
              <CardContent className="flex min-h-[180px] flex-col justify-between gap-6 p-6 transition-all">
                {isFetching ? (
                  <div className="flex min-h-[148px] items-center justify-center">
                    <AiOutlineLoading
                      className="animate-spin text-6xl text-yellow-500"
                      aria-label="Loading"
                      role="status"
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-900">
                          Next appointment
                        </p>
                        <h2 className="mt-3 font-['Oswald'] text-6xl uppercase leading-none tracking-[0.04em] text-zinc-950">
                          {nextBooking.timeSlot}
                        </h2>
                      </div>
                      <div className="rounded-2xl border border-amber-200 bg-white/80 p-3 text-amber-700">
                        <CalendarClock className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="space-y-3 text-left">
                      <p className="max-w-[26ch] text-lg font-semibold text-zinc-900">
                        {nextBooking.service}
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-zinc-600">
                        <span>{nextBooking.name}</span>
                        <span>{format(nextBooking.date, "dd MMM yy")}</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </DialogTrigger>
            <DialogContent className="flex items-center justify-center rounded-[28px] border-amber-100 bg-[#fffdf9]">
              <BookingDialog booking={nextBooking} />
            </DialogContent>
          </Dialog>
        </Card>
      ) : (
        <Card className="flex min-h-[180px] items-center rounded-[28px] border-dashed border-zinc-300 bg-[#fcfaf7] text-zinc-500">
          <CardContent className="p-6">
            <h1 className="text-lg">No upcoming bookings scheduled yet.</h1>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default DashboardUpcomingBookingCard;
