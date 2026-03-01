import { Booking } from "@prisma/client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  UsersIcon,
  PhoneIcon,
  MailIcon,
  Scissors,
  CalendarCheck2,
} from "lucide-react";
import { getBookingByDate } from "@/data/getBookingByDate";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { setIsRead } from "@/action/setIsRead";
import { toast } from "sonner";
import MySpinner from "@/components/MySpinner";
import { Separator } from "@/components/ui/separator";

const ShowBookingGrid = () => {
  const [bookings, setBookings] = useState<Record<string, Booking[]>>({});
  const [loading, setLoading] = useState(true);
  const [, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const bookingYear = Number(searchParams.get("year"));
  const bookingMonth = Number(searchParams.get("month"));
  const bookingDate = Number(searchParams.get("date"));
  const timeslots = Array.from({ length: 10 }, (_, i) => `${i + 10}:00`);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getBookingByDate(
        bookingYear,
        bookingMonth,
        bookingDate,
      );
      const bookingsByTimeSlot: Record<string, Booking[]> = {};

      data.forEach((booking) => {
        if (!bookingsByTimeSlot[booking.timeSlot]) {
          bookingsByTimeSlot[booking.timeSlot] = [];
        }
        bookingsByTimeSlot[booking.timeSlot].push(booking);
      });

      setBookings(bookingsByTimeSlot);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError(error as any);
      setLoading(false);
    }
  }, [bookingYear, bookingMonth, bookingDate]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const isReadHandler = (isOpen: boolean, timeslot: string) => {
    if (isOpen && bookings[timeslot]) {
      const ids = bookings[timeslot]
        .filter((booking) => !booking.isRead)
        .map((booking) => booking.id);
      if (ids.length > 0) {
        startTransition(async () => {
          await setIsRead(ids).then((data) => {
            if (data.success === true) {
              setBookings((prevBookings) => {
                const updatedBookings = { ...prevBookings };
                updatedBookings[timeslot] = updatedBookings[timeslot].map(
                  (booking) =>
                    ids.includes(booking.id)
                      ? { ...booking, isRead: true }
                      : booking,
                );
                return updatedBookings;
              });
            } else {
              toast.error("something went wrong");
            }
          });
        });
      }
    }
  };

  if (loading) return <MySpinner />;
  if (error) return <p>Error loading bookings.</p>;
  return (
    <div className="bg-transparent">
      <div className="px-4 py-4 md:px-5 md:py-5">
        <div className="grid gap-4 pb-2 md:grid-cols-2 xl:grid-cols-3">
          {timeslots.map((timeslot) => (
            <Dialog
              key={timeslot}
              onOpenChange={(isOpen) => isReadHandler(isOpen, timeslot)}
            >
              <DialogTrigger asChild>
                <Card
                  className={`relative min-h-[172px] cursor-pointer rounded-[24px] border transition-all duration-200 ${
                    bookings[timeslot]
                      ? "border-amber-100 bg-gradient-to-br from-white via-white to-[#f7efe3] hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-lg"
                      : "border-dashed border-zinc-200 bg-[#fcfaf7] text-zinc-400"
                  }`}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-base text-zinc-900">
                      <span className="font-['Oswald'] text-2xl tracking-[0.06em]">
                        {timeslot}
                      </span>
                      {bookings[timeslot] ? (
                        <span className="flex items-center gap-2 text-sm font-normal text-zinc-500">
                          <strong>{bookings[timeslot].length}</strong>
                          <CalendarCheck2 className="h-4 w-4" />
                        </span>
                      ) : null}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-zinc-900">
                    {bookings[timeslot] ? (
                      <div className="space-y-2">
                        {bookings[timeslot].map((booking, index) => (
                          <div
                            key={index}
                            className="rounded-2xl border border-white/80 bg-white/80 px-3 py-2 text-sm shadow-sm"
                          >
                            <p className="font-medium">{booking.name}</p>
                            <p className="text-zinc-500">{booking.service}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex min-h-[72px] items-center rounded-2xl border border-dashed border-zinc-200 px-4 text-sm text-zinc-400">
                        No bookings
                      </div>
                    )}
                  </CardContent>
                  {bookings[timeslot]?.some((booking) => !booking.isRead) ? (
                    <div
                      className={cn(
                        "absolute right-1 top-2 h-3 w-3 rounded-full bg-green-500",
                      )}
                    />
                  ) : null}
                </Card>
              </DialogTrigger>
              {bookings[timeslot] ? (
                <DialogContent className="w-full rounded-[28px] border-amber-100 bg-[#fffdf9]">
                  <DialogHeader>
                    <DialogTitle className="text-zinc-900">
                      Booking Details - {timeslot}
                    </DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="mt-4 max-h-[60vh] pr-4">
                    {bookings[timeslot].map((booking, index) => (
                      <div key={index} className="mb-6 pb-6">
                        <Separator className="mb-6 text-zinc-900" />
                        <h3 className="mb-3 font-semibold text-zinc-900">
                          Booking - {index + 1}
                        </h3>
                        <div className="grid gap-3 rounded-[22px] border border-amber-100 bg-white px-4 py-4 shadow-sm">
                          <div className="flex items-center gap-2">
                            <UsersIcon className="h-4 w-4 text-gray-500" />
                            <span className="text-zinc-900">{booking.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MailIcon className="h-4 w-4 text-gray-500" />
                            <span className="text-zinc-900">{booking.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <PhoneIcon className="h-4 w-4 text-gray-500" />
                            <span className="text-zinc-900">{booking.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Scissors className="h-4 w-4 text-gray-500" />
                            <span className="text-zinc-900">{booking.service}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </DialogContent>
              ) : null}
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowBookingGrid;
