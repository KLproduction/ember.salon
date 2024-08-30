"use client";

import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import "../admin.css";
import { useEffect, useState } from "react";
import { Booking } from "@prisma/client";
import { getBooking } from "@/data/getBooking";
import { enGB } from "date-fns/locale";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AdminCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [readBookedDays, setReadBookedDays] = useState<Date[]>([]);
  const [unReadBookedDays, setUnReadBookedDays] = useState<Date[]>([]);
  const route = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getBooking();
      if (data) {
        const readBookedDates = data.readBooking.map((item) => {
          const date = new Date(item.date);
          return new Date(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
          );
        });

        const unReadBookedDates = data.unReadBooking.map((item) => {
          const date = new Date(item.date);
          return new Date(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
          );
        });

        setReadBookedDays(readBookedDates);

        setUnReadBookedDays(unReadBookedDates);
      }
    })();
  }, []);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      route.push(
        `/admin/booking?year=${selectedDate.getUTCFullYear()}&month=${
          selectedDate.getUTCMonth() + 1
        }&date=${selectedDate.getDate()}`,
      );
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Card>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          className="rounded-md border p-5"
          initialFocus
          locale={enGB}
          modifiers={{ booked: readBookedDays, unreadBooked: unReadBookedDays }}
          modifiersClassNames={{
            booked: "my-booked-class",
            unreadBooked: "my-unread-class",
          }}
          defaultMonth={new Date()}
        />
      </Card>
    </div>
  );
};

export default AdminCalendar;
