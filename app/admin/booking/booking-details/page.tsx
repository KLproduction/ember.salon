"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { toast } from "sonner";
import { getBookingById } from "@/data/getBooking";
import { bookingSetting } from "@/action/bookingSetting";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BookingSettingSchema } from "@/schemas";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { checkFreeTimeSlot } from "@/action/checkFreeTimeSlot";
import { enGB } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Booking } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteBooking } from "@/action/delete";
import { AdminPageShell } from "../../_components/AdminShell";

const TIME_SLOTS = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

const BookingDetailsPage = () => {
  const [isPending, startTransition] = useTransition();

  // const BookingUpdateSchema = z.object({
  //   date: z.date().optional(),
  //   time: z.string().optional(),
  // });
  const route = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking");
  const [booking, setBooking] = useState<Booking | null>(null);

  const form = useForm<z.infer<typeof BookingSettingSchema>>({
    resolver: zodResolver(BookingSettingSchema),
    defaultValues: {
      timeSlot: undefined,
      date: undefined,
    },
  });

  useEffect(() => {
    (async () => {
      if (bookingId) {
        const data = await getBookingById(bookingId);
        if (data) {
          setBooking(data);
        }
      }
    })();
  }, [bookingId]);

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      timeSlot: undefined,
    });
  }, [bookingId, form, searchParams]);

  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const now = new Date();

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as Node;
    if (calendarRef.current && !calendarRef.current.contains(target)) {
      setIsCalendarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const selectedDate = form.watch("date");
  const selectedDateTrigger = selectedDate ? selectedDate.toISOString() : null;

  useEffect(() => {
    startTransition(async () => {
      const availableSlots = [];
      for (let slot of TIME_SLOTS) {
        const count = await checkFreeTimeSlot(selectedDate, slot);

        if (count < 5) {
          availableSlots.push(slot);
        }
      }
      setAvailableTimeSlots(availableSlots);
      form.reset({
        ...form.getValues(),
        timeSlot: undefined,
      });
    });
  }, [form, selectedDate, selectedDateTrigger]);

  const onSubmit = (values: z.infer<typeof BookingSettingSchema>) => {
    startTransition(async () => {
      if (bookingId) {
        const data = await bookingSetting(bookingId, values);
        if (data?.success) {
          toast.success("Booking has been made.");
          route.refresh();
          // form.reset({
          //   ...form.getValues(),

          //   timeSlot: undefined,
          //   date: undefined,
          // });
        } else {
          toast.error("Something went wrong, fail to book.");
        }
      }
    });
  };

  const deleteHandler = () => {
    startTransition(async () => {
      if (bookingId) {
        await deleteBooking(bookingId).then((data) => {
          if (data.success) {
            toast.success(data.message);
            route.push(
              `/admin/booking?year=${now.getFullYear()}&month=${now.getMonth() + 1}&date=${now.getDate()}`,
            );
          }
          if (!data.success) {
            toast.error(data.message);
          }
        });
      }
    });
  };
 
  if (!booking) {
    return (
      <AdminPageShell
        title="Booking Details"
        badge="Edit"
        description="Review and adjust an existing appointment."
        breadcrumbs={[
          { label: "Admin", href: "/admin/dashboard" },
          { label: "Bookings", href: `/admin/booking?year=${now.getFullYear()}&month=${now.getMonth() + 1}&date=${now.getDate()}` },
          { label: "Booking Details" },
        ]}
      >
        <div className="flex min-h-[320px] items-center justify-center">
          <div className="rounded-[28px] border border-zinc-200 bg-white px-8 py-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-zinc-900">Booking not found</h2>
            <p className="mt-2 text-sm text-zinc-500">
              The selected booking may have been removed.
            </p>
            <Button
              onClick={() =>
                route.push(
                  `/admin/booking?year=${now.getFullYear()}&month=${now.getMonth() + 1}&date=${now.getDate()}`,
                )
              }
              className="mt-6 rounded-2xl bg-zinc-900 hover:bg-zinc-800"
            >
              Back to Booking
            </Button>
          </div>
        </div>
      </AdminPageShell>
    );
  }

  return (
    <AdminPageShell
      title="Booking Details"
      badge="Edit"
      description="Reschedule appointments and review customer details without losing the current admin context."
      breadcrumbs={[
        { label: "Admin", href: "/admin/dashboard" },
        { label: "Bookings", href: `/admin/booking?year=${booking.date.getFullYear()}&month=${booking.date.getMonth() + 1}&date=${booking.date.getDate()}` },
        { label: "Booking Details" },
      ]}
    >
      <Card className="mx-auto w-full max-w-3xl rounded-[28px] border-amber-100 bg-white/95 shadow-[0_18px_60px_-30px_rgba(24,24,27,0.28)]">
        <div className="flex justify-end p-5">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div>
                <Button variant={"destructive"}>Delete</Button>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove the
                  data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteHandler()}
                  className="bg-red-500 text-zinc-50"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <CardHeader className="border-b border-zinc-100 p-6">
          <CardTitle className="text-2xl font-bold text-amber-800">
            Booking Details
          </CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-800">
              Customer Information
            </h3>
            <div className="space-y-2 rounded-[24px] border border-zinc-100 bg-[#fcfaf7] p-4 shadow-sm">
              <p className="text-sm">
                <span className="font-medium text-gray-600">Name:</span>{" "}
                <span className="text-gray-800">{booking?.name}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-600">Email:</span>{" "}
                <span className="text-gray-800">{booking?.email}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-600">Phone:</span>{" "}
                <span className="text-gray-800">{booking?.phone}</span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-600">Service:</span>{" "}
                <span className="text-gray-800">{booking?.service}</span>
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-800">
              Current Booking
            </h3>
            <div className="space-y-2 rounded-[24px] border border-zinc-100 bg-[#fcfaf7] p-4 shadow-sm">
              <p className="text-sm">
                <span className="font-medium text-gray-600">Date:</span>{" "}
                <span className="text-gray-800">
                  {booking?.date.getFullYear()}-{booking?.date.getMonth()! + 1}-
                  {booking?.date.getDate()}
                </span>
              </p>
              <p className="text-sm">
                <span className="font-medium text-gray-600">Time:</span>{" "}
                <span className="text-gray-800">{booking?.timeSlot}</span>
              </p>
            </div>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 p-6"
          >
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Change Booking Date
                  </FormLabel>
                  <div className="relative">
                    <Button
                      variant="outline"
                      className={`w-full justify-start bg-white text-left font-normal shadow-sm ${
                        !field.value ? "text-gray-500" : "text-gray-900"
                      }`}
                      onClick={() => setIsCalendarOpen((open) => !open)}
                      type="button"
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Select a new date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                    {isCalendarOpen && (
                      <div
                        className="absolute top-full z-50 mt-2 rounded-md bg-white p-2 shadow-lg"
                        ref={calendarRef}
                      >
                        <Calendar
                          mode="single"
                          selected={field.value ? field.value : new Date()}
                          onSelect={(date) => {
                            field.onChange(date);
                            setIsCalendarOpen(false);
                          }}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            date.setHours(0, 0, 0, 0);
                            return date < today;
                          }}
                          initialFocus
                          locale={enGB}
                          className="rounded-[24px] border"
                          defaultMonth={
                            selectedDate ? selectedDate : new Date()
                          }
                        />
                      </div>
                    )}
                  </div>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timeSlot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Change Time Slot
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full bg-white shadow-sm disabled:bg-gray-100 disabled:text-gray-400">
                        <SelectValue placeholder="Select a new time slot" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {TIME_SLOTS.map((hour, index) => {
                        const slotTime = parseInt(hour.split(":")[0], 10);

                        const currentTime = new Date();
                        const currentHour = currentTime.getHours();
                        const isToday =
                          selectedDate &&
                          currentTime.toDateString() ===
                            new Date(selectedDate).toDateString();

                        return (
                          <SelectItem
                            key={index}
                            value={hour}
                            disabled={
                              (slotTime <= currentHour + 1 && isToday) ||
                              !availableTimeSlots.includes(hour)
                            }
                            className="text-sm"
                          >
                            {hour}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full rounded-2xl bg-zinc-900 hover:bg-zinc-800"
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Update Booking"}
            </Button>
          </form>
        </Form>
        <CardFooter className="border-t border-zinc-100 px-6 pb-6 pt-4" />
      </Card>
    </AdminPageShell>
  );
};

export default BookingDetailsPage;
