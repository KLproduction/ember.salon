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
  }, [day, month, year]);

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
    <div className="flex w-full flex-col">
      <div className="relative w-full" ref={calendarRef}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-amber-900">Pick a date</p>
            <p className="text-xs text-zinc-500">Navigate across working days.</p>
          </div>
          <Button
            onClick={() => {
              setIsOpen((open) => !open);
            }}
            variant={"outline"}
            type="button"
            className="rounded-2xl border-amber-200 bg-white/90"
          >
            <CalendarIcon className="ml-auto h-4 w-4 text-amber-800" />
          </Button>
        </div>
        {isOpen && (
          <div className="absolute left-0 top-full z-50 mt-3 w-auto p-0">
            <Card className="rounded-[24px] border-amber-100 bg-white/95 shadow-xl">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(data) => {
                  handleDateSelect(data);
                  setIsOpen(false);
                }}
                className="w-full rounded-[24px] border-0 bg-transparent p-4"
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
