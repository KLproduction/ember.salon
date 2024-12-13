"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogTrigger, Dialog, DialogContent } from "@/components/ui/dialog";
import { TService } from "@/lib/type";
import { Booking } from "@prisma/client";
import { format } from "date-fns";
import BookingDialog from "../BookingDialog";
import { CalendarIcon } from "lucide-react";
import { useUpcomingBooking } from "@/hooks/dashboard";
import MySpinner from "@/components/MySpinner";
import { AiOutlineLoading } from "react-icons/ai";

type DashboardUpcomingBookingCardProps = {};

const DashboardUpcomingBookingCard = () => {
  const { data: upcomingBooking, isFetching, isFetched } = useUpcomingBooking();
  const nextBooking = upcomingBooking?.mostUpcomingBooking;

  return (
    <>
      {isFetched && nextBooking ? (
        <Card>
          <Dialog>
            <DialogTrigger className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Upcoming Bookings
                </CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="dur flex flex-col gap-3 transition-all">
                {isFetching ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <AiOutlineLoading
                      className="animate-spin text-6xl text-yellow-500"
                      aria-label="Loading"
                      role="status"
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col items-center justify-center gap-1">
                      <h1 className="text-6xl">{nextBooking.timeSlot}</h1>
                      <p className="font-semibold">{nextBooking.service}</p>
                    </div>
                    <div className="flex w-full justify-end text-sm">{`Date: ${format(nextBooking.date, "dd MMM yy")}`}</div>
                  </>
                )}
              </CardContent>
            </DialogTrigger>
            <DialogContent className="flex items-center justify-center">
              <BookingDialog booking={nextBooking} />
            </DialogContent>
          </Dialog>
        </Card>
      ) : (
        <Card className="mx-auto flex min-h-[165px] min-w-[265px] max-w-[265px] justify-center text-zinc-500">
          <CardContent>
            <h1 className="mt-14 p-1 text-lg">No bookings for today.</h1>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default DashboardUpcomingBookingCard;
