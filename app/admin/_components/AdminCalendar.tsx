"use client";

import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import "../admin.css";
import { startTransition, useEffect, useRef, useState } from "react";
import { Booking } from "@prisma/client";
import { getBooking } from "@/data/getBooking";
import { enGB } from "date-fns/locale";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { CalendarIcon } from "lucide-react";

const AdminCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [readBookedDays, setReadBookedDays] = useState<Date[]>([]);
  const [unReadBookedDays, setUnReadBookedDays] = useState<Date[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const year = Number(searchParams.get("year") || null);
  const month = Number(searchParams.get("month") || null);
  const day = Number(searchParams.get("date") || null);

  useEffect(() => {
    if (!day) {
      setDate(new Date());
    } else {
      setDate(new Date(year, month - 1, day));
    }
  }, [day]);

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
  }, [searchParams]);

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

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as Node;
    if (calendarRef.current && !calendarRef.current.contains(target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="relative" ref={calendarRef}>
        <div className="flex items-center justify-between">
          <p className="text-yellow-700">Pick a Date:</p>
          <Button
            onClick={() => {
              setIsOpen((open) => !open);
            }}
            variant={"ghost"}
            type="button"
          >
            <CalendarIcon className="ml-auto h-4 w-4 text-yellow-700" />
          </Button>
        </div>
        {isOpen && (
          <div className="absolute -right-[60%] top-full z-50 mt-2 w-auto p-0">
            <Card>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(data) => {
                  handleDateSelect(data);
                  setIsOpen(false);
                }}
                className="w-full rounded-md border bg-zinc-50 p-5"
                initialFocus
                locale={enGB}
                modifiers={{
                  booked: readBookedDays,
                  unreadBooked: unReadBookedDays,
                }}
                modifiersClassNames={{
                  booked: "my-booked-class",
                  unreadBooked: "my-unread-class",
                }}
                defaultMonth={new Date(year, month - 1)}
              />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCalendar;
