import { Label } from "@/components/ui/label";
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
  CalendarIcon,
  UsersIcon,
  ClockIcon,
  MenuIcon,
  PhoneIcon,
  MailIcon,
  Scissors,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TIMESLOT } from "@/lib/serviceList";
import { getBookingByDate } from "@/data/getBookingByDate";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { setIsRead } from "@/action/setIsRead";
import { toast } from "sonner";

type BookingDialogProps = {
  bookings: Booking[];
};

const ShowBookingGrid = () => {
  const [bookings, setBookings] = useState<Record<string, Booking[]>>({});
  const [unreadBookingIds, setUnreadBookingIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading bookings.</p>;
  return (
    <div className="flex h-screen bg-transparent">
      <Card className="flex-1 p-4 lg:p-8">
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {timeslots.map((timeslot) => (
              <Dialog
                key={timeslot}
                onOpenChange={(isOpen) => isReadHandler(isOpen, timeslot)}
              >
                <DialogTrigger asChild>
                  <Card
                    className={`${
                      bookings[timeslot]
                        ? "bg-white hover:bg-gray-50"
                        : "bg-gray-200"
                    } relative cursor-pointer transition-colors duration-200`}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{timeslot}</span>
                        {bookings[timeslot] && (
                          <span className="text-sm font-normal text-gray-500">
                            {bookings[timeslot].length} booking(s)
                          </span>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {bookings[timeslot] ? (
                        <div className="space-y-2">
                          {bookings[timeslot].map((booking, index) => (
                            <div key={index} className="text-sm">
                              <p className="font-medium">{booking.name}</p>
                              <p className="text-gray-500">{booking.service}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No bookings</p>
                      )}
                    </CardContent>
                    {/* UNREAD DOT */}
                    {bookings[timeslot] &&
                      bookings[timeslot].some((booking) => !booking.isRead) && (
                        <div
                          className={cn(
                            "absolute right-1 top-2 h-3 w-3 rounded-full bg-green-500",
                          )}
                        />
                      )}
                  </Card>
                </DialogTrigger>
                {bookings[timeslot] && (
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Booking Details - {timeslot}</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="mt-4 max-h-[60vh]">
                      {bookings[timeslot].map((booking, index) => (
                        <div
                          key={index}
                          className="mb-6 border-b pb-6 last:border-b-0"
                        >
                          <h3 className="mb-2 font-semibold">
                            Booking {index + 1}
                          </h3>
                          <div className="grid gap-2">
                            <div className="flex items-center gap-2">
                              <UsersIcon className="h-4 w-4 text-gray-500" />
                              <span>{booking.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MailIcon className="h-4 w-4 text-gray-500" />
                              <span>{booking.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <PhoneIcon className="h-4 w-4 text-gray-500" />
                              <span>{booking.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Scissors className="h-4 w-4 text-gray-500" />
                              <span>{booking.service}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </DialogContent>
                )}
              </Dialog>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default ShowBookingGrid;
